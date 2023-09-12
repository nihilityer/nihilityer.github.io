---
title: 阅读代码笔记
order: 1
icon: result
category:
  - 随笔
tag:
  - diary
---

## 笔记

### 阅读代码笔记

#### MASR项目理解笔记

##### 1、训练

```python
from masr.trainer import MASRTrainer

trainer = MASRTrainer(configs=args.configs, use_gpu=args.use_gpu)
trainer.train(save_model_path=args.save_model_path,
              resume_model=args.resume_model,
              pretrained_model=args.pretrained_model,
              augment_conf_path=args.augment_conf_path)
```

初始化代码中核心代码：

```python
def __init__(self, configs):
        """ MASR集成工具类

        :param configs: 配置文件路径或者是yaml读取到的配置参数
        :param use_gpu: 是否使用GPU训练模型
        """
        # 读取配置文件
        if isinstance(configs, str):
            with open(configs, 'r', encoding='utf-8') as f:
                configs = yaml.load(f.read(), Loader=yaml.FullLoader)
            print_arguments(configs=configs)
        self.configs = dict_to_object(configs)
        self.local_rank = 0
        self.use_gpu = use_gpu
        assert self.configs.use_model in SUPPORT_MODEL, f'没有该模型：{self.configs.use_model}'
        self.model = None
        self.test_loader = None
        self.beam_search_decoder = None
        if platform.system().lower() == 'windows':
            self.configs.dataset_conf.num_workers = 0
            self.configs.dataset_conf.prefetch_factor = 2
            logger.warning('Windows系统不支持多线程读取数据，已自动关闭！')
```

训练方法：

```python
def train(self,
              save_model_path='models/',
              resume_model=None,
              pretrained_model=None,
              augment_conf_path='configs/augmentation.json'):
        """
        训练模型
        :param save_model_path: 模型保存的路径
        :param resume_model: 恢复训练，当为None则不使用预训练模型
        :param pretrained_model: 预训练模型的路径，当为None则不使用预训练模型
        :param augment_conf_path: 数据增强的配置文件，为json格式
        """
        # 训练只能用贪心解码，解码速度快
        self.configs.decoder = 'ctc_greedy'
        # 获取有多少张显卡训练(省略代码)

        # 获取数据
        self.__setup_dataloader(augment_conf_path=augment_conf_path, is_train=True)
        # 获取模型
        self.__setup_model(input_dim=self.test_dataset.feature_dim,
                           vocab_size=self.test_dataset.vocab_size,
                           is_train=True)

        # 支持多卡训练（省略代码）
        # 加载恢复模型
        last_epoch, best_error_rate = self.__load_checkpoint(save_model_path=save_model_path, resume_model=resume_model)

        test_step, self.train_step = 0, 0
        last_epoch += 1
        self.train_batch_sampler.epoch = last_epoch
        if self.local_rank == 0:
            writer.add_scalar('Train/lr', self.scheduler.get_last_lr()[0], last_epoch)
        # 开始训练
        for epoch_id in range(last_epoch, self.configs.train_conf.max_epoch):
            epoch_id += 1
            start_epoch = time.time()
            # 训练一个epoch
            self.__train_epoch(epoch_id=epoch_id, save_model_path=save_model_path, writer=writer)
            # 多卡训练只使用一个进程执行评估和保存模型
            if self.local_rank == 0:
                logger.info('=' * 70)
                loss, error_result = self.evaluate(resume_model=None)
                logger.info('Test epoch: {}, time/epoch: {}, loss: {:.5f}, {}: {:.5f}, best {}: {:.5f}'.format(
                    epoch_id, str(timedelta(seconds=(time.time() - start_epoch))), loss, self.configs.metrics_type,
                    error_result, self.configs.metrics_type, error_result if error_result <= best_error_rate else best_error_rate))
                logger.info('=' * 70)
                writer.add_scalar('Test/{}'.format(self.configs.metrics_type), error_result, test_step)
                writer.add_scalar('Test/Loss', loss, test_step)
                test_step += 1
                self.model.train()
                # 保存最优模型
                if error_result <= best_error_rate:
                    best_error_rate = error_result
                    self.__save_checkpoint(save_model_path=save_model_path, epoch_id=epoch_id, error_rate=error_result,
                                           test_loss=loss, best_model=True)
                # 保存模型
                self.__save_checkpoint(save_model_path=save_model_path, epoch_id=epoch_id, error_rate=error_result,
                                       test_loss=loss)
```



