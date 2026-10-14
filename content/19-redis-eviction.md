---
{"id":"redis-eviction","category":"Redis","title":"过期删除和内存淘汰，是一回事吗？","summary":"TTL 到期与达到 maxmemory 是不同触发条件。","tags":["TTL","内存淘汰"],"updated":"2026-10-14","grade":"A","plain":"到期删除是看时间，内存淘汰是看空间。不等到闹钟响，内存紧张时也可能先把缓存移走。","reason":"缓存随时可能缺失，业务设计不能只依赖 TTL。","exercise":"写下 allkeys-lru、volatile-lru、noeviction 各自遇到内存压力时会怎么做。","effort":15}
---
## 说人话
到期删除是看时间，内存淘汰是看空间。不等到闹钟响，内存紧张时也可能先把缓存移走。

## 先这样回答
不是。过期机制围绕 key 的 TTL；淘汰机制围绕内存压力和 maxmemory 策略。一个 key 没到过期时间，也可能因淘汰策略被移除。反过来，TTL 到期不意味着所有过期数据在同一瞬间被扫描并释放。

## 把原理拆开
allkeys-lru 在所有 key 中按近似 LRU 策略选择；volatile-lru 只从设置过期时间的 key 中选；noeviction 不主动淘汰来腾空间，无法容纳相应写入时会返回错误。
volatile 系列策略在没有可淘汰的过期 key 时，也无法凭空释放足够空间。业务要能处理缓存缺失与写失败。

## 继续追问
- TTL 能保证 key 在过期之前一直存在吗？——不能，删除、覆盖和淘汰都可能改变它。
- Redis LRU 是严格维护完整访问顺序吗？——通常使用抽样近似算法。

## 容易说错的地方
> “数据没到期就不会丢”忽略了淘汰策略和应用操作。

## 动手试一遍
写下 allkeys-lru、volatile-lru、noeviction 各自遇到内存压力时会怎么做。

## 参考资料
- [Redis Key eviction](https://redis.io/docs/latest/develop/reference/eviction/)
- [EXPIRE 的过期机制说明](https://redis.io/docs/latest/commands/expire/)
