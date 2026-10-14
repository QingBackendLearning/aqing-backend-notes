---
{"id":"concurrent-future","category":"并发","grade":"B","title":"CompletableFuture 的组合与阻塞有何区别？","summary":"在会用线程池之后，练习结果组合和异常路径。","tags":["并发","原理"],"updated":"2026-10-14","plain":"可以安排“这个结束再做那个”，也可以安排“两个都结束再汇总”。如果马上 join，当前线程仍然要等。","reason":"在会用线程池之后，练习结果组合和异常路径。","exercise":"写两个完成阶段，分别用 thenApply 和 thenCompose 接续一个异步查询，比较返回类型。","effort":25}
---
## 说人话
可以安排“这个结束再做那个”，也可以安排“两个都结束再汇总”。如果马上 join，当前线程仍然要等。

## 先这样回答
CompletableFuture 支持异步结果组合与异常传播。thenApply 转换结果，thenCompose 展开新的阶段，组合并不等于全流程都不阻塞；执行器选择需要显式考虑。

## 把原理拆开
查询两项独立信息后汇总，可以先并发发起，再统一处理。把阻塞 I/O 放入不合适的共享执行器，可能影响其他任务。

## 继续追问
异常会自动消失吗？——不会，应选择 exceptionally、handle 等策略，避免结果失败无人处理。

## 容易说错的地方
> 异步写法不意味着没有线程占用、超时和取消问题。

## 动手试一遍
写两个完成阶段，分别用 thenApply 和 thenCompose 接续一个异步查询，比较返回类型。

## 参考资料
- [Oracle / Java 官方文档](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/CompletableFuture.html)
