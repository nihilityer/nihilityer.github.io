---
home: true
icon: home
title: 首页
heroImage: /logo.svg
heroText: AI 游戏开发参考
tagline: 持续追踪真正能辅助或直接完成游戏开发工作的 AI 工具
actions:
  - text: AI 工具推荐 →
    link: /tools/
    type: primary
  - text: 技术分享
    link: /tech/
  - text: Codex
    link: https://developers.openai.com/codex/
  - text: GPT Image 2
    link: https://developers.openai.com/api/docs/models/gpt-image-2
  - text: Godot 文档
    link: https://docs.godotengine.org/zh-cn/stable/

features:
  - title: 代码开发
    icon: terminal
    details: 以 Codex 为重点，覆盖理解项目、实现功能、修复问题、测试、审查与自动化。
    link: /tools/code/
  - title: 游戏资产
    icon: image
    details: GPT Image 2、Meshy 6 等图像、概念设计、2D 与 3D 资产生成工具。
    link: /tools/assets/
  - title: 2D 动画
    icon: person-running
    details: Ludo Sprite Generator、Layer 与 Wan Animate，覆盖 Sprite Sheet、动作迁移和动画编辑。
    link: /tools/media/#2d-动画
  - title: 3D 动画
    icon: person
    details: Cartwheel、Uthana 与 Move AI，覆盖文本动作、视频动捕、绑定和重定向。
    link: /tools/media/#3d-动画
  - title: 视频与声音
    icon: video
    details: Seedance 2.0、ElevenLabs 等视频、配音、音效和音乐工具。
    link: /tools/media/#视频生成
  - title: 技术分享
    icon: code
    details: 从群聊记录中提炼不随 AI 型号快速过时的渲染、算法与工程实践。
    link: /tech/
  - title: 原始资料
    icon: box-archive
    details: 完整保留群友分享、AI 实验、游戏工具和历史记录。
    link: /archive/
---

## 这个项目是什么

本站整理自 **AI 工具辅助游戏开发交流群** 的分享与实践，群号：**753289747**。

文档的主题是工具，而不是规定一套游戏开发流程。我们关注每种 AI 工具能解决什么问题、能否直接交付可用结果、与传统软件怎样衔接，以及它是否仍代表当前较好的选择。

内容按时效性分为三层：[AI 工具推荐](/tools/)持续追踪当前产品，[技术分享](/tech/)整理可长期复用的方法，[资料归档](/archive/)保留未经重写的群聊原始资料。

## 当前重点推荐

| 方向 | 首选工具 | 适合完成的工作 |
| --- | --- | --- |
| 代码与项目维护 | [Codex](/tools/code/) | 阅读仓库、实现功能、修复错误、运行测试、代码审查、重复任务自动化 |
| 2D 与概念资产 | [GPT Image 2](/tools/assets/#gpt-image-2) | 概念图、角色设定、UI 草图、纹理素材、带文字图片、局部编辑和风格迭代 |
| 3D 资产 | [Meshy 6](/tools/assets/#meshy-6) | 单图/多图转 3D、智能拓扑、纹理、重拓扑、绑定与基础动画 |
| 2D 动画 | [Ludo Sprite Generator](/tools/media/#ludo-sprite-generator) | 文本/图片生成动画、动作迁移、编辑 Sprite Sheet、补间与引擎导出 |
| 3D 动画 | [Cartwheel](/tools/media/#cartwheel) | 文本转动作、视频动捕、自动绑定、动作重定向与 FBX/GLB 导出 |
| 配音与音效 | [ElevenLabs](/tools/media/#elevenlabs) | 角色语音、声音设计、环境声、Foley、循环音效和音乐草案 |
| 视频生成 | [Seedance 2.0](/tools/media/#seedance-20) | 文本、图像、视频、音频多模态参考，复杂运动、镜头和原生音画生成 |

::: tip 更新状态
主推荐最后核验于 **2026-08-02**。AI 工具变化很快，本站优先链接官方模型页、文档和更新日志；价格、授权范围与可用地区请在实际使用前再次确认。
:::

历史群聊整理没有删除，见[资料归档](/archive/)。其中经过复核、与具体 AI 版本无关的内容会提炼到[技术分享](/tech/)，例如 [Godot 三渲二像素化与轮廓](/tech/rendering/godot-3d-to-2d.html)。
