# 第一版检查记录

## 2026-10-15 分级题库扩展验收

- 原 24 道扩充为 120 道、12 个专题，各 10 道；A 59、B 44、C 17。全题都有分级理由、人话解释、七个阅读段落、练习与官方参考。ABC 明确为学习优先级，首轮练习时间为编辑估计。
- 保留全部原题 ID 和 aqing-notes-progress-v1 存储键。数值排序文件前缀，避免两位与三位文件名混排造成原题序号变化。
- 自动检查通过：120 题与 12 分类覆盖、元数据/段落一致、所有旧链接保留、ABC 排序、专题/等级/状态/关键词组合、搜索大小写、人话搜索范围、分页不漏不重及越界处理、HTML 转义。
- 修复 Markdown URL 含 Java 方法参数括号时的截断；回归检查通过。
- 本地浏览器：先学 A 级显示59题/3页；Spring+A+“事务”返回1题；人话详情显示解释、练习、来源，可展开七段完整笔记。
- 浏览器复习操作：新题标记待复习、刷新保留、切换已掌握再取消均正常；测试创建的标记已取消。
- 自测答案和目录同时隐藏，展开后正常；下一题恢复正常阅读。分页20题、等级变化重置页码、空结果禁用抽题与清除筛选正常。错误题目链接返回目录。
- 人话模式与深色模式刷新保留。桌面、390×844与320×740窄屏阅读正常，页面宽度分别375与305，没有页面横向溢出；代码块与手机分类可在自身范围横向滚动。视口临时覆盖已恢复。
- 对128个不同参考链接做HTTP检查，修复2个404、2个跳到新版Java首页的旧路径、2个AWS泛目录跳转；替换目的页面均返回200。OpenAI官方文档对命令行请求返回403但已通过官方网页检索读取核验；AWS/OWASP个别请求受网络限制，已通过可读官方文档核验。没有宣称所有网络环境都可访问。
- 本地QA截图：.qa/v2-mobile.jpg、.qa/v2-desktop.jpg。外部链接状态和人工浏览器结果未作为CI联网依赖。
- 题库发布提交0db17dd659126621d1797626215e5988d6d21955。Git HTTPS连接失败后通过已认证gh的Git Data API发布；远程tree c65debcf21eab4f966f244c8532be8e00d9fab7a与本地审核源码完全一致，main按原父提交快进，未强推，本地引用同步。
- 自动部署[38599274109](https://github.com/QingBackendLearning/aqing-backend-notes/actions/runs/38599274109) completed / success；公网index.html、data.js、app.js、filters.js、styles-v2.css、reading.html均200，SHA-256逐一与本地成品一致。公网浏览器可见新版首页。无脚本阅读版包含120个article且没有script。

## 2026-10-15 字号调整

- 用户要求完成公网验证后把字号稍微放大；上面的题库版本验证完成后实施。
- 桌面正文14→16px、题目标题15→17px；手机正文13→15px、标题13→15px。人话、筛选、来源和辅助文字同步提高约1–2px。阅读版加载同一字号样式。
- 小屏筛选、计数与标题允许换行，320像素下导航与首页按钮保持完整；代码块只在自身区域滚动。新增reading-size.css作为最后一层样式。
- 本地检查与构建通过；浏览器确认桌面题目17px/正文16px，手机正文15px，390/320像素均无页面横向溢出。预览截图在.qa/font-desktop.jpg。
- 字号发布提交747d36bd6e72736aafb6aa585e5ce96ff9634568，通过gh Git Data API快进发布，tree bacdc5822b30a253218f0321e9014a87f4e147fb与本地提交一致。
- 自动部署[38601319958](https://github.com/QingBackendLearning/aqing-backend-notes/actions/runs/38601319958)检查、构建、部署全部success。公网index、data、app、filters、styles、styles-v2、reading-size与reading八个文件全部HTTP200，SHA-256逐项与本地成品一致。reading-size.css的SHA-256为847d69914327bd3833efb86a864cbeafbb9028ef0a214d418769cdd874b11dee。
- 字号改动前完成的公网资源核验已记录；公网页面DOM交互在本次连接中超时，未声称完成字体版的公网交互回归。主要交互已在上一轮本地验收，字号版已做本地布局/计算字号检查与公网资源一致性核验。

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

## 首次静态发布（随后迁移）

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

- 2026-10-14 已完成自动部署迁移，当前使用源码 main 和 GitHub Actions，见下节。
- 复习标记仅为当前来源的 localStorage，未实现账号和跨设备同步。
- 首批题目是知识整理稿，不能当作用户亲历、公司真实题库或实测面试频率。
- 未验证国内公网访问速度；需上线后实际测量。
- 首页互动题目采用 hash 链接，搜索引擎收录未优化；reading.html 可直接读取所有正文。
- 初次上传时源码与成品历史分离；本次通过保留双方父提交的合并完成迁移，本地 main 已跟踪 origin/main。无需强推。本地旧静态包保留为 aqing-backend-notes-static.zip。

## GitHub CLI 与自动部署配置

- GitHub CLI 2.102.0 从 cli/cli 官方 Windows 发行包安装，SHA-256 与官方校验文件一致；加入当前用户 PATH。
- 程序路径：C:/Users/firew/AppData/Local/Programs/GitHub CLI/bin/gh.exe。
- 用户完成设备授权；gh 验证账号 QingBackendLearning、仓库权限 ADMIN。凭据存储为 keyring，未写入项目。
- 本仓库 HTTPS Git 凭据助手使用 gh，提交身份为 QingBackendLearning 和 GitHub noreply 邮箱；全局 Git 身份不变。
- 已安装 C:/Users/firew/.codex/skills/gh-cli，来源 trailofbits/skills 的 plugins/gh-cli/skills/gh-cli；下一轮可被技能目录发现。
- 备份分支：backup/source-before-actions-20261014、backup/pages-before-actions-20261014。首次静态发布提交 8d290d5 已包含在当前 main 的祖先中。
- 源码迁移提交：f880429cc17154cbf31255ad107e1897243c3e51，已正常推送。Pages build_type 已确认 workflow，HTTPS 启用。
- 工作流：Deploy notes to GitHub Pages，Node.js 24，检查 → 构建 → 发布 dist/。无需浏览器上传成品。
- 首次自动部署：https://github.com/QingBackendLearning/aqing-backend-notes/actions/runs/38590568079 ，检查、构建、部署均 success。
- GitHub Pages 部署 7069852142 对应迁移提交；公网首页 HTTP 200，线上 data.js 的 SHA-256 与本地源码构建结果一致。
- 本机默认 Node.js 18 保留；scripts/site.ps1 已验证可使用已有的 Node.js 24.19.0 运行时完成检查和构建。
- 最后的本记录更新为纯文档提交，使用 [skip ci]，不重复发布相同静态内容。后续普通内容/代码提交仍会自动触发工作流。
