# TechThem-Blog (WhiteRiceGG Blog)

> 一个致力于探索极简设计与高性能技术交汇点的数字空间。基于 Vue 3 + Vite 开发的极客风、响应式、且自带渐变光晕交互效果的个人技术博客。

---

## 🌟 项目亮点与特性

- **💻 极客风视觉体验**：结合赛博朋克与玻璃拟态（Glassmorphism）设计风格，提供全屏粒子格网背景与动态鼠标流光轨迹效果。
- **🌓 自适应暗黑模式**：内置多主题切换，并在本地持久化保存用户的偏好设置。
- **📄 动态 Markdown 解析**：直接读取 `src/content/posts/` 目录下的 Markdown 文章，自动解析 YAML Frontmatter，支持代码高亮与阅读时间预估。
- **🔍 实时全局检索**：顶栏内置实时关键词搜索，可过滤文章标题、摘要及分类标签。
- **⏱️ 流畅切换动画**：页面间切换采用平滑淡入淡出动效，并包含精准的滚动行为控制。
- **📂 完整文章归档与分类**：支持按时间轴展示的“归档页”以及按标签/分类归类的“分类页”。

---

## 🛠️ 技术栈说明

- **核心框架**: Vue 3 (Composition API / `<script setup>`)
- **构建工具**: Vite 8.x
- **路由管理**: Vue Router 4.x
- **文章处理**: `markdown-it` (Markdown 解析) & `highlight.js` (代码语法高亮)
- **图标系统**: `lucide-vue-next` (现代化图标)
- **样式方案**: 原生 CSS (CSS 变量、Grid/Flexbox 弹性布局、毛玻璃特效等)

---

## 📁 目录结构说明

```text
TechThem-Blog/
├── public/                  # 静态资源目录
│   ├── fonts/               # 本地字体文件（Inter, JetBrains Mono, Noto Sans SC）
│   └── favicon.png          # 站点图标
├── src/
│   ├── components/          # 公共组件
│   │   ├── Header.vue       # 导航栏组件（含搜索、暗黑模式切换）
│   │   ├── Footer.vue       # 页脚组件
│   │   ├── PostCard.vue     # 文章卡片组件
│   │   └── MouseGlow.vue    # 动态鼠标流光跟随组件
│   ├── config.js            # 全局网站配置（网站名、备案号、Logo等）
│   ├── content/
│   │   └── posts/           # 博客 Markdown 原始文章存储目录
│   ├── data/
│   │   └── posts.js         # 文章数据解析与加载逻辑（使用 import.meta.glob）
│   ├── router/              # 路由及菜单配置目录
│   │   ├── index.js         # 路由配置与钩子初始化
│   │   └── page.js          # 页面路由地址定义与动态组件导入（含菜单配置）
│   ├── utils/
│   │   └── transition.js    # 页面切换动效过渡工具
│   ├── views/               # 页面级视图组件
│   │   ├── HomeView.vue     # 首页
│   │   ├── AboutView.vue    # 关于我
│   │   ├── ArchiveView.vue  # 归档时间轴
│   │   ├── CategoriesView.vue # 文章分类/标签筛选
│   │   └── PostDetail.vue   # 博客详情页
│   ├── App.vue              # 根组件
│   ├── index.css            # 全局样式与核心设计系统（CSS 变量、动画）
│   └── main.js              # 应用入口文件
├── index.html               # 页面入口
├── package.json             # 依赖配置文件
├── vite.config.js           # Vite 配置文件
└── README.md                # 本说明文件
```

---

## 🚀 快速开始

在本地运行或构建此博客项目，需要准备好 Node.js 环境（推荐 v18+）。

### 1. 安装项目依赖
在项目根目录下执行以下命令：
```bash
npm install
```

### 2. 启动开发服务器
启动本地开发服务，自带热重载（HMR）功能：
```bash
npm run dev
```
启动后，浏览器会自动打开或你可以访问控制台输出的地址（默认端口为 `1226`）。

### 3. 构建生产环境包
对项目进行打包优化：
```bash
npm run build
```
打包产物将输出在 `dist` 目录下。

### 4. 本地预览生产构建
在本地预览打包后的生产版本：
```bash
npm run preview
```

---

## ✍️ 撰写新博客

撰写并发布新文章非常简单，只需在 `src/content/posts/` 目录下创建一个新的 `.md` 文件。

### 格式模版

每篇 Markdown 文章的头部必须包含符合 YAML 语法的 Frontmatter 信息，格式如下：

```markdown
---
title: "你的文章标题"
date: "YYYY-MM-DD"
excerpt: "这里是文章的简短摘要或前言，会展示在首页的列表卡片中。"
readingTime: "约 5 分钟"
tags: ["标签1", "标签2", "Tag3"]
---

# 你的文章标题

这里是正文内容...
```

*注意：`src/data/posts.js` 中会对以上字段进行自动解析与排序（按日期降序）。*

---

## 💡 自定义与扩展

- **修改全局网站配置**：修改 `src/config.js` 配置文件，即可直接配置或更新网站名称、Logo 主副标题、页脚 ICP 备案号及对应链接、版权归属和年份信息，无需在其他页面或 HTML 中手动修改。
- **修改主题颜色**：你可以通过修改 `src/index.css` 中的 CSS 变量（如 `--color-accent` 等）快速定制博客的色调。
- **修改关于页面**：关于页面的内容位于 `src/views/AboutView.vue`，可根据个人信息直接修改。
- **环境变量配置**：如果需要接入其他功能（如 AI 智能交互），可在 `.env` 环境变量文件中定义，并在 `vite.config.js` 扩展。
