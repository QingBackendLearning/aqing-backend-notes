---
{"id":"spring-mvc","category":"Spring","grade":"A","title":"一个请求在 Spring MVC 中怎样走完？","summary":"把框架行为对应到一次真实请求，便于开发和排错。","tags":["Spring","基础"],"updated":"2026-10-15","plain":"请求先到统一入口，找到负责处理的 Controller，解析参数，再把结果转换成响应。入口前后还可能有过滤器、拦截器和异常处理。","reason":"把框架行为对应到一次真实请求，便于开发和排错。","exercise":"画一条 JSON 接口请求链，标出认证、参数校验、业务调用、异常处理和响应序列化。","effort":15}
---
## 说人话
请求先到统一入口，找到负责处理的 Controller，解析参数，再把结果转换成响应。入口前后还可能有过滤器、拦截器和异常处理。

## 先这样回答
DispatcherServlet 协调请求处理，通过 HandlerMapping 找到处理器，HandlerAdapter 执行适配调用；结果经过返回值处理、消息转换或视图渲染输出。

## 把原理拆开
Filter 位于 Servlet 层，HandlerInterceptor 参与 MVC 处理链。JSON 请求体通常由消息转换器解析；异常可以由 HandlerExceptionResolver 等机制处理。

## 继续追问
Filter 和 Interceptor 哪一层更适合处理所有 HTTP 请求？请求体参数解析失败会不会进入 Controller？

## 容易说错的地方
> 不是所有响应都经过视图解析器，REST 接口通常走消息转换。

## 动手试一遍
画一条 JSON 接口请求链，标出认证、参数校验、业务调用、异常处理和响应序列化。

## 参考资料
- [Spring 官方文档](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet.html)
