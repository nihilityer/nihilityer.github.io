import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "参考",
      icon: "laptop-code",
      prefix: "reference/",
      link: "reference/",
      children: "structure",
    },
    {
      text: "建议",
      icon: "laptop-code",
      prefix: "suggest/",
      link: "suggest/",
      children: "structure",
    },
    {
      text: "分享",
      icon: "laptop-code",
      prefix: "share/",
      link: "share/",
      children: "structure",
    },
  ],
});
