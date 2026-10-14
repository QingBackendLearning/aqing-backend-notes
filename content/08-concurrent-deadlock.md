---
{"id":"concurrent-deadlock","category":"并发","title":"死锁怎么发生，又怎么避免？","summary":"画出等待关系，比堆术语更容易讲清楚。","tags":["死锁","锁顺序"],"updated":"2026-10-14"}
---
## 先这样回答
典型场景是 A 持有锁 L1 等待 L2，B 持有 L2 等待 L1，双方无法继续。常用预防方式是统一获取锁的顺序、减少嵌套持锁，并在适合的场景使用带超时的获取策略和失败回退。

## 把原理拆开
- 线程 A：拿到账户 X 的锁，再拿账户 Y 的锁。
- 线程 B：拿到账户 Y 的锁，再拿账户 X 的锁。
- 如果统一按稳定、唯一的账户 ID 排序后获取，就能避免这类反向锁顺序。
这是一种设计建议；真实项目还要检查其他锁、阻塞调用和回调是否引入新的等待环。

## 继续追问
- 线上怎么定位？——采集线程转储，看谁持有锁、谁在等待；ThreadMXBean 也提供死锁检测能力。
- tryLock 超时就一定不会死锁吗？——要正确释放已获得资源并设计回退，机械重试还可能造成活锁。

## 容易说错的地方
> 线程长时间阻塞不一定是死锁。慢 I/O、锁竞争和死锁要根据等待关系区分。

## 参考资料
- [Deadlock · Oracle Java Tutorials](https://docs.oracle.com/javase/tutorial/essential/concurrency/deadlock.html)
- [ThreadMXBean · JDK 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.management/java/lang/management/ThreadMXBean.html)
