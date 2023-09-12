---
title: nihility助手制作笔记
order: 1
icon: result
category:
  - 随笔
tag:
  - diary
---

## nihility助手制作笔记

### MFCC特征提取

1. 首先将原始PCM音频数据流转换为帧格式（Frame），每一帧的大小一般为20~40毫秒。

2. 对于每一帧，进行预加重（Pre-emphasis），增强高频分量。常用的预加重滤波器系数为0.95。

3. 将每一帧进行分窗（Window），常用的窗函数有汉明窗（Hamming Window）、汉宁窗（Hanning Window）等，一般窗函数长度为帧大小。

4. 将窗函数作用于音频帧并将其通过快速傅里叶变换（FFT）转换到频域，得到功率谱密度（Power Spectral Density）。

5. 转换到梅尔频率刻度，例如将频率从线性刻度变换成梅尔刻度，一般会采用Mel Frequency Cepstral Coefficients (MFCCs)来表示。

6. 对梅尔频率刻度进行离散余弦变换（DCT），提取MFCC系数。

7. 可以进行加速处理，如：delta MFCC， delta-delta MFCC，让得到的系数更具有区分度。

8. 由于MFCC系数的值通常较大，为了降低其对分类结果的影响，需要对其进行归一化处理，如：Z-score标准化。


