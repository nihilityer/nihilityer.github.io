---
title: OpenAI AI使用参考
icon: circle-info
---

## GPT-4o批量创作像素角色的提示词

来自群主的分享

::: tip
由于展示元素过多，太过杂乱，稳定性下降很多，如果需要加强控制，可能要把提示词堆到每一个位置的呈现描述，而且未必会得到完全遵循
:::

```
[CHARACTER=Tifa (Final Fantasy)][STYLE=pixel-art][2DTO3D=no]

Produce THREE cohesive sprite sheets with precise control over pixels and colors:

—ROW 1 - 8-View Base Model—
- T-pose in 8 rotations (front, 45°, side, 135°, back, 225°, other side, 315°).
- Choose pixel size: [SIZE=8x8] for ultra-low resolution or [SIZE=32x32] for finer details.
- Limit colors: [COLORS=16] or [COLORS=24], adjusted for retro or semi-modern look.
- Consistent lighting from top-left to ensure shadows and highlights align with all angles.

—ROW 2 - Adaptive Equipment Grid—
- Auto-create **8–12 equipment items** (headgear, armor, accessories, etc.).
- Ensure items have the same pixel size ([SIZE=8x8] or [SIZE=32x32]).
- Ensure no clipping of items when worn in the 8-view poses.

—Global Constraints—
- Maintain visual and stylistic consistency (line thickness, color contrast, shadow details).
- Canvas size: 2048x2048 px maximum with padding for sprite sheet packing.
- Only output the final sprite sheets, no additional notes.
```

## 固定4o生成风格的prompt模板

```json
{
"art_style_profile": {
"style_name": "Minimalist 3D Illustration",
"visual_elements": {
"shape_language": "Rounded edges, smooth and soft forms with simplified geometry",
"colors": {
"primary_palette": ["Soft beige, light gray, warm orange"],
"accent_colors": ["Warm orange for focal elements"],
"shading": "Soft gradients with smooth transitions, avoiding harsh shadows or highlights"
},
"lighting": {
"type": "Soft, diffused lighting",
"source_direction": "Above and slightly to the right",
"shadow_style": "Subtle and diffused, no sharp or high-contrast shadows"
},
"materials": {
"surface_texture": "Matte, smooth surfaces with subtle shading",
"reflectivity": "Low to none, avoiding glossiness"
},
"composition": {
"object_presentation": "Single, central object displayed in isolation with ample negative space",
"perspective": "Slightly angled, giving a three-dimensional feel without extreme depth",
"background": "Solid, muted color that complements the object without distraction"
},
"typography": {
"font_style": "Minimalistic, sans-serif",
"text_placement": "Bottom-left corner with small, subtle text",
"color": "Gray, low-contrast against the background"
},
"rendering_style": {
"technique": "3D render with simplified, low-poly aesthetics",
"detail_level": "Medium detail, focusing on form and color over texture or intricacy"
}
},
"purpose": "To create clean, aesthetically pleasing visuals that emphasize simplicity, approachability, and modernity."
}
}
```
