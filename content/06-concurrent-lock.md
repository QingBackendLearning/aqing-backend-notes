---
{"id":"concurrent-lock","category":"并发","title":"synchronized 和 ReentrantLock 怎么选？","summary":"先看互斥，再看超时、中断和条件队列的需求。","tags":["锁","ReentrantLock"],"updated":"2026-10-14"}
---
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

## 参考资料
- [ReentrantLock · JDK 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html)
