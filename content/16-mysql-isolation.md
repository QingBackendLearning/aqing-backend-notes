---
{"id":"mysql-isolation","category":"MySQL","title":"读已提交和可重复读，快照有什么区别？","summary":"明确讨论的是 InnoDB 的普通一致性读。","tags":["隔离级别","MVCC"],"updated":"2026-10-14","grade":"A","plain":"有人改完并提交了余额，你第二次读能不能看到，取决于隔离级别和读的类型。快照读与加锁读要分开。","reason":"事务读到什么，是理解 MVCC 与锁行为的前置问题。","exercise":"开两个会话，按正文的余额更新顺序，在 RC 和 RR 下各试一次普通 SELECT。","effort":15}
---
## 说人话
有人改完并提交了余额，你第二次读能不能看到，取决于隔离级别和读的类型。快照读与加锁读要分开。

## 先这样回答
InnoDB 中，读已提交的每次一致性读会建立新快照；可重复读在同一事务内的普通一致性读通常使用第一次一致性读建立的快照。这样，相同查询在 RC 下可能看到其他事务新提交的更新，而在 RR 下保持快照视图。

## 把原理拆开
事务 A 普通 SELECT 读到余额 100；事务 B 更新为 200 并提交；A 再做普通 SELECT。RC 可以看到 200，RR 通常仍看到快照里的 100。
这里不能把普通一致性读与 `SELECT ... FOR UPDATE` 混在一起。锁定读和更新具有不同访问语义，RR 也不是“事务里的所有操作只看旧数据”。

## 继续追问
- 快照一定在 BEGIN 时建立吗？——普通 RR 事务通常在第一次一致性读时建立；显式 WITH CONSISTENT SNAPSHOT 是另一种情况。
- RR 下幻读怎么讨论？——区分一致性读的快照与锁定范围访问的 next-key locking。

## 容易说错的地方
> “RR 完全不会出现任何新行现象”没有限定读类型，容易在混合读写场景中出错。

## 动手试一遍
开两个会话，按正文的余额更新顺序，在 RC 和 RR 下各试一次普通 SELECT。

## 参考资料
- [隔离级别 · MySQL 8.4](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html)
- [一致性非锁定读 · MySQL 8.4](https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html)
