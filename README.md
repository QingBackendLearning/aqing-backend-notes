# 阿青的后端面试笔记

网站：https://QingBackendLearning.github.io/aqing-backend-notes/

Java、并发、JVM、MySQL、Redis 和计算机网络，共 24 道基础知识整理题。每题包含简短回答、原理、追问、易错点和官方参考资料。

支持分类、全文搜索、随机抽题、隐藏答案自测，以及当前浏览器的复习标记。复习记录保存在 localStorage，无登录或跨设备同步。

首批内容是知识整理稿，不代表作者个人面试原话或任何公司的真实题库。

## 当前发布方式

仓库根目录是已构建的静态成品。GitHub Pages 从 main 分支根目录发布。

source.zip 包含 Markdown 题目、页面源码、无第三方依赖的 Node.js 构建脚本和可选的 GitHub Actions 配置。

## 更新网站

解压 source.zip，用 Node.js 20 或以上运行：

```sh
npm run check
npm run build
```

修改 content/ 下的 Markdown 或 src/ 下的页面文件，重新构建后，把 dist/ 内文件覆盖上传到本仓库根目录；同时更新 source.zip。提交后 GitHub Pages 自动重新发布。

若以后将源码直接放入仓库，可切换为 GitHub Actions 发布。不要同时保留两个发布源。

不启用 JavaScript 时，可打开 reading.html 阅读全部题目。
