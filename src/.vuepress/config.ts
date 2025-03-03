import { defineUserConfig } from "vuepress";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { baiduAnalyticsPlugin } from '@vuepress/plugin-baidu-analytics'
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "AI游戏开发参考",
  description: "使用AI辅助游戏开发的一些参考案例",

  theme,
  plugins: [
    googleAnalyticsPlugin({
      id: 'G-LXCRNWBQ53',
    }),
    baiduAnalyticsPlugin({
      id: '2e5ea6f6f805e35bff32a7ac99b9cd4b'
    }),
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
