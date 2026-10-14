---
{"id":"jvm-classloader","category":"JVM","title":"双亲委派到底委派了什么？","summary":"默认加载流程先委派，再尝试自行查找。","tags":["类加载","双亲委派"],"updated":"2026-10-14","grade":"B","plain":"默认加载器先问父加载器有没有这个类，找不到才自己找。同名类由不同加载器定义，也可能不是同一种类型。","reason":"基础对象模型之后，类加载隔离与运行时类型身份更容易理解。","exercise":"画出默认 loadClass 的查找顺序，解释两个加载器加载同名类时为什么可能无法转换。","effort":25}
---
## 说人话
默认加载器先问父加载器有没有这个类，找不到才自己找。同名类由不同加载器定义，也可能不是同一种类型。

## 先这样回答
ClassLoader 的默认 loadClass 流程会先检查是否已加载，再让父加载器尝试加载，父加载器无法找到时，才调用自身的 findClass。这样有助于共享基础类、减少重复加载；这是默认策略，不是所有加载器必须遵守的不可更改规则。

## 把原理拆开
“父”指委派关系，不是 Java 类继承关系。同名类如果由不同定义加载器加载，可以属于不同的运行时类型，因此可能无法相互转换。
自定义加载器通常重写 findClass，保留默认委派流程；确有隔离需求时才调整加载策略。

## 继续追问
- 为什么全限定名相同仍可能转换失败？——还要看定义类加载器。
- 每个自定义类加载器都必须打破委派吗？——不需要。

## 容易说错的地方
> 双亲委派不意味着“加载器有两个父亲”。“双亲”是历史译法，默认关系里是 parent。

## 动手试一遍
画出默认 loadClass 的查找顺序，解释两个加载器加载同名类时为什么可能无法转换。

## 参考资料
- [ClassLoader.loadClass · JDK 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/ClassLoader.html#loadClass(java.lang.String,boolean))
- [运行时类身份 · JVMS 21 §5.3](https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-5.html#jvms-5.3)
