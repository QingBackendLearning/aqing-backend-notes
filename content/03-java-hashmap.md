---
{"id":"java-hashmap","category":"Java","title":"HashMap 为什么不是线程安全的？","summary":"普通 Map 的读改写操作不能自动组成原子操作。","tags":["HashMap","并发修改"],"updated":"2026-10-14"}
---
## 先这样回答
HashMap 没有内置同步保证。多线程共享它，并且存在修改时，需要外部同步或改用适合并发的容器。其迭代器可能抛出 ConcurrentModificationException，但这只是尽力检测，不能当作线程安全机制。

## 把原理拆开
```java
Integer old = map.get(key);
map.put(key, old == null ? 1 : old + 1);
```
两条线程可能读到同一个旧值，再分别写入相同的新值，造成更新丢失。把类型替换为 ConcurrentHashMap，也不能自动把上面两步合并成原子操作；要用 `merge`、`compute` 等提供合适语义的操作。

## 继续追问
- Collections.synchronizedMap 可以直接安全遍历吗？——按文档要求，遍历视图时仍需要在返回的 Map 上同步。
- ConcurrentHashMap 是否允许 null？——不允许 null 键或 null 值。

## 容易说错的地方
> “用了并发集合，业务流程就线程安全”不成立。多个容器操作之间仍可能存在竞态。

## 参考资料
- [HashMap · JDK 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html)
- [ConcurrentHashMap · JDK 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html)
- [Collections.synchronizedMap · JDK 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collections.html#synchronizedMap(java.util.Map))
