---
title: GAMES101相关笔记
icon: condition
category:
  - 总结
tag:
  - computer-graphics
---

[课程主页](https://sites.cs.ucsb.edu/~lingqi/teaching/games101.html)

[B站视频地址](https://www.bilibili.com/video/BV1X7411F744)

## 第三课:变换

### 二维线性变换

$$
R_{\theta}=\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

$$
x^{'}=ax+by \\
y^{'}=cx+dy
$$

### 沿着原点逆时针旋转矩阵

$$
R_{\theta}=\begin{bmatrix}
cos\theta & -sin\theta \\
sin\theta & cos\theta
\end{bmatrix}
$$

### 齐次坐标

$$
\begin{pmatrix}
x^{'} \\
y^{'} \\
1
\end{pmatrix} = 
\begin{pmatrix}
a & b & t_{x} \\
c & d & t_{y} \\
0 & 0 & 1
\end{pmatrix} \cdot \begin{pmatrix}
x \\
y \\
1
\end{pmatrix}
$$

此方式的意义在于使得所有二维变换都可以使用矩阵点乘坐标点的方式进行计算.点为xy1,向量为xy0