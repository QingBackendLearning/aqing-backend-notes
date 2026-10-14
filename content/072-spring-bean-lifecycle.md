---
{"id":"spring-bean-lifecycle","category":"Spring","grade":"B","title":"Bean 从创建到可使用，经历了什么？","summary":"了解生命周期后，才能定位初始化与代理时机的问题。","tags":["Spring","原理"],"updated":"2026-10-15","plain":"对象被创建出来只是第一步，还要填好依赖、完成初始化，必要时包上一层代理。你最后拿到的对象不一定就是最初那个实例。","reason":"了解生命周期后，才能定位初始化与代理时机的问题。","exercise":"为构造器、注入、初始化和销毁加日志，观察容器启动关闭时的顺序，并记录获得对象的实际类型。","effort":25}
---
## 说人话
对象被创建出来只是第一步，还要填好依赖、完成初始化，必要时包上一层代理。你最后拿到的对象不一定就是最初那个实例。

## 先这样回答
典型流程包含实例化、属性填充、初始化回调和 BeanPostProcessor 处理。后处理器可参与不同阶段，并可能返回包装对象或代理；销毁回调与作用域和容器生命周期有关。

## 把原理拆开
初始化阶段可以包含 PostConstruct、InitializingBean 或自定义 init 方法。不要在构造器中过早依赖尚未注入的字段，也不要假定初始化时调用自身方法已经经过代理。

## 继续追问
BeanPostProcessor 和 BeanFactoryPostProcessor 修改的对象是什么？prototype Bean 的销毁由谁负责？

## 容易说错的地方
> 简单流程图只是理解入口；循环依赖、工厂 Bean 和代理会使实际路径更复杂。

## 动手试一遍
为构造器、注入、初始化和销毁加日志，观察容器启动关闭时的顺序，并记录获得对象的实际类型。

## 参考资料
- [Spring 官方文档](https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html)
