import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/tools/": [
    { text: "AI 工具总览", link: "/tools/" },
    { text: "代码开发：Codex", link: "/tools/code/" },
    { text: "图像与 3D 资产", link: "/tools/assets/" },
    { text: "2D/3D 动画、音频与视频", link: "/tools/media/" },
    { text: "本地化与运行时 AI", link: "/tools/language-runtime/" },
  ],
  "/tech/": [
    { text: "技术分享总览", link: "/tech/" },
    { text: "渲染 · Godot 三渲二", link: "/tech/rendering/godot-3d-to-2d.html" },
    { text: "算法 · 加权随机", link: "/tech/algorithms/weighted-random.html" },
    { text: "算法 · 流场寻路", link: "/tech/algorithms/flow-field-pathfinding.html" },
    {
      text: "架构 · 配置与运行时数据",
      link: "/tech/architecture/config-and-runtime-data.html",
    },
    {
      text: "架构 · AI 工具平台",
      link: "/tech/architecture/ai-toolkit-platform.html",
    },
  ],
  "/archive/": [{ text: "资料归档说明", link: "/archive/" }],
  "/resources/": [
    { text: "免费资源获取", link: "/resources/" },
    { text: "官方文档与学习", link: "/resources/official-docs.html" },
  ],
  "/reference/": "structure",
  "/suggest/": "structure",
  "/share/": "structure",
  "/": [],
});
