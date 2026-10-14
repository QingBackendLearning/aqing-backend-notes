---
{"id":"distributed-session","category":"分布式","grade":"B","title":"多实例登录态应该怎样保存？","summary":"部署多实例后补齐登录状态和撤销机制的取舍。","tags":["分布式","原理"],"updated":"2026-10-15","plain":"用户下一次请求可能被送到另一台机器。如果登录信息只留在第一台机器，换个入口就像从没登录过。","reason":"部署多实例后补齐登录状态和撤销机制的取舍。","exercise":"比较共享 session 与短期 access token 加 refresh token，写出退出和权限变更的处理路径。","effort":25}
---
## 说人话
用户下一次请求可能被送到另一台机器。如果登录信息只留在第一台机器，换个入口就像从没登录过。

## 先这样回答
多实例可使用共享 session 存储，或验证签名 token 等方案。要综合考虑撤销、过期、权限变化、存储可用性和客户端凭据保护；粘性路由只是另一种有边界的选择。

## 把原理拆开
共享 session 便于中心化撤销但依赖存储。自包含 token 校验方便，权限变化与立即撤销需要额外策略；浏览器 cookie 应配置适当的 HttpOnly、Secure 与 SameSite。

## 继续追问
退出登录怎样让旧 token 失效？实例重启或 Redis 故障会怎样影响用户？

## 容易说错的地方
> 使用 JWT 不等于系统完全无状态，也不自动解决 CSRF、XSS 或权限校验。

## 动手试一遍
比较共享 session 与短期 access token 加 refresh token，写出退出和权限变更的处理路径。

## 参考资料
- [Spring 官方文档](https://docs.spring.io/spring-session/reference/index.html)
