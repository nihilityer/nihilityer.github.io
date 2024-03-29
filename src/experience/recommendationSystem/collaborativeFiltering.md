---
title: 协同过滤算法
icon: condition
category:
  - 总结
tag:
  - RecommendationSystem
---

## 基本分类
- 基于用户的协同过滤（UserCF）
- 基于物品的协同过滤（ItemCF）
- 基于模型的协同过滤（ModelCF）
## UserCF与ItemCF
### UserCF基本概念
UserCF是推荐系统中最古老的算法，可以说，UserCf算法的诞生就标志着推荐系统的诞生。
该算法在1992年被提出，至今仍然是推荐系统领域最著名的算法之一。
UserCf符合人们对于“趣味相投”的认知，即兴趣相似的用户往往有相同的物品喜好。

UserCF算法适合在新闻推荐、话题推荐等应用场景，其推荐结果在新颖度方面具有一定的优势。
但是，当用户基数过大时，计算用户相似度过于困难。
UserCF算法推荐结果相关性较弱，容易受大众影响而推荐热门物品，同时，UserCF算法也很难对推荐结果做出解释。
此外，新用户和低活跃度用户会遇到“冷启动”问题，即无法找到足够有效的相似用户来计算出合适的推荐结果

**实现步骤**
- 找到和目标用户兴趣相似的用户集合
- 找到该集合中的用户所喜欢的且目标用户没有接触过的物品推荐给目标用户
### ItemCF基本概念
ItemCf算法是业界应用最多的算法。
该算法通过给目标用户推荐那些和他们之前喜欢的物品相似的物品。

ItemCF算法在电子商务、电影、图书等应用场景中得到广泛使用，并且可以利用用户的历史行为给推荐结果做出解释，让用户更加信服推荐的结果。
但是，ItemCF算法倾向于推荐与用户已购买商品相似的商品，往往会出现新颖度较低的问题。

**实现步骤**
- 计算物品之间的相似度
- 根据物品的相似度和用户的历史行为，给用户生成推荐列表
### UserCF与ItemCF对比
最主要的区别在于，UserCF算法推荐的是那些和目标用户有相同兴趣爱好的其他用户所喜欢的物品，
ItemCF算法推荐的则是那些和目标用户之前喜欢的物品类似的其他物品。
因此，UserCF算法的推荐更偏向社会化，ItemCF算法更偏向与个性化。

在实际中，不存在任何一种推荐算法能够做到适用于所有应用场景。不同算法各有各的优势以及局限。
实际中常常将不同推荐算法进行融合。
## ModelCF
ModelCF算法通过已经观察到的所有用户给产品的打分来推断每个用户的喜欢并向用户推荐合适的产品。
该算法同时考虑了用户和物品两个方面，因此可以看作时UserCF算法与ItemCF算法的混合形式。
### 基于ALS矩阵分解的协同过滤算法
在实际应用中，用户和商品的关系可以抽象为一个三元组<User, Item, Rating>，
其中，User表示用户，Item表示物品，Rating表示用户对物品的评分，即用户对物品的喜好程度。
用户对物品的评分行为可以表示成一个评分矩阵$A$(m$\times$n),表示m个用户对n个物品的评分情况。

用户对物品的评分表：

| |v~1~|v~2~|v~3~|v~4~|v~5~|
|---|---|---|---|---|---|
|u~1~|3|5|4|?|1|
|u~2~|4|?|3|3|1|
|u~3~|3|4|5|3|2|
|u~4~|4|4|3|2|1|
|u~5~|2|4|?|1|2|
|u~6~|?|5|4|1|2|

其中，矩阵$A$的每个元素A~ij~，表示用户u~i~对物品v~j~的评分。
由于用户不会对所有物品都进行评分，因此，在矩阵$A$中会不可避免地存在缺失值，这意味着$A$是一个稀疏矩阵。
基于模型的协同过滤算法就是根据已经观察到的用户、物品信息来预测矩阵$A$中的缺失值。

”用户-物品“矩阵$A$中的元素A~ij~时用户给予物品的显示偏好反馈，比如：具体给出的评分。
然而，在实际中，常常只能收集到隐式反馈（比如浏览时间，点击数等）。
ALS-CF算法不直接对评分矩阵进行建模，而是根据隐式反馈信息来衡量用户喜好某个物品的置信水平，从而得到$A$中的缺失值。

**最小交替二乘法**（Alternating Least Squares, ALS）采用了”隐语义模型“（又称”潜在因素模型“），
试图通过数量相对小的、未被察觉到的底层原因来解释大量用户和产品直接可观察到的交互。
ALS通过降维的方法来补全”用户-物品“矩阵，并对矩阵中没有出现的值进行估计。

