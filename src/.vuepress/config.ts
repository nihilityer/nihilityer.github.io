import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "AI游戏开发参考",
  description: "使用AI辅助游戏开发的一些参考案例",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
