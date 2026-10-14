---
{"id":"spring-ioc","category":"Spring","grade":"A","title":"IoC 和依赖注入解决了什么问题？","summary":"理解容器如何组装应用，是 Spring 学习的第一步。","tags":["Spring","基础"],"updated":"2026-10-15","plain":"一个服务需要数据库访问对象时，不必自己到处创建。把依赖写清楚，由容器组装，换实现和做测试都会更方便。","reason":"理解容器如何组装应用，是 Spring 学习的第一步。","exercise":"把一个自己创建 DAO 的服务改成构造器接收 DAO，再传入内存实现完成测试。","effort":15}
---
## 说人话
一个服务需要数据库访问对象时，不必自己到处创建。把依赖写清楚，由容器组装，换实现和做测试都会更方便。

## 先这样回答
IoC 把对象创建与协作的控制权交给容器；依赖注入是实现方式之一。Spring 根据 Bean 定义创建对象并注入依赖，构造器注入有利于显式表达必需依赖。

## 把原理拆开
接口定义能力，具体 Bean 提供实现。存在多个候选时可以用限定符选择，或明确主候选。容器管理的是注册进去的对象，普通 new 出来的对象不会自动获得所有容器行为。

## 继续追问
构造器注入为什么更方便单元测试？同一个接口有两个 Bean 时怎么避免歧义？

## 容易说错的地方
> IoC 不只是省掉 new；依赖注入也不必依赖 Spring 才能实践。

## 动手试一遍
把一个自己创建 DAO 的服务改成构造器接收 DAO，再传入内存实现完成测试。

## 参考资料
- [Spring 官方文档](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html)
