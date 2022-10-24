---
title: Spark基础知识整理
icon: float
category: 
  - 参考文档
tag:
  - bigdata
---
# Scala部分
[Scala菜鸟教程](https://www.runoob.com/scala/scala-tutorial.html)
## 1.Scala是一门多范式的编程语言
（即可以进行面向对象编程，又可以进行函数式编程）,必须依赖java环境才能运行
## 2.相对于java，scala的面向对象要更加纯种一些，
scala虽然也有基本数据类型的变量，但都是类的实例

scala中，+、-、*、/....都是通过调用方法来实现的

且如“+”、“*”等运算符都进行了方法重载
## 3.scala中函数与变量都是第一等的
scala中，函数与变量的地位是一样的，函数可以作为参数传递给另个函数；函数可以赋值给变量，函数中可以定义函数，就像在函数中定义一个普通变量一样；
## 4.静态类型
scala中数据类型是静态的，而不是动态的，尽管很多时候定义scala变量时可以不指定类型。
## 5.scala运行模式：
1）交互模式 

2）脚本模式
## 6.变量
两种定义方式
- 1) 使用val定义：此种方式定义的变量不能再被赋值，类似java的final，
这种方式是scala建议的方式
- 2) 使用var定义：类似java的普通变量，可以再被赋值
## 7.集合类
- 1)Array 长度固定，元素可变
添加元素使用“:+”,表示在数组尾部添加元素
- 2)List 长度固定，元素值不可变
添加元素使用“:+”,表示在数组尾部添加元素，但这种方式不建议

建议的方式是使用“::”,表示在List头部添加元素

常见用法：

`1::2::3::4::Nil`

“:::”三冒号用于连接两个列表（List的集合）
### 3） 掌握元组的访问方式
## 8.scala常用高阶函数
掌握课堂上讲的高阶函数用法
能够按要求编写简单的scala程序，例如：创建集合对象，使用常用的高阶函数等。
## 9.伴生类和伴生对象概念理解
# spark部分
## 1.spark可以代替mapreduce，但无法代替hadoop
## 2.spark的组成（spark stack）
![spark组成](../image/spark%E7%BB%84%E6%88%90.png)
## 3.spark支持的语言
scala、java、python和R语言
## 4.spark的四种搭建模式：
单机模式，standalone模式，yarn模式，mesos模式

注意：yarn可以实现两种应用提交模式，yarn-client和yarn-cluster

**从广义上讲，yarn-cluster适用于生产环境；而yarn-client适用于交互和调试，也就是希望快速地看到application的输出。**

从深层次的含义讲，yarn-cluster和yarn-client模式的区别其实就是Application Master进程的区别，yarn-cluster模式下，driver运行在AM(Application Master)中，它负责向YARN申请资源，并监督作业的运行状况。当用户提交了作业之后，就可以关掉Client，作业会继续在YARN上运行。然而yarn-cluster模式不适合运行交互类型的作业。而yarn-client模式下，Application Master仅仅向YARN请求executor，client会和请求的container通信来调度他们工作，也就是说Client不能离开。
## 5.master和worker
广义上，master是指spark集群的主节点

狭义上，master和worker是standalone模式的两个核心进程，可以理解为类似yarn的resourcemanager和nodemanager，其主要作用就是分配资源的！
## 6.driver和executor
driver是spark应用程序的调度者，executor是应用程序的执行者
## 7.YARN的两种模型——YARN-CLIENT和YARN-CLUSTER
standalone和yarn-client这两种模式都是在spark-submit命令执行的节点上启动driver的，yarn-cluster:是resourcemanager在集群中随机找到一个空闲的节点，来启动appmaster（driver）

