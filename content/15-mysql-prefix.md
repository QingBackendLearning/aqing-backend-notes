---
{"id":"mysql-prefix","category":"MySQL","title":"联合索引的最左前缀，应该怎么理解？","summary":"理解排序顺序，再用执行计划判断具体使用情况。","tags":["联合索引","最左前缀"],"updated":"2026-10-14"}
---
## 先这样回答
联合索引 `(a, b, c)` 按 a、再 b、再 c 的顺序组织。普通索引查找可以利用 `(a)`、`(a,b)`、`(a,b,c)` 这些左侧连续前缀。只给 b 条件时，通常无法像给 a 一样直接缩小连续查找范围。

## 把原理拆开
```sql
CREATE INDEX idx_city_age ON users(city, age);
SELECT id FROM users WHERE city = '杭州' AND age = 22;
```
先按城市分组，再在同一城市内按年龄排列。SQL 条件书写顺序不要求与索引列顺序一致，优化器会分析条件。

## 继续追问
- 范围条件之后的列是否完全没用？——不能一概而论。定位区间、索引条件下推和覆盖查询要分别讨论。
- 没有最左列就绝对不用索引吗？——可能出现索引扫描或满足条件的 skip scan 等计划，应看 EXPLAIN。

## 容易说错的地方
> “不满足最左前缀，索引一定完全失效”太绝对。先说明你讨论的是哪一种访问方式。

## 参考资料
- [多列索引 · MySQL 8.4](https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html)
- [Skip Scan · MySQL 8.4](https://dev.mysql.com/doc/refman/8.4/en/range-optimization.html#range-access-skip-scan)
