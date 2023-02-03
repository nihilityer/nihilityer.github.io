---
title: 自然语言处理学习
icon: result
category:
  - 随笔
tag:
  - diary
---

## 自然语言处理学习

### 专业名词

T5模型、BERT模型、迁移学习、T5模型、mT5模型、reformer模型、LSH Attention、可逆残差连接

### 插图

基于特征/微调的区别

![1675231568907](./assets/1675231568907.png)

模型发展史以及比较

![1675232509617](./assets/1675232509617.png)

### 迁移学习

迁移学习具有三个主要优点：

- 减少培训时间
- 改进预测
- 允许您使用较小的数据集

### BERT

BERT模型具有12层（12个transformer块）、12个注意力头、1.1亿个参数

### 微调BERT

#### 测试运行环境

使用文本分类任务作为测试

- git 克隆BERT代码
- 下载文本分类相关数据
- 安装tensorflow、CUDA Toolkit、cuDNN
- 运行训练任务

**windows下运行命令**

```
set BERT_BASE_DIR=../models/uncased_L-12_H-768_A-12
set GLUE_DIR=../data/MRPC
```

快速复制版本

```
python run_classifier.py --task_name=MRPC --do_train=true --do_eval=true --data_dir=%GLUE_DIR%/MRPC --vocab_file=%BERT_BASE_DIR%/vocab.txt --bert_config_file=%BERT_BASE_DIR%/bert_config.json --init_checkpoint=%BERT_BASE_DIR%/bert_model.ckpt --max_seq_length=128 --train_batch_size=32 --learning_rate=2e-5 --num_train_epochs=3.0 --output_dir=../output/mrpc/
```

条理清晰版本

```
python run_classifier.py ^
  --task_name=MRPC ^
  --do_train=true ^
  --do_eval=true ^
  --data_dir=%GLUE_DIR%/MRPC ^
  --vocab_file=$BERT_BASE_DIR/vocab.txt ^
  --bert_config_file=%BERT_BASE_DIR%/bert_config.json ^
  --init_checkpoint=%BERT_BASE_DIR%/bert_model.ckpt ^
  --max_seq_length=128 ^
  --train_batch_size=8 ^
  --learning_rate=2e-5 ^
  --num_train_epochs=3.0 ^
  --output_dir=../output/mrpc/
```

**备用环境变量配置**

```
CUDA_PATH_V11_1
C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.1
NVCUDASAMPLES11_1_ROOT
C:\ProgramData\NVIDIA Corporation\CUDA Samples\v11.1
C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.1\bin
C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.1\libnvvp
```

