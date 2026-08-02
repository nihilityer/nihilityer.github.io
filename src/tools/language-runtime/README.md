---
title: 本地化与运行时 AI
icon: language
---

# 本地化与运行时 AI

型号最后核验于 **2026-08-02**。

## 游戏文本本地化

**推荐：GPT-5.6 系列 + 项目术语库 + 母语终审**

当前 OpenAI 旗舰系列支持多语言与长上下文，适合一次读取角色设定、世界观、历史台词和 UI 约束后再翻译，而不是逐句孤立处理。

- **GPT-5.6 Sol**：优先用于叙事密集、双关、角色语气和高价值文本的翻译与审校。
- **GPT-5.6 Terra**：质量、速度和成本更平衡，适合大批量初译、术语一致性检查和 LQA 报告。
- **DeepL API**：保留为稳定批处理引擎和交叉校验方案；Glossary 与 `context` 参数仍适合固定术语和短 UI 文本。

[OpenAI 当前模型目录](https://developers.openai.com/api/docs/models) · [DeepL API 文档](https://developers.deepl.com/docs)

不论使用哪个模型，都应锁定 `{player_name}`、富文本标签和格式说明符，提供文本用途与长度限制，并在引擎中检查截断、换行、字体缺字和语音同步。

## 运行时 AI

### GPT-Realtime-2.1

**推荐等级：动态语音 NPC 与实时交互首选候选**

GPT-Realtime-2.1 面向低延迟音频交互并支持推理与工具调用，适合受控的动态 NPC、语音指令、游戏内助手和共创玩法。游戏逻辑应只暴露白名单工具，奖励、付费、任务状态和安全判断仍由确定性代码执行。

### GPT-Realtime-Translate

适合跨语言语音交互、多人协作翻译和实时字幕。它解决的是实时语音链路，不替代离线文本本地化与人工 LQA。

### GPT-Realtime-Whisper

适合流式语音转写、语音指令前处理、字幕和无障碍输入。需要针对玩家麦克风、噪声、口音和专有名词建立真实测试集。

- [OpenAI Realtime 指南](https://developers.openai.com/api/docs/guides/realtime)
- [OpenAI 模型目录](https://developers.openai.com/api/docs/models)

::: warning 运行时接入门槛
联网延迟、持续成本、内容安全、剧情一致性、儿童保护、隐私、存档复现和服务终止都需要专门设计。始终准备超时、拒答、断网与服务下线时的非 AI 回退。
:::
