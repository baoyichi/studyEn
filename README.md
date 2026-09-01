# 数字旅行邮票册

一个移动端优先的本地旅行手帐 MVP：以一次旅行作为一页活页纸，在其中逐张制作照片邮票、拖动拼贴并保留旅行记忆。

## 技术栈

- React + Vite + TypeScript
- React Router
- Zustand（界面状态）
- IndexedDB / idb（旅行资料和本机照片）
- dnd-kit（触控拖动）
- react-easy-crop（照片裁切预览）
- Material UI（表单、弹层、操作按钮与比例切换）

照片不会上传到服务器；浏览器清除站点数据后，本地旅行册也会被移除。

## 本地启动

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

打开终端显示的本地地址。检查生产构建：

```bash
npm run lint
npm run build
```

## 部署到 Vercel

1. 将此目录推送到 GitHub、GitLab 或 Bitbucket。
2. 在 Vercel 中导入该仓库。
3. Framework Preset 选择 **Vite**（仓库内已包含对应构建配置）。
4. 点击 Deploy；构建命令为 `npm run build`，输出目录为 `dist`。

## V1 范围

已实现：旅行封面、新建旅行、单张图片邮票、横竖方比例、带锯齿边的裁切预览、EXIF 日期与 GPS 地点自动读取、本地保存、单页拼贴、触控拖拽、删除确认、自动重新排版，以及手机/iPad 布局。

地点识别依赖原图保留 GPS EXIF；社交媒体转存的图片通常会移除这些信息。无法读取时仍可手动填写地点和日期。

下一阶段适合接入 Supabase Authentication + Storage，实现帐号、跨设备同步与真实封面图；随后再考虑导出图片/PDF 和移动 App 壳。
