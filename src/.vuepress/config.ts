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
      id: '77d2cbebcc7fa2a6d8942b48519ea721'
    }),
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
