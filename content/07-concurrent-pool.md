---
{"id":"concurrent-pool","category":"并发","title":"线程池收到任务后，按什么顺序处理？","summary":"核心线程、队列、最大线程数、拒绝策略。","tags":["线程池","任务队列"],"updated":"2026-10-14"}
---
## 先这样回答
对于 ThreadPoolExecutor，执行新任务时，若工作线程数小于 corePoolSize，优先创建线程；否则尝试入队；队列放不下时尝试增加线程到 maximumPoolSize；仍无法接受或池已关闭，就执行拒绝策略。实际实现还会复查运行状态。

## 把原理拆开
如果核心线程数为 2、最大线程数为 4、队列容量为 10，在已有任务持续占用工作线程且没有消费腾空的假设下：前两个任务启动核心线程，之后任务先进入队列；队列满后才考虑非核心线程。
这也解释了为什么无界队列通常使 maximumPoolSize 无法发挥预期的扩容作用。

## 继续追问
- CallerRunsPolicy 有什么效果？——通常让提交线程执行任务形成反馈；但池关闭时会丢弃该任务。
- 队列过大有什么风险？——等待时间和内存占用可能增加。

## 容易说错的地方
> 不是先把线程开到 maximumPoolSize，再把任务入队。

## 参考资料
- [ThreadPoolExecutor · JDK 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html)
