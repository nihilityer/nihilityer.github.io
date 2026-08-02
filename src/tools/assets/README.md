---
title: 图像与 3D 资产
icon: image
---

# 图像与 3D 资产

## GPT Image 2

**推荐等级：2D 资产首选** · 模型：`gpt-image-2` · 最后核验：2026-08-02

[GPT Image 2](https://developers.openai.com/api/docs/models/gpt-image-2) 是 OpenAI 当前的旗舰图像生成与编辑模型。相比只做一次性文生图，它更适合游戏资产所需的反复修改：输入参考图、保持关键视觉信息、局部或整体编辑、生成不同尺寸，并处理包含文字的画面。

### 适合的游戏工作

- 角色、场景、道具概念图与 mood board。
- 角色设定页、表情与动作参考、宣传插画候选。
- UI 风格稿、图标草案、卡牌画面、商店宣传图和带文字版式。
- 纹理、贴花、背景、粒子序列参考与 3D 生成前的多视角概念输入。
- 基于已有图像换材质、换色、改构图、移除元素和扩展画幅。

### 不要直接假设已经完成

生成图仍可能需要拆层、抠图、无缝化、像素网格对齐、Sprite 切分和压缩。连续角色、精确多视图、逐帧动画与严格 UI 尺寸要用参考图反复迭代并人工校正。生产管线建议固定模型快照 `gpt-image-2-2026-04-21`，避免别名升级造成输出漂移。

- [模型页](https://developers.openai.com/api/docs/models/gpt-image-2)
- [图像生成指南](https://developers.openai.com/api/docs/guides/image-generation)
- [ChatGPT Images 2.0 介绍](https://openai.com/index/introducing-chatgpt-images-2-0/)

## Meshy 6

**推荐等级：3D 资产首选** · 最后核验：2026-08-02

[Meshy 6](https://docs.meshy.ai/en/webapp/getting-started) 提供从文本、单图或多图到带纹理 3D 模型的完整链路，并包含重拓扑、重新纹理、自动绑定和动画。当前 `latest` API 已指向 Meshy 6；Smart Topology 面向实时模型提供可指定面数、较干净拓扑和分离部件的输出。

### 最适合

- 用 GPT Image 2 先制作清晰概念图，再通过 Image to 3D 生成道具、环境组件或角色初模。
- 快速生成大量非核心道具、远景资产和原型内容。
- 对已有模型重新纹理、调整面数、生成 PBR 材质并导出 GLB/FBX。
- 为人形模型准备 A/T Pose、自动绑定并套用基础动作。

### 生产检查

AI 输出的“game-ready”不代表可不经处理直接发布。必须检查轮廓、拓扑流、UV 接缝、材质通道、真实比例、轴向、骨骼权重、碰撞体和最低设备性能。英雄角色和需要复杂变形的模型通常仍要人工重拓扑。

- [Meshy 6 Image to 3D](https://docs.meshy.ai/en/webapp/image-to-3d)
- [API 更新日志](https://docs.meshy.ai/en/api/changelog)

## 值得保留的备选

- **Hunyuan3D 2.1**：需要本地部署、开源权重或自建管线时重点评估；适合有显卡与技术维护能力的团队。[官方仓库](https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1)
- **Blender Geometry Nodes**：不是生成式 AI，但仍是把散布、变体、LOD 与批处理规则变成稳定生产工具的可靠补充。[官方文档](https://docs.blender.org/manual/en/latest/modeling/geometry_nodes/)
