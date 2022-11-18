---
title: spark中实现ALS算法
icon: condition
category:
  - 总结
tag:
  - RecommendationSystem
---

## 内置实现
spark.ml包提供了ALS算法实现。
在推荐系统中，用户和物品的交互数据分为显式反馈数据和隐式反馈数据，
在ALS中这两种情况也被考虑了进来，分别可以训练如下两种模型。
```scala
//显式反馈模型
val model1 = ALS.train(ratings, rank, numIterations, lambda)
//隐式反馈模型
val model2 = ALS.tranImplicit(ratings, rank, numIterations, lambda, alpha)
```
其中，各个参数的含义如下：
- ratings：由“用户-物品”矩阵构成的训练集。
- rank：隐含因子的个数
- numIterations：迭代次数。
- lambda：正则项的惩罚系数。
- alpha：置信参数。

可以看出，隐式反馈模型多了一个置信参数，它与ALS算法中对于隐式反馈模型的处理方式有关。
对于隐式反馈模型而言，ALS算法采用的损失函数如下：
$$
L_{WRMF}=\sum_{u,i}c_{ui}(p_{ui}-x_{u}^{T}\cdot y_{i})^{2}+\lambda_{x}\sum_{u}\lvert\rvert x_{u}\lvert\rvert^{2}+\lambda_{y}\sum_{u}\lvert\rvert y_{i}\lvert\rvert^{2}
$$
在隐式反馈模型中是没有评分的，所以在式子中$r_{ui}$被$p_{ui}$所取代，$p_{ui}$表示偏好，仅仅表示用户和物品之间是否存在交互，而不表示评分高低或者喜好程度。
比如，如果用户和物品之间有交互，则$p_{ui}$等于1，没有交互则等于0。
函数中还有一个项$c_{ui}$，它用来表示用户偏爱某个商品的置信程度，比如，交互次数多的商品，权重就会增加。
如果用$d_{ui}$来表示交互次数的花，那么就可以把置信程度表示成如下公式。
$$
c_{ui}=1+\alpha d_{ui}
$$
上面公式中的$\alpha$（即alpha）就是上面提到的置信参数，也就是这个模型的参数之一，需要用交叉验证来得到。

## 实例演示
**来自Spark MLLib中的ALS算法**
采用Spark自带的MovieLens数据集，在Spark的安装目录下可以找到数据文件。

`~/spark/data/mllib/als/sample_movielens_ratings.txt`

**注意：使用时先将文件传到hdfs中，路径为`/data/sample/als/sample_movielens_ratings.txt`**

其中，每一行包含一个用户、电影、一个用户对该电影的评分以及时间戳。
这里使用默认的`ALS.train()`方法来构建模型，并进行模型评估。

具体步骤：（在spark-shell模式下）
- 引入需要的包
```scala
import org.apache.aprk.ml.evaluation.RegressionEvaluator
import org.apache.aprk.ml.recommendation.ALS
```
- 创建一个Rating类和parseRating函数。
parseRating读取MovieLens数据集中的每一行，并转化成Rating类的对象。
```scala
case class Rating(userId: Int, movieId: Int, rating: Float, timestamp: Long)
//definedclass Rating
def parseRating(str: String): Rating = {
    val fields = str.split("::")
    assert(fields.size == 4)
    Rating(fields(0).toInt, fields(1).toInt, fields(1).toFloat, fields(1).toLong)
}
//parseRating: (str: String)Rating
val ratings = spark.sparkContext.
    textFile("hdfs://nihilityer:9000/data/sample/als/sample_movielens_ratings.txt").
    map(parseRating).toDF()
//rating:org.apache.spark.sql.DataFrame = {userId: int, movieId:int...2 more fields}
ratings.show()
```
- 把movieLens数据集划分训练集和测试机，其中，训练集占80%，测试集占20%。
```scala
val Array(training, test) = ratings.randomSplit(Array(0.8, 0.2))
```
- 使用ALS来建立推荐模型。这里构建了两个模型，一个是显示反馈，另一个是隐式反馈。
```scala
val alsExplicit = new ALS().
    setMaxIter(5).setRegParam(0.01).
    setUserCol("userid").setItemCol("movieId").setRatingCol("rating")
val alsImplicit = new ALS().
    setMaxIter(5).setRegParam(0.01).
    setImplicitPrefs(true).
    setUserCol("userid").setItemCol("movieId").setRatingCol("rating")
```
|参数|含义|
|---|---|
|$\alpha$|是一个针对隐式反馈ALS版本的参数，这个参数决定了偏好行为强度的基准，默认为1.0|
|checkpointInterval|用来设置检查点的区间（$\geq 1$）或者是检查点不生效（-1）的参数，默认为10。比如说10就意味着缓存中每隔10次循环进行一次检查|
|implicitPrefs|决定了是用显示反馈ALS的版本还是用使用隐形反馈睡觉集的版本，默认是false，即显性反馈|
|itemCol|用来设置物品id列名的参数，id列一定要设置为Integer类型，其他数值类型也是支持的，但只要它们落在Integer域内，就会被强制转化为Integer，默认为“item”|
|maxIter|最大迭代次数，默认为10|
|nonnegative|决定是否对最小二乘法使用非负的限制，默认为false|
|numItemBlocks|物品的分块数，默认为10|
|numUserBlocks|用户的分块数，默认为10|
|predictionCol|用来设置预测列名的参数，默认为“prediction”|
|rank|矩阵分解的秩，即模型中隐语义因子的个数，默认为10|
|ratingCol|用来设置评分列名的参数，默认为“rating”|
|regParam|正则化参数（$\geq 0$），默认为0.1|
|seed|随机数种子，默认为1994790107|
|userCol|用来设置用户id列名的参数，（与itemCol基本一致）|
通过调整这些参数，不断优化结果，使均方差变小。如：maxIter越大，regParam越小，均方差会越小，推荐结果越优。
- 使用训练数据训练推荐模型
```scala
val modelExplicit = alsExplicit.fit(training)
val modelImplicit = alsImplicit.fit(training)
```
- 对测试集中的用户-电影进行预测，得到预测评分的数据集
```scala
val predictionsExplicit = modelExplicit.transform(test).na.drop()
val predictionsImplicit = modelImplicit.transform(test).na.drop()
```
测试集中如果出现训练集中没有出现的用户，则此次算法将无法进行推荐和评分预测。
因此`na.drop()`将删除`transform(test)`返回结果的DataFrame中任何出现空值或者NaN的行。
- 把结果输出，对比一下真实结果与预测结果。
```scala
predictionsExplicit.show()
predictionsImplicit.show()
```
- 通过计算模型的均方差误差（Root Mean Squared Error， RMSE）来对模型进行评估。
均方差误差越小，模型越准确。
```scala
val evaluator = new RegressionEvaluator().
    setMetricName("rmse").setLabelCol("rating").
    setPredictionCol("prediction")
val rmseExplicit = evaluator.evaluate(predictionsExplicit)
val rmseImplicit = evaluator.evaluate(predictionsImplicit)
//打印结果
println(s"Explicit:Root-mean-square error = $rmseExplicit")
println(s"Implicit:Root-mean-square error = $rmseImplicit")
```
