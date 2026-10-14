---
{"id":"network-cache","category":"计算机网络","title":"HTTP 强缓存和协商缓存，怎么串起来？","summary":"先看新鲜度，再看是否需要向服务端验证。","tags":["HTTP 缓存","ETag"],"updated":"2026-10-14","grade":"A","plain":"缓存里的副本还能直接用就先用；需要确认时问服务端“还是这个版本吗”。没变就复用已有正文。","reason":"新鲜度与验证机制是解释 HTTP 缓存行为的基础。","exercise":"比较 max-age、no-cache、no-store 的请求流程，并用浏览器网络面板观察一个带 ETag 的资源。","effort":15}
---
## 说人话
缓存里的副本还能直接用就先用；需要确认时问服务端“还是这个版本吗”。没变就复用已有正文。

## 先这样回答
“强缓存”和“协商缓存”是常见教学称呼。缓存响应仍新鲜且允许复用时，可以直接使用；需要验证时，客户端或缓存可以携带 If-None-Match 等条件请求，服务端依据 ETag 等验证器判断，未变化时可返回 304。

## 把原理拆开
Cache-Control 的 max-age 等指令影响新鲜度。ETag 标识响应表示的版本；验证匹配后可以复用缓存内容。
no-cache 允许存储，但复用前需要验证；no-store 要求不存储。它们不是同一个指令。

## 继续追问
- 304 的响应体是不是最新正文？——不是，客户端复用已有缓存正文并按规则更新元数据。
- ETag 一定是文件 MD5 吗？——不是，生成规则由服务端决定，还要区分强、弱验证器。

## 容易说错的地方
> “no-cache 就是不缓存”是常见误读，正确重点是复用前验证。

## 动手试一遍
比较 max-age、no-cache、no-store 的请求流程，并用浏览器网络面板观察一个带 ETag 的资源。

## 参考资料
- [HTTP Caching · RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html)
- [条件请求 · RFC 9110 §13](https://www.rfc-editor.org/rfc/rfc9110.html#section-13)
