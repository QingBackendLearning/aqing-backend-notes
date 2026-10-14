# 第一版检查记录

日期：2026-10-14（Asia/Shanghai）。

## 已通过

- 内容检查：24 道题、6 个分类，元数据合法且 ID 唯一；每题有回答、原理、追问、易错点和官方参考链接。
- 构建成功；前端 JavaScript 和预览服务器语法检查通过。
- Markdown 渲染转义：原始 script、img、代码中的 HTML 不执行，不生成 javascript: 链接。
- HTTP 首页返回 200，浏览器显示完整首页。
- 全文搜索 volatile 返回 2 条；不存在的关键词显示空状态，抽题按钮禁用；清除筛选恢复列表。
- MySQL 和 Redis 分类分别显示 4 条。
- 题目详情显示正文、代码或例子、参考链接和目录。
- 标记待复习后刷新仍保留；切换已掌握再取消正常。检查中创建的标记已取消。
- 随机抽题默认隐藏答案，展开答案后正文显示。
- 不存在的题目 hash 自动返回目录。
- 正常题目链接刷新后仍进入对应正文；自测后点击上一题/下一题恢复正常阅读，导航立即回到详情顶部。
- 最终检查浏览器控制台未发现 JavaScript 错误。
- 手机视口 390×844（内容区宽 375）与窄屏 320×740（内容区宽 305）无页面横向溢出；手机目录、详情可操作。

## 已上线

- 网站：https://qingbackendlearning.github.io/aqing-backend-notes/
- 仓库：https://github.com/QingBackendLearning/aqing-backend-notes
- 用户登录的新账号为 QingBackendLearning。通过 GitHub 网页创建公开独立仓库，上传 7 个静态文件、README.md 和 source.zip。
- GitHub Pages 发布源：Deploy from a branch，main，/ (root)，HTTPS 已启用。
- 首次 pages build and deployment 运行 38587180088 状态 completed / success；公网首页 HTTP 200。
- 运行结果：https://github.com/QingBackendLearning/aqing-backend-notes/actions/runs/38587180088
- 远程 data.js 的 SHA-256 与已验证的本地成品一致。
- 公网浏览器显示 24 道题；搜索 volatile 返回 2 条；直接打开 concurrent-volatile 题目正常；随机抽题隐藏答案正常。
- 上线截图在 .qa/live.jpg。本地临时 QA 服务器已停止，公网网站不依赖本机运行。

## 当前边界

- 本地自定义 GitHub Pages Actions workflow 是可选方案，首版未启用；实际运行的是 GitHub 分支发布流程。
- 复习标记仅为当前来源的 localStorage，未实现账号和跨设备同步。
- 首批题目是知识整理稿，不能当作用户亲历、公司真实题库或实测面试频率。
- 未验证国内公网访问速度；需上线后实际测量。
- 首页互动题目采用 hash 链接，搜索引擎收录未优化；reading.html 可直接读取所有正文。
- 本地 Git 已初始化 main，并提交源码；没有命令行推送凭据，远程成品通过网页上传。本地源码 main 与远程成品 main 的历史不同，不直接强推。本地静态成品另存为 aqing-backend-notes-static.zip。
