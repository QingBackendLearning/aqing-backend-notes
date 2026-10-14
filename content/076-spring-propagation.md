---
{"id":"spring-propagation","category":"Spring","grade":"B","title":"REQUIRED 和 REQUIRES_NEW 有什么区别？","summary":"在单事务基础上理解嵌套调用和连接资源的取舍。","tags":["Spring","原理"],"updated":"2026-10-15","plain":"一件事可以跟着外层一起成败，也可以单独开一份事务。单独做不只是换个标签，还会多占连接，并改变哪些结果能被一起撤回。","reason":"在单事务基础上理解嵌套调用和连接资源的取舍。","exercise":"画出外层写订单、内层写日志后抛异常的时间线，对比两种传播行为的最终记录。","effort":25}
---
## 说人话
一件事可以跟着外层一起成败，也可以单独开一份事务。单独做不只是换个标签，还会多占连接，并改变哪些结果能被一起撤回。

## 先这样回答
REQUIRED 有事务时加入，没有时新建。REQUIRES_NEW 使用独立的物理事务，外层事务被挂起，其提交与回滚不会直接跟随外层。

## 把原理拆开
内层 REQUIRED 标记 rollback-only 后，外层尝试提交可能收到 UnexpectedRollbackException。REQUIRES_NEW 常要额外连接，连接池不足时可能阻塞；NESTED 通常依赖保存点和事务管理器支持。

## 继续追问
审计记录一定应该使用 REQUIRES_NEW 吗？外层回滚后独立提交的记录是否仍符合业务要求？

## 容易说错的地方
> 传播行为不是线程间或远程调用间自动传递的全局事务协议。

## 动手试一遍
画出外层写订单、内层写日志后抛异常的时间线，对比两种传播行为的最终记录。

## 参考资料
- [Spring 官方文档](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/tx-propagation.html)
