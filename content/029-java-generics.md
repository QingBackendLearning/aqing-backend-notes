---
{"id":"java-generics","category":"Java","grade":"B","title":"泛型擦除，是把所有类型信息都删掉吗？","summary":"在集合基础之后，补上编译期检查与运行时类型边界。","tags":["Java","原理"],"updated":"2026-10-14","plain":"编译器先帮你检查装进去的是什么类型，再把很多泛型写法翻译成运行时能执行的形式。某些声明信息仍会留下。","reason":"在集合基础之后，补上编译期检查与运行时类型边界。","exercise":"解释 List<String> 不属于 List<Object>；再比较一个字段的 getType 和 getGenericType。","effort":25}
---
## 说人话
编译器先帮你检查装进去的是什么类型，再把很多泛型写法翻译成运行时能执行的形式。某些声明信息仍会留下。

## 先这样回答
Java 泛型采用擦除机制，类型参数按上界等规则擦除，必要时插入转换与桥接方法。但类文件仍可能保留泛型声明签名，反射也能读取部分声明信息。

## 把原理拆开
List<String> 不能直接当作 List<Object>。否则通过后者塞入 Integer，会破坏原来的类型约束。

## 继续追问
为什么不能直接 new T[]？——数组运行时需要元素类型，而类型参数通常不是可具体化类型。

## 容易说错的地方
> “擦除后什么泛型信息都不存在”太绝对。

## 动手试一遍
解释 List<String> 不属于 List<Object>；再比较一个字段的 getType 和 getGenericType。

## 参考资料
- [Oracle / Java 官方文档](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html)
