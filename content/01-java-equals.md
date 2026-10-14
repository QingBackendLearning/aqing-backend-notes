---
{"id":"java-equals","category":"Java","title":"== 和 equals，到底在比较什么？","summary":"先区分基本类型与引用类型，再看 equals 的具体实现。","tags":["对象比较","equals"],"updated":"2026-10-14"}
---
## 先这样回答
基本类型的 `==` 比较值；引用类型的 `==` 比较是否引用同一个对象。`equals` 是方法，比较规则由实现决定。`Object.equals` 默认与引用相等一致，`String` 则重写为比较字符串内容。

## 把原理拆开
```java
String a = new String("hello");
String b = new String("hello");
System.out.println(a == b);      // false
System.out.println(a.equals(b)); // true
```
两个变量分别指向不同对象，但字符串内容相同。不能因为两个字符串字面量恰好引用同一个对象，就认为 `==` 可以代替内容比较。

## 继续追问
- 自定义类没有重写 equals，比较结果是什么？——仍采用 Object 的引用相等语义。
- 变量可能为 null 怎么比较？——可以用 `Objects.equals(a, b)`，避免调用空引用的方法。

## 容易说错的地方
> “equals 一定比较内容”缺少前提。要看具体类型是否重写，以及它把哪些字段视为相等。

## 参考资料
- [Object.equals 契约 · JDK 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object))
- [String.equals · JDK 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html#equals(java.lang.Object))
