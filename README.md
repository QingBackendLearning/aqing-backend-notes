# 阿青的后端面试笔记

[打开网站](https://qingbackendlearning.github.io/aqing-backend-notes/) · [GitHub 仓库](https://github.com/QingBackendLearning/aqing-backend-notes)

静态个人知识网站。首批 24 道题覆盖 Java、并发、JVM、MySQL、Redis 和计算机网络，支持全文搜索、分类、随机抽题、隐藏答案自测，以及待复习/已掌握标记。

首批内容依据官方资料整理，不是作者亲历面试题或公司的真实题库。个人经历只在有真实素材并确认后添加。

## 更新一篇笔记

1. 编辑 content/ 中的 Markdown 文件，或新增一个文件。
2. 检查并构建，确认本地效果。
3. 提交到 main 并推送；GitHub Actions 自动检查、构建和发布。

```powershell
cd 'D:\小红书ai求职项目\网站\backend-notes'
.\scripts\site.ps1 build
git add content/
git commit -m "Update interview notes"
git push origin main
```

只提交本次需要更新的文件。页面修改放在 src/；不要编辑或提交 dist/。推送前如有其他人的新提交，先拉取并处理冲突。

## 本地运行

Node.js 20 或以上，无第三方依赖，不需要 npm install；CI 使用 Node.js 24。

```powershell
.\scripts\site.ps1 check
.\scripts\site.ps1 build
.\scripts\site.ps1 preview
```

项目内 PowerShell 入口优先使用系统 Node 20+，否则使用本机 Codex 已提供的 Node 运行时。预览地址 http://127.0.0.1:4173；修改文件后重新构建并刷新。

有合适 Node 的环境也可以直接用 npm run check、npm run build 和 npm run dev。

## 内容格式

文件开头使用 --- 包裹的 JSON 元数据，参照现有文件；id 唯一，仅包含小写字母、数字和连字符。必备段落：先这样回答、把原理拆开、继续追问、容易说错的地方、参考资料。

支持二级标题、段落、列表、引用、行内代码、代码块、加粗和 HTTPS 链接；不支持原始 HTML 或完整 Markdown 方言。构建脚本校验元数据并转义 HTML。

不声称未证实的面试频率、公司题库或个人经历。新知识和版本变化应核对官方资料，注明适用版本。

## GitHub 与发布

主分支 main 保存可编辑源码，.github/workflows/pages.yml 在推送后自动部署 dist/。GitHub Pages 发布源为 GitHub Actions，地址沿用原网址；相对资源路径适用于仓库子路径，题目采用 #q/id 链接，无需路由重写。

2026-10-14 从旧的“main 根目录静态成品”迁移而来，旧提交已作为合并历史保留。本地还保留 backup/source-before-actions-20261014 和 backup/pages-before-actions-20261014 两个备份分支。后续不再上传 source.zip 或手动覆盖根目录静态文件。

本机 GitHub CLI 登录账号为 QingBackendLearning，凭据由系统密钥存储保存。这个仓库单独配置 gh 作为 HTTPS Git 凭据助手，提交邮箱使用 GitHub noreply 地址。全局 Git 身份不由本项目修改。

查看当前登录和部署状态：

```powershell
gh auth status
gh run list --repo QingBackendLearning/aqing-backend-notes --limit 5
```

新终端可直接用 gh；仍在运行的旧终端如未更新 PATH，可使用用户目录 AppData/Local/Programs/GitHub CLI/bin/gh.exe 的完整路径。密码或 Token 不写入项目文件。

## 数据与检查

复习标记保存在当前浏览器当前来源的 localStorage，不上传服务器；换浏览器、换域名或清理站点数据后不会自动同步。无账号、数据库、分析追踪或外部字体依赖。

reading.html 提供无 JavaScript 阅读版。验证记录见 VERIFICATION.md；每次发布的结果以 GitHub Actions 与实际网址检查为准。
