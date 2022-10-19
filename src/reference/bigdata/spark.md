---
title: Spark基础知识整理
icon: float
category: 
  - 参考文档
tag:
  - bigdata
---
# Scala部分
## 1.Scala是一门多范式的编程语言（即可以进行面向对象编程，又可以进行函数式编程）,必须依赖java环境才能运行
## 2.相对于java，scala的面向对象要更加纯种一些，
scala虽然也有基本数据类型的变量，但都是类的实例

scala中，+、-、*、/....都是通过调用方法来实现的

且如“+”、“*”等运算符都进行了方法重载
## 3.scala中函数与变量都是第一等的
scala中，函数与变量的地位是一样的，函数可以作为参数传递给另个函数；函数可以赋值给变量，函数中可以定义函数，就像在函数中定义一个普通变量一样；
## 4.静态类型
scala中数据类型是静态的，而不是动态的，尽管很多时候定义scala变量时可以不指定类型。
## 5.scala运行模式：1）交互模式 2）脚本模式
## 6.变量
两种定义方式
### 1) 使用val定义：此种方式定义的变量不能再被赋值，类似java的final，
这种方式是scala建议的方式
### 2) 使用var定义：类似java的普通变量，可以再被赋值
## 7.集合类
### 1)Array 长度固定，元素可变
添加元素使用“:+”,表示在数组尾部添加元素
### 2)List 长度固定，元素值不可变
添加元素使用“:+”,表示在数组尾部添加元素，但这种方式不建议

建议的方式是使用“：：”,表示在List头部添加元素

常见用法：

1：：2：：3：：4：：Nil

“：：：”三冒号用于连接两个列表（List的集合）
### 3） 掌握元组的访问方式
## 8.scala常用高阶函数
掌握课堂上讲的高阶函数用法
能够按要求编写简单的scala程序，例如：创建集合对象，使用常用的高阶函数等。
## 9.伴生类和伴生对象概念理解
# spark部分
## 1.spark可以代替mapreduce，但无法代替hadoop
## 2.spark的组成（spark stack）
![spark组成](/image/spark%E7%BB%84%E6%88%90.png)
## 3.spark支持的语言：scala、java、python和R语言
## 4.spark的四种搭建模式：单机模式，standalone模式，yarn模式，mesos模式
注意：yarn可以实现两种应用提交模式，yarn-client和yarn-cluster
自己查找相关资料，理解yarn-client和yarn-cluster的区别
## 5.master和worker
广义上，master是指spark集群的主节点

狭义上，master和worker是standalone模式的两个核心进程，可以理解为类似yarn的resourcemanager和nodemanager，其主要作用就是分配资源的！
## 6.driver和executer
driver是spark应用程序的调度者，executor是应用程序的执行者
## 7.YARN的两种模型——YARN-CLIENT和YARN-CLUSTER
standalone和yarn-client这两种模式都是在spark-submit命令执行的节点上启动driver的，yarn-cluster:是resourcemanager在集群中随机找到一个空闲的节点，来启动appmaster（driver）

spark的交互模式只支持yarn-client模式
## 8.一个job的提交过程（理解并背过）
### 1） spark-submit执行时，提交的配置中可以设置申请的资源情况，如果没有配置则将采用默认配置。
### 2） driver启动时，要创建SparkContext，，只有sparkcontext正确初始化完成，才能向spark集群提交任务。SparkContext对象可以由SparkConf对象初始化，可以通过SparkConf对象对整个spark应用配置相关参数。
### 3） SparkContext会向master注册当前的application。注册后，master会根据提交application时设置的executor相关配置参数或默认配置参数与worker节点通信，由worker进程分配资源启动executor；
### 4） executor是一个进程，其内部会创建并启动用于执行task的线程池，然后注册给driver；
### 5） 程序中的action(动作)代码会触发一个job，job中有一系列的rdd，从后向前回溯，根据是否是宽依赖，来划分出1到多个stage；
### 6） stage划分完成后，交给底层taskscheduler，taskscheduler根据数据本地性将任务集合（TaskSet）发给对应的executor去执行；
### 7） executor执行完毕或出现问题后，都会向驱动器汇报
## 9.理解RDD（弹性分布式数据集）以下内容做到理解和掌握
### a) 懒加载
### b) 转换（transformation）和动作（action）
转换算子特点：懒加载、返回新rdd

动作算子特点：提交job，不返回rdd
### c）窄依赖和宽依赖
窄依赖：map,flatmap,filter等

宽依赖：groupbykey，reducebykey等
### d) rdd的依赖（血缘）可靠性处理
### e）job的分割依据是动作（action）
stage(阶段)的分割依据是宽依赖

task的分割依据是分区（partition）
## 10.一些常见的转换和动作算子，建议掌握并会用
![spark算子](/image/spark%E7%AE%97%E5%AD%90.png)
## 11.spark的两种共享变量
自己查一下两种共享变量都是什么
## 12.数据分类
结构化数据——数据库数据

半结构化数据——xml或json

非结构化数据——音频视频等
## 13.能够编写spark程序，至少能够写出wordcount程序