---
title: 技术分享
icon: code
index: false
---

# 技术分享

这里整理群聊中不依赖某个 AI 型号、短期内不会随产品迭代失效的开发经验。内容会从原始记录中提炼、校正并补充适用边界；原文仍保留在[资料归档](/archive/)中，方便追溯上下文。

## 渲染

- [Godot 三渲二：低分辨率像素化与轮廓](./rendering/godot-3d-to-2d.md)：用低分辨率视口或后处理把 3D 画面转成像素风，并说明原始轮廓 Shader 的适用范围。

## 算法

- [加权随机的可靠实现](./algorithms/weighted-random.md)：布尔概率、区间随机和不会越界的权重抽取。
- [流场寻路](./algorithms/flow-field-pathfinding.md)：适合大量单位共享目标点的寻路思路及落地注意事项。

## 架构

- [配置与运行时数据分离](./architecture/config-and-runtime-data.md)：区分静态配置、存档状态和瞬时状态，并按项目规模选择加载策略。
- [面向独立游戏的 AI 工具平台架构](./architecture/ai-toolkit-platform.md)：把内容生成、动画、世界生成、测试等能力通过统一任务、资产管线和引擎适配层接入项目。

::: info 整理原则
“技术分享”保留可迁移的方法与原理；带有强时效性的模型排行、产品能力和价格统一放在 [AI 工具推荐](/tools/)；尚未复核的聊天记录留在[资料归档](/archive/)。
:::