spark的交互模式只支持yarn-client模式
## 8.一个job的提交过程（理解并背过）
- 1） spark-submit执行时，提交的配置中可以设置申请的资源情况，如果没有配置则将采用默认配置。
- 2） driver启动时，要创建SparkContext，，只有sparkContext正确初始化完成，才能向spark集群提交任务。SparkContext对象可以由SparkConf对象初始化，可以通过SparkConf对象对整个spark应用配置相关参数。
- 3） SparkContext会向master注册当前的application。注册后，master会根据提交application时设置的executor相关配置参数或默认配置参数与worker节点通信，由worker进程分配资源启动executor；
- 4） executor是一个进程，其内部会创建并启动用于执行task的线程池，然后注册给driver；
- 5） 程序中的action(动作)代码会触发一个job，job中有一系列的rdd，从后向前回溯，根据是否是宽依赖，来划分出1到多个stage；
- 6） stage划分完成后，交给底层taskScheduler，taskScheduler根据数据本地性将任务集合（TaskSet）发给对应的executor去执行；
- 7） executor执行完毕或出现问题后，都会向驱动器汇报
## 9.理解RDD（弹性分布式数据集）以下内容做到理解和掌握
- a) 懒加载
- b) 转换（transformation）和动作（action）
转换算子特点：懒加载、返回新rdd

动作算子特点：提交job，不返回rdd
- c）窄依赖和宽依赖
窄依赖：map,flatmap,filter等

宽依赖：groupByKey，reduceByKey等
- d) rdd的依赖（血缘）可靠性处理
- e）job的分割依据是动作（action）
stage(阶段)的分割依据是宽依赖

task的分割依据是分区（partition）
## 10.一些常见的转换和动作算子，建议掌握并会用
### 转换算子
- （1）`map(func)`
  
  参数是函数，通过函数func对每个元素进行运算并返回一个新的rdd
  
  `val rdd2 = rdd1.map(x => x*2)`
  
  `List(1, 2, 3, 4) => List(2, 4, 6, 8)`
- （2）`flatMap(func)`

  参数是函数，将函数应用于rdd的每一个元素，将元素数据进行拆分，变成迭代器，返回新的rdd

  `val rdd2 = rdd1.flatMap(line => line.split(" ")`

  `List("Hadoop Spark HBase", "Hive Flink") => List("Hadoop", "Spark","HBase", "Hive", "Flink")`
- （3）`filter(func)`
  
  参数是函数，通过函数过滤掉不符合条件的元素，返回新的rdd

- （4）`groupByKey()`
  
  将元素为（key, value）形式的rdd，将相同key的元素聚焦到一起，这些元素的合并生成一个新的元素，key不变，value合并到一个集合中

  `val rdd2 = rdd1.groupByKey()`
  
  `Array((zhangsan, 10), (lisi, 20), (zhangsan, 100), (lisi, 70), (jack, 50)) => Array((zhangsan, CompactBuffer(10,100)), (lisi, CompactBuffer(20, 70)), (jack, CompactBuffer(50)))`
- （5）`reduceByKey(func)`
  
  与groupByKey类似，不过value值为一个列表或通过传入函数进行求和等操作

  `val rdd2 = rdd1.reduceByKey((a, b) => a+b)`
  
  `Array((zhangsan, 10), (lisi, 20), (zhangsan, 100), (lisi, 70), (jack, 50)) => Array((zhangsan, 110), (lisi, 90), (jack, 50))`
- （6）`sortABy()`
  
  将rdd中的元素按照某个规则进行排序，算子有两个参数，第一个参数为排序函数，第二个为布尔值，默认为true（升序）
  
  `val rdd2 = rdd1.sortBy(_._2, false)`（通过rdd中每个元素的第二个值进行降序排序）
- （7）`sortByKey()`
  
  将（key, value）形式的rdd按照key进行排序，参数为布尔值，默认为true（升序）
  
  `val rdd2 = rdd1.sortByKey(false)`（通过key进行降序排序）
- （8）`distinct()`
  
  将rdd中元素进行去重操作
- （9）`union(rdd)`
  
  获取两个rdd的并集（无重复）
