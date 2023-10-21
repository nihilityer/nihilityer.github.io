import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  hostname: "https://docs.nihilityer.top/",

  author: {
    name: "nihilityer",
    url: "https://docs.nihilityer.top/",
  },

  copyright: "by nihilityer",
  footer: "MIT Licensed | Copyright ©  nihilityer",
  displayFooter: true,

  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "nihilityer/nihilityer.github.io",

  docsDir: "src",
  docsBranch: "master",

  navbar: ["/", "/reference/", "/experience/"],

  sidebar: {
    "/essay/": "structure",
    "/reference/": "structure",
    "/experience/": "structure"
  },

  pageInfo: ["Date", "Category", "Tag", "ReadingTime", "Word"],

  // encrypt: {
  //   config: {
  //     "/essay/": ["nihilityer"]
  //   }
  // },

  lastUpdated: false,
  contributors: false,
  editLink: false,

  plugins: {
    comment: false,
    components: [
      "PDF"
    ],

    // Disable features you don't want here
    mdEnhance: {
      tasklist: true,
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      imageSize: true,
      include: true,
      katex: true,
      lazyLoad: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommanded",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommanded",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vpre: true,
      vuePlayground: true,
    },

    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Demo",
            short_name: "Demo",
            url: "/demo/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },
});
