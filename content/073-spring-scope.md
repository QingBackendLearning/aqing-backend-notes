---
{"id":"spring-scope","category":"Spring","grade":"A","title":"Spring 单例 Bean 一定线程安全吗？","summary":"单例服务贯穿日常开发，需要先分清实例数量与线程安全。","tags":["Spring","基础"],"updated":"2026-10-15","plain":"容器只放一份对象，并没有替它安排好多人同时修改时的秩序。多人请求共用这份对象，里面的可变状态仍可能冲突。","reason":"单例服务贯穿日常开发，需要先分清实例数量与线程安全。","exercise":"检查一个 Controller 或 Service 的字段，把请求级可变数据移到局部变量或合适的上下文。","effort":15}
---
## 说人话
容器只放一份对象，并没有替它安排好多人同时修改时的秩序。多人请求共用这份对象，里面的可变状态仍可能冲突。

## 先这样回答
singleton 是每个容器、每个 Bean 定义通常对应一个实例，不等于 JVM 中只能有一个。线程安全取决于共享状态、操作方式和同步，而不是作用域标签。

## 把原理拆开
无状态服务更容易被多个请求共享。request 作用域与请求绑定；prototype 每次向容器请求时创建，注入到单例后不会自动在每次方法调用时重新生成。

## 继续追问
单例服务里保存当前用户信息有什么问题？需要每次取 prototype 时有哪些获取方式？

## 容易说错的地方
> 不要认为把作用域改成 prototype 就解决了所有共享数据问题。

## 动手试一遍
检查一个 Controller 或 Service 的字段，把请求级可变数据移到局部变量或合适的上下文。

## 参考资料
- [Spring 官方文档](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)
