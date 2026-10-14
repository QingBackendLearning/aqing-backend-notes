# 阿青的后端面试笔记

静态个人知识网站。首批 24 道知识题，覆盖 Java、并发、JVM、MySQL、Redis、计算机网络。支持全文搜索、分类、随机抽题、隐藏答案自测、待复习/已掌握标记和题目链接。

首批内容为依据官方资料整理的编辑稿，不是用户亲历面试题或公司题库。个人经历仅在有真实素材并确认后添加。

## 本地运行

需要 Node.js 20 或以上；无第三方依赖，不需要 npm install。

```powershell
cd 'D:\小红书ai求职项目\网站\backend-notes'
npm run check
npm run dev
```

打开 http://127.0.0.1:4173 。修改 Markdown 或源码后，重启 dev 或运行 npm run build 并刷新页面。

## 更新内容

在 content/ 中新建 Markdown 文件。文件开头使用 --- 包裹的 JSON 元数据，参照现有文件；id 必须唯一、由小写字母、数字和连字符组成。支持二级标题、段落、列表、引用、行内代码、代码块、加粗和 HTTPS 链接，不支持原始 HTML 或完整 Markdown 方言。

必备段落：先这样回答、把原理拆开、继续追问、容易说错的地方、参考资料。标题和正文不要声称未证实的面试频率、公司题库或个人经历。

构建脚本校验元数据，转义 HTML，并生成 dist/。src/ 维护外观与交互，dist/ 不手动编辑。

## GitHub Pages 上线

1. 创建独立 GitHub 仓库，建议名称 aqing-backend-notes；不要上传整个小红书项目。免费 GitHub Pages 通常使用公开仓库，创建前确认公开的是这里的代码与题目。
2. 将本目录提交到仓库 main 分支。已有 .github/workflows/pages.yml。
3. 仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions。
4. 在 Actions 中运行 Deploy notes to GitHub Pages，或 push 新提交触发部署。
5. 使用部署任务返回的 page_url；项目网站一般为 https://用户名.github.io/仓库名/。

所有资源均使用相对路径，适用于仓库子路径和自定义域名。题目链接使用 #q/id，静态服务器无需路由重写。reading.html 提供无 JavaScript 阅读版。

官方部署说明：https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## 数据保存

复习标记保存在当前浏览器当前网站来源的 localStorage，不上传服务器；换浏览器、换域名或清理站点数据后不会自动同步。禁止保存时页面提示标记仅在当前会话有效。无账号、数据库、分析追踪和外部字体依赖。

## 验证

npm run check 校验内容与渲染转义。功能需检查搜索、空状态、分类、复习标记重载、直接题目链接、随机自测、手机布局以及 Pages 子路径资源加载。检查记录见 VERIFICATION.md。
