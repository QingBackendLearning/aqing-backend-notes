---
{"id":"java-string","category":"Java","grade":"A","title":"String 为什么不可变？","summary":"理解不可变对象，能解释字符串操作与作为哈希键的行为。","tags":["Java","基础"],"updated":"2026-10-14","plain":"字符串建好后，内容不能原地改。拼接得到的是新字符串，旧变量是否指向它是另一件事。","reason":"理解不可变对象，能解释字符串操作与作为哈希键的行为。","exercise":"分别调用 concat 并接收/不接收返回值，打印结果；再用 StringBuilder 追加一次。","effort":15}
---
## 说人话
字符串建好后，内容不能原地改。拼接得到的是新字符串，旧变量是否指向它是另一件事。

## 先这样回答
String 对象的值创建后不能修改。不可变对象便于安全共享，也让用作键时的内容保持稳定；需要连续修改字符序列时，可评估 StringBuilder。

## 把原理拆开
例如 s.concat("x") 返回结果，但不赋回 s，原引用保持不变。不可变的是对象内容，变量本身仍可以重新赋值。

## 继续追问
StringBuilder 线程安全吗？——它没有同步保证；需要结合使用范围决定是否共享。

## 容易说错的地方
> 不要把变量加 final 和对象不可变当成同一件事。

## 动手试一遍
分别调用 concat 并接收/不接收返回值，打印结果；再用 StringBuilder 追加一次。

## 参考资料
- [Oracle / Java 官方文档](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)
