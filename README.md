# NCE 1 · Concept Lab

面向《新概念英语第一册》Lesson 73–143 的个人学习网站，帮助建立“听得懂、译得准、说得出”的日常学习节奏。

## 功能

- **听力 + 跟读**：使用公开 YouTube 英文朗读音频，支持播放、暂停与 0.5×、0.8×、1×、1.25× 倍速。
- **课文阅读**：默认隐藏正文；单数课可在英文原文与中文译文间切换。内容按课从原书页面裁切，避免展示整份 PDF。
- **汉译英**：每课提供 3 条核心句式练习。每条都有独立输入框，句式重点默认隐藏，点击眼睛图标后显示。
- **本地保存**：汉译英答案和日历打卡信息均保存在浏览器 `localStorage`，再次进入同一课会自动回显。
- **学习日历**：从 2026-09-01 至 2026-11-22，工作日与周六安排 Lesson 73–143；周日仅进行“错题复习”打卡。
- **快速操作**：使用 Material UI Speed Dial 快速进入听力、汉译英或日历。

## 技术栈

- React 19 + TypeScript + Vite
- Material UI
- YouTube IFrame Player API
- Browser `localStorage`

## 本地运行

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

终端会输出本地访问地址。生产检查：

```bash
npm run lint
npm run build
```

## 课文资源

`public/lesson-pages/` 中保存了 Lesson 73–143 单数课的英文正文与中文译文裁切图。它们来自项目维护者提供的《新概念英语第一册》课文 PDF，仅供个人学习使用。

## 部署

可部署到任何静态托管服务。Vercel 中选择 **Vite**，构建命令为 `npm run build`，输出目录为 `dist`。
