import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  title: "nihilityer",

  lang: "zh-CN",

  theme,

  shouldPrefetch: false,
});
