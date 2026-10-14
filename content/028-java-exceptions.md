---
{"id":"java-exceptions","category":"Java","grade":"A","title":"受检异常和运行时异常，处理方式有什么区别？","summary":"异常传播和资源释放是写可靠 Java 方法的基础。","tags":["Java","基础"],"updated":"2026-10-14","plain":"编译器要求你交代的一类异常，需要捕获或声明；运行时异常不强制你写这一步，但照样可能让请求失败。","reason":"异常传播和资源释放是写可靠 Java 方法的基础。","exercise":"为一个文件读取方法声明异常，并用 try-with-resources 关闭资源；区分哪些信息应该记录、哪些可以返回给客户端。","effort":15}
---
## 说人话
编译器要求你交代的一类异常，需要捕获或声明；运行时异常不强制你写这一步，但照样可能让请求失败。

## 先这样回答
受检异常受到编译期检查。RuntimeException 及其子类属于非受检异常，Error 也不是受检异常。异常分类与业务是否可恢复并不能简单一一对应。

## 把原理拆开
读取文件失败时，可以往上抛 IOException；参数非法时可抛 IllegalArgumentException。对外接口仍需要按业务约定返回可理解的错误。

## 继续追问
finally 一定能执行吗？——进程终止等情况不能靠它保证；资源关闭通常优先用 try-with-resources。

## 容易说错的地方
> 捕获 Exception 后什么都不做，会把故障藏起来。

## 动手试一遍
为一个文件读取方法声明异常，并用 try-with-resources 关闭资源；区分哪些信息应该记录、哪些可以返回给客户端。

## 参考资料
- [Oracle / Java 官方文档](https://docs.oracle.com/javase/specs/jls/se21/html/jls-11.html)