ALS算法的核心思想是，基于一个假设，即评分矩阵是近似低秩的。
一个m$\times$n的评分矩阵$A$，可以由分解得到的两个小矩阵$P$(m$\times$k)和$Q$(n$\times$k)的乘积来近似得到，即$A$=PQ^T^，其中，k<<m,n。
在这个矩阵分解的过程中，评分确实得到了填充，可以基于填充的评分来给用户推荐物品。

在实际，m和n的数值都很大，矩阵$A$的规模会很容易地突破1亿项，这时， 传统的矩阵分解方法（比如奇异值分解，SVD）将会无能为力。
此时，ALS算法将获得较好的分析效果。

举例：

将用户（User）对物品（Item）的评分矩阵分解为两个矩阵：一个是用户对物品隐含特征的偏好矩阵，另一个是物品所包含的隐含特征的矩阵。
具体而言，将用户-物品的评分矩阵$R$分解成两个隐含因子矩阵$P$和$Q$，从而将用户和物品都投影到一个隐含因子的空间中去。
即对于$R$(m$\times$n)的矩阵，ALS算法旨在找到两个低维矩阵$P$(m$\times$k)和矩阵$Q$(n$\times$k)，来近似逼近$R$(m$\times$n)：
$$
A_{m\times n}\simeq P_{m\times n}Q^{T}_{n\times k}
$$
其中，k<<min(m, n)。经过变换之后，矩阵$P$和矩阵$Q$就成为了低秩矩阵。
在这个变换中间，不需要显式地定义k这个关联维度，只需要假定它存在即可，
这里地关联维度又被称为“隐语义因子（Latent Factor）”，k的典型取值一般是20~200.
这种方法被称为“概率矩阵分解算法（Probabilistic Matrix Factorization， PMF）”。
ALS算法是PMF算法在数值计算方面的应用。

### 为什么使用ALS算法
描述一个人的喜好，通常可以在一个抽象的低维空间上进行，并不需要将其喜欢的事物一一列出。
可以将用户的喜好和商品特征都投到一个低维空间，比如：
把一个用户的喜好投影到一个低维向量$p$~i~，把一个商品的特征投影到一个低维向量$q$~j~，
那么这个用户和这个商品的相似度就可以表示成这两个向量之间的内积$p_{i}q_{j}^{T}$。
如果把评分理解成相似度，那么评分矩阵$A$就可以由用户喜好矩阵$P$和商品特征矩阵$Q$的乘积$PQ^T$来近似表示。

为了使低秩矩阵$P$和$Q$尽可能地逼近$R$，可以最小化下面地损失函数$L$来完成：
$$
L(P,Q)=\sum_{u,i}(r_{ui}-p_{u}q_{i}^{T})^{2}+\lambda(\lvert p_{u}\lvert^{2}+\lvert q_{i}\lvert^{2})
$$
其中，$P_{u}$表示用户$u$地偏好地隐含特征向量，
$q_{i}$表示物品$i$包含地隐含特征向量，
$r_{ui}$表示用户$u$对物品$i$地评分，
向量$p_{u}$和$q_{i}$地内积$p_{u}q_{i}^{T}$是用户$u$对物品$i$评分地近似。

最小化该损失函数使得两个隐因子矩阵地乘积尽可能逼近原始地评分。
同时，损失函数中增加了$L2$规范化项（Regularization Term），对较大的参数值进行惩罚，以减小过拟合造成地影响。

ALS算法是求解$L(P,Q)$地著名算法，其基本思路是：固定其中一类参数，使其变为单类变量优化问题。利用解析方法进行优化；
之后反过来，固定之前优化过的参数，再优化另一组参数；
此过程迭代进行，直到收敛。

ALS算法即“最小交替二乘法”算法中的“交替”，先随机生成$P_{0}$，
然后又固定$P_{0}$去求解$Q_{0}$，再固定$Q_{0}$求解$P_{1}$， 这样交替进行下去。

因此每步迭代都会降低重构误差，并且误差是有下界的，所以ALS算法一定会收敛。

具体求解过程如下：
- （1）固定$Q$。对$p_{u}$求偏导数$\frac {\partial L(P,Q)} {\partial p_{u}}=0$，得到求解$p_{u}$的公式。
$$
p_{u}=(Q^{T}Q+\lambda I)^{-1}Q^{T}r_{u}
$$
- （2）固定$P$，对$q_{i}$求偏导数$\frac {\partial L(P,Q)} {\partial q_{i}}=0$，得到求解$q_{i}$的公式。
$$
q_{i}=(P^{T}P+\lambda I)^{-1}P^{T}r_{i}
$$
实际运行时，程序会首先随机对$P/Q$进行初始化，随后根据以上过程，交替对$P/Q$进行优化直到收敛。
收敛的标准是其均方根误差（Root Mean Squared Error， RMSE）小于某一定义的阈值。
