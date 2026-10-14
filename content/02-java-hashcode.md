---
{"id":"java-hashcode","category":"Java","title":"重写 equals，为什么还要重写 hashCode？","summary":"相等对象必须有相同哈希值，反过来不成立。","tags":["哈希契约","HashSet"],"updated":"2026-10-14","grade":"A","plain":"哈希值帮集合先找到候选位置，equals 再确认是不是同一个业务对象。相等的对象不能拿着两份不同的定位信息。","reason":"写自定义 Map 键之前，需要先理解相等与哈希的契约。","exercise":"写一个按 id 相等的 User，把两个同 id 对象放进 HashSet，比较重写 hashCode 前后的集合大小。","effort":15}
---
## 说人话
哈希值帮集合先找到候选位置，equals 再确认是不是同一个业务对象。相等的对象不能拿着两份不同的定位信息。

## 先这样回答
哈希集合会利用哈希值定位候选位置，再判断对象是否相等。Java 的契约要求：两个对象 equals 相等，hashCode 必须相同。只改 equals 而保留基于对象身份的哈希实现，可能导致逻辑相等的对象无法按预期查找或去重。

## 把原理拆开
例如把 `User` 的相等定义为用户 ID 相同，hashCode 也应由相同的 ID 生成。
```java
@Override
public int hashCode() {
    return Objects.hash(id);
}
```
还应实现符合自反、对称、传递、一致要求的 equals。选作相等依据的字段如果可变，放入 HashSet 后再修改，可能让集合查找失败。

## 继续追问
- 哈希值相同，对象就相等吗？——不一定，可能发生哈希冲突。
- 所有对象返回同一个哈希值行不行？——可以满足相等对象哈希相同的约束，但会严重影响分布和性能。

## 容易说错的地方
> 不是要求“不相等对象必须有不同哈希值”。hashCode 的值域有限，冲突不可避免。

## 动手试一遍
写一个按 id 相等的 User，把两个同 id 对象放进 HashSet，比较重写 hashCode 前后的集合大小。

## 参考资料
- [Object.hashCode 契约 · JDK 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#hashCode())
