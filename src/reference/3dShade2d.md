---
title: 三渲二像素化
icon: circle-info
---

## 游戏引擎中可以将摄像机纹理加上着色器

godot着色器参考：

```gdshader
shader_type canvas_item;

uniform vec2 scale = vec2(4);
uniform vec2 viewport_size = vec2(512);

uniform float outline_width = 1.0;
uniform vec4 outline_color: source_color = vec4(0, 0, 0, 1);

void fragment() {
	vec2 uv = UV;
	
	uv *= viewport_size / scale;
	uv = floor(uv);
	uv /= viewport_size / scale;

	vec2 uv_up = uv + vec2(0, TEXTURE_PIXEL_SIZE.y) * outline_width * scale;
	vec2 uv_down = uv + vec2(0, -TEXTURE_PIXEL_SIZE.y) * outline_width * scale;
	vec2 uv_left = uv + vec2(TEXTURE_PIXEL_SIZE.x, 0) * outline_width * scale;
	vec2 uv_right = uv + vec2(-TEXTURE_PIXEL_SIZE.x, 0) * outline_width * scale;
	
	vec4 color_up = texture(TEXTURE, uv_up);
	vec4 color_down = texture(TEXTURE, uv_down);
	vec4 color_left = texture(TEXTURE, uv_left);
	vec4 color_right = texture(TEXTURE, uv_right);
	vec4 outline = color_up + color_down + color_left + color_right;
	outline.rgb = outline_color.rgb;

	vec4 orignal_color = texture(TEXTURE, uv);

	COLOR = mix(outline, orignal_color, orignal_color.a);
}
```

![效果展示](image%2Fa5a2a51d2adec3beadc0ec7d27557335.jpg)

## blender

[实现参考](https://astropulse.gumroad.com/l/BlenderToPixels) （可能需要魔法来访问）

![效果展示](image%2Fa14f392be5c7cddb6f21c87e64d95054.png)