- （10）`intersection(rdd)`
  
  获取两个rdd的交集，并去除重复元素
- （11）`subtract(rdd)`
  
  将原rdd中和参数rdd中相同的元素去除
- （12）`cartesian(rdd)`
  
  求两个rdd的笛卡尔集
- （13）`join()`
  
  将两个（key, value）形式的rdd根据key进行连接操作，相当于数据库内的内连接操作，只返回两个rdd 都匹配的内容
  
  还有`leftOutJoin`、`rightOutJoin`、`fullOutJoin`三个外连接算子
- （14）`cogroup()`
  
  对两个（key, value）形式的rdd根据key镜像组合，根据key进行并集操作

### 行动算子
- （1）`reduce()`
  
  将rdd中的元素进行聚合计算
  
  `val rdd2 = rdd1.reduce(_+_)`（将rdd中所有元素相加）
- （2）`collect()`
  
  向Driver以数组形式返回数据集的所有元素
- （3）`count()`
  
  返回rdd中元素的数量
- （4）`first()`
  
  返回rdd中的第一个元素
- （5）`take(num)`
  
  返回rdd中前n个元素形成的数组
- （6）`saveAsTextFile()`
  
  将rdd持久化为一个或一组文本文件，存储到文件系统
- （7）`countByKey()`
  
  统计rdd中key相同的元素的数量，返回值为map（只有key和对用数量，没有value）
- （8）`foreach()`

  将rdd中的每个元素运行指定函数

  `rdd.foreach(println)`（将rdd中每个元素逐行打印）

## 11.spark的两种共享变量
Spark为此提供了两种共享变量，一种是Broadcast Variable（广播变量），另一种是Accumulator（累加变量）。
Broadcast Variable会将使用到的变量，仅仅为每个节点拷贝一份，更大的用处是优化性能，减少网络传输以及内存消耗。
Accumulator则可以让多个task共同操作一份变量，主要可以进行累加操作。

广播变量

广播变量允许我们将一个只读的变量缓存在每台机器上，而不用在任务之间传递变量。
广播变量可被用于有效地给每个节点一个大输入数据集的副本。 
广播的数据被集群不同节点共享，且默认存储在内存中，读取速度比较快。 
Spark还尝试使用高效地广播算法来分发变量，进而减少通信的开销。 
Spark的动作通过一系列的步骤执行，这些步骤由分布式的shuffle操作分开。
Spark自动地广播每个步骤每个任务需要的通用数据。
大数据培训这些广播数据被序列化地缓存，在运行任务之前被反序列化出来。
这意味着当我们需要在多个阶段的任务之间使用相同的数据，或者以反序列化形式缓存数据是十分重要的时候，显式地创建广播变量才有用。

累加器

累加器是仅仅被相关操作累加的变量，因此可以在并行中被有效地支持。
它可以被用来实现计数器和总和。Spark原生地只支持数字类型的累加器。
我们可以自己添加新类型。 提供了将工作节点中的值聚合到驱动器程序中的简单语法。
## 12.数据分类
结构化数据——数据库数据

半结构化数据——xml或json

非结构化数据——音频视频等
## 13.Scala程序，以wordcount为例
```scala
object WordCount {
  def main(args: Array[String]): Unit = {
    val hdfsUrl: String = "hdfs://192.168.44.100:9000"

    val filePath: String = "/word.txt"

    val conf: SparkConf = new SparkConf().setAppName("wordCount").setMaster("local[2]")
    val sc = new SparkContext(conf)

    val file: RDD[String] = sc.textFile(hdfsUrl+filePath)

    val wc: RDD[(String, Int)] = file.flatMap(_.split(" ")).map((_ , 1)).reduceByKey(_+_)
    wc.foreach(println)
    //参数可为指定目录
    wc.saveAsTextFile(OutUtil.getOutPath(hdfsUrl))
    sc.stop()
  }
}
```
