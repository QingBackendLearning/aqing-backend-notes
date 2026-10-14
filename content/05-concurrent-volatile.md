---
{"id":"concurrent-volatile","category":"并发","title":"volatile 能保证 i++ 的原子性吗？","summary":"可见性与复合操作的原子性是两件事。","tags":["volatile","原子性"],"updated":"2026-10-14"}
---
## 先这样回答
不能。volatile 建立特定的可见性和顺序保证，但 `i++` 包含读、加一、写回，整体不是原子操作。多个线程可能基于同一个旧值更新，造成计数丢失。

## 把原理拆开
假设计数为 0：线程 A 读到 0，线程 B 也读到 0；二者都计算出 1，再写回。最终值为 1，而不是 2。
```java
AtomicInteger count = new AtomicInteger();
count.incrementAndGet();
```
原子计数可以用 AtomicInteger；如果需要一起保护多个字段和不变量，可以考虑锁。

## 继续追问
- volatile 常用在哪里？——例如简单的停止标志，前提是业务不需要把多步状态变更原子化。
- 为什么有序性不等于“禁止所有重排序”？——约束的是符合 Java 内存模型的可观察行为，而非一律固定所有机器指令顺序。

## 容易说错的地方
> 不要只背“可见性、有序性”。接着给出一个不满足原子性的例子，边界才清楚。

## 参考资料
- [Java 内存模型 · JLS 21 §17.4](https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html#jls-17.4)
- [AtomicInteger · JDK 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html)
