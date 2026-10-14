---
{"id":"redis-atomic","category":"Redis","title":"Redis 单条命令原子，多条命令也原子吗？","summary":"把一次操作与一个业务流程分开讨论。","tags":["原子操作","事务"],"updated":"2026-10-14"}
---
## 先这样回答
不能直接推导。比如先 GET 再 SET，中间可能插入其他客户端操作，导致更新丢失。计数优先使用 INCR 等单条操作；需要复合逻辑时可评估事务、WATCH 或服务端脚本，并了解各自限制。

## 把原理拆开
```text
A: GET count -> 10
B: GET count -> 10
A: SET count 11
B: SET count 11
```
最终只有 11，而不是 12。Redis 事务能使队列中的命令连续执行，但没有传统关系数据库式的自动回滚；执行期间某条命令报错，不代表已执行命令被撤销。

## 继续追问
- WATCH 做什么？——执行事务前检测被监视 key 的变化，变化时事务不执行，应用需要处理重试。
- Lua 脚本能随便写很长吗？——脚本执行会阻塞其他服务工作，必须控制耗时；报错也不能假设自动撤销此前写入。

## 容易说错的地方
> 不要把“执行期间不被其他客户端命令插入”和“失败会回滚”混成一个保证。

## 参考资料
- [Redis Transactions](https://redis.io/docs/latest/develop/using-commands/transactions/)
- [Redis Lua 脚本](https://redis.io/docs/latest/develop/programmability/eval-intro/)
