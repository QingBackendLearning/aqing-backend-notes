---
{"id":"concurrent-aqs","category":"并发","grade":"C","title":"AQS 为什么能支撑不同同步器？","summary":"需要讲解同步器实现或源码时再读队列细节。","tags":["并发","场景"],"updated":"2026-10-14","plain":"它把“没拿到资格的人怎么排队和唤醒”集中处理。具体谁能获得资格，留给锁或同步器自己定义。","reason":"需要讲解同步器实现或源码时再读队列细节。","exercise":"比较 ReentrantLock 与 Semaphore 的资格含义，用自己的话解释独占和共享模式。","effort":40}
---
## 说人话
它把“没拿到资格的人怎么排队和唤醒”集中处理。具体谁能获得资格，留给锁或同步器自己定义。

## 先这样回答
AbstractQueuedSynchronizer 用状态和等待队列支持独占、共享式同步。子类实现获取/释放规则，框架处理阻塞、排队等通用流程；AQS 本身不是一把可直接使用的业务锁。

## 把原理拆开
独占锁只允许一个持有者，信号量允许一定数量的许可。它们对 state 的解释不同，但都需要管理获取失败的线程。

## 继续追问
公平性来自哪里？——取决于具体同步器的获取策略，不能仅凭“有队列”就断定公平。

## 容易说错的地方
> 不要把 AQS 的队列顺序和绝对线程调度公平混在一起。

## 动手试一遍
比较 ReentrantLock 与 Semaphore 的资格含义，用自己的话解释独占和共享模式。

## 参考资料
- [Oracle / Java 官方文档](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/locks/AbstractQueuedSynchronizer.html)
