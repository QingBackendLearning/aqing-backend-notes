---
{"id":"concurrent-lock","category":"并发","title":"synchronized 和 ReentrantLock 怎么选？","summary":"先看互斥，再看超时、中断和条件队列的需求。","tags":["锁","ReentrantLock"],"updated":"2026-10-14","grade":"A","plain":"锁让同一时刻只有一个人改共享状态。synchronized 帮你收尾；显式锁提供更多等待方式，也需要自己保证释放。","reason":"先会正确互斥与释放锁，再讨论性能和高级同步。","exercise":"把一个共享余额更新分别用两种锁保护，并让更新代码抛异常，检查锁是否仍会释放。","effort":15}
---
## 说人话
锁让同一时刻只有一个人改共享状态。synchronized 帮你收尾；显式锁提供更多等待方式，也需要自己保证释放。

## 先这样回答
二者都能提供互斥和可重入能力。synchronized 由语言结构管理释放；ReentrantLock 需要显式释放，但提供 tryLock、可中断获取锁、可配置的公平策略，以及多个 Condition。

## 把原理拆开
```java
lock.lock();
try {
    updateSharedState();
} finally {
    lock.unlock();
}
```
简单的互斥代码块用 synchronized 就很清楚。确实需要获取超时、取消等待或多个条件队列时，再选择显式锁。

## 继续追问
- 公平锁一定更快吗？——不是；公平策略可能降低吞吐，调度也不因此获得绝对公平。
- 为什么 unlock 要放 finally？——受保护代码抛异常时，也必须释放已获得的锁。

## 容易说错的地方
> “ReentrantLock 一定比 synchronized 快”没有普遍成立的前提，性能要结合运行时和负载测量。

## 动手试一遍
把一个共享余额更新分别用两种锁保护，并让更新代码抛异常，检查锁是否仍会释放。

## 参考资料
- [ReentrantLock · JDK 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html)
