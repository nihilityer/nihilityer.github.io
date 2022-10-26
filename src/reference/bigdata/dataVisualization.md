---
title: 数据可视化基础知识整理
icon: float
category: 
  - 参考文档
tag:
  - bigdata
---
## 可视化工具
R语言、Tableau、ECharts、D3.js、PolyMaps、Excel、PyCharts、FineBI商业智能BI软件、FineReport报表软件
## R语言的特点
R语言是一种开发良好，简单有效的编程语言，包括条件，循环，用户定义的递归函数以及输入和输出设施。

R语言属于 GNU 开源软件，兼容性好、使用免费。

R语言环境软件，语法十分有利于复杂的数学运算。

R语言提供了一套用于数组，列表，向量和矩阵计算的运算符。数据类型丰富。

代码风格好，可读性强。

**R是一种解释型语言，在R运行的时候，所有变量、数据、函数及结果都以对象(objects)的形式存在计算机的活动内存中**
### R包的下载
使用函数`install.packages(“包名”)`
### R包的加载
例如加载ggplot2包，则运行library(ggplot2)即可。

R自带了一系列默认包(包括base、datasets、utils、grDevices、graphics、stats以及methods),它们提供了种类繁多的默认函数和数据集。
### 工作空间
使用函数getwd( )来查看当前的工作目录。

使用函数setwd(路径)设定当前的工作目录。
### 变量的命名规则
- 有效的变量名称由字母，数字和点或下划线字符组成。 
- 变量名以字母或点字母开头。
- 不能以数字开头。
- 不能以点数字开头。
- 不能以下划线开头。
### 变量的赋值
->、<-、=
### 变量的查找与删除
列举隐藏的以点开头的变量`ls(all.name= TRUE)`

删除变量`rm()`，如`rm(var1)、rm(list=ls())`

### 向量
- 创建多元素向量
rep( )是重复函数，它可以将某一向量重复若干次。

使用格式： rep(x, times = 1, length.out = NA, each = 1)
- 访问向量元素
访问向量元素可以使用中括号 []，索引值从 1 开始
```r
# 使用索引访问向量元素
t <- c("Sun","Mon","Tue","Wed","Thurs","Fri","Sat")
u <- t[c(2,3,6)]
# 使用逻辑索引，TRUE 表示读取，FALSE 为不读取
v <- t[c(TRUE,FALSE,FALSE,FALSE,FALSE,TRUE,FALSE)]
# 第二个和第五个会被删除
x <- t[c(-2,-5)]
```
- 向量元素的运算
```r
# 创建两个向量
v1 <- c(3,1,4,5,0,12)
v2 <- c(5,11,9,8,1,22)
# 相加（重点记！）
add.result <- v1+v2
# 相减
sub.result <- v1-v2
# 相乘
multi.result <- v1*v2
# 相除
divi.result <- v1/v2
```
- 向量排序
使用 sort() 函数对向量进行排序，语法格式：sort(x, decreasing = FALSE, na.last = NA, ...)
decreasing为TRUE时降序排序，na.last为TRUE时将缺失值（NA）放于末尾
### 其他操作
- 列表
R语言创建列表使用 list() 函数。
- 数组

R语言数组创建使用 array() 函数，该函数使用向量作为输入参数，可以使用 dim 设置数组维度。

`array(data = NA, dim = length(data), dimnames = NULL)`
- 数据框

R语言数据框使用data.frame() 函数来创建

`data.frame(…, row.names = NULL, check.rows = FALSE, check.names = TRUE, fix.empty.names = TRUE, stringsAsFactors = default.stringsAsFactors()) `
- 读取excel数据文件
```r
install.packages("xlsx")
library(xlsx)
data2 <- read.xlsx(“F:\\RDATA\\busData.xlsx”,sheetName = “bus”,encoding = “UTF-8”)
```
## R绘图
### 条形图
- 参数
**Height：高度**，通过这个参数可以指定要画多少个柱子以及每个柱子的高度，其值有两种格式。
  - 第一种 ：**向量 vector**， 此时会根据向量的长度确定图中有多少个柱子，向量中的每个值就是柱子的高度。
  - 第二种：**矩阵 matrix**, 此时用于画堆积柱状图。
  
horiz : 逻辑值，默认FALSE , 当值为TRUE 时，将x轴和y轴转置

clockwise: 是一个逻辑值,用来指示饼图各个切片是否按顺时针做出分割
### 饼图
绘制3D饼图，需要下载安装加载R包plotrix 。
### 散点图
`plot(pressure$temperature,pressure$pressure, xlab="温度",ylab="压力", main="温度与压力的关系",type='l')`
- p点图 
- l线图   
- b点图与虚线图  
- c虚线图   
- o点图与实线图   
- h直线条形图   
- s阶梯图
### 条形图与直方图的联系和区别
一． 频数分布直方图条与条之间无间隔，而条形图有间隔。

二． 条形图统计图中，横轴上的数据是孤立的，是一个具体的数据。而直方图中，数轴上的数据是连续的，是一个区间范围。

三． 条形图是用条形的高度表示频率的大小。而直方图是用长方形的面积表示频数，长方形的面积越大，就表示这组数据的频数越大。条形图的y轴表示频数frequency，而直方图的y轴表示频数密度frequency density。

四． 条形统计图中，各个数据是相对独立的，各个条形之间是有空隙的。而在直方图里，长方形对应的是一个范围，由于每两个相邻的范围之间不重叠，不遗漏，因此在直方图中，长方形之间没有空隙。

五． 条形统计图是用一个单位长度表示一定的数量，根据数量的多少可以画成长短不同的直条，然后把这些直条按一定的顺序排列起来。从条形统计图中，很容易看出各种数量多少。直方图又叫质量分布图，是一个几何形图表，它是根据从生产过程中收集来的质量数据分布情况，画成以组距为底边，以频数为高度的一系列连接起来的直方型矩形图。
## ECharts
### ECharts特性
- 丰富的可视化类型
- 多种数据格式无需转换直接使用
- 千万数据的前端展示
- 移动端优化
- 多渲染方案，跨平台使用
- 深度的交互式数据探索
- 多维数据的支持以及丰富的视觉编码手段
### 使用ECharts
- 引入ECharts.js类库文件
- 准备一个放图表的容器
- 实例化ECharts 对象
```JavaScript
var dom = document.getElementById('main');
var myChart = echarts.init(dom);
```
- 指定图表的配置项和数据
```JavaScript
var option = { 
    title: { text: 'ECharts 入门示例' },
    tooltip: {},
    legend: { data:['销量'] }, //图例（重点！！！）
    xAxis: { data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"] }, 
    yAxis: {}, 
    series: [{ name: '销量', type: 'bar', data: [5, 20, 36, 10, 10, 20] }] 
};
```
- 使用刚刚的配置项和数据显示图标

`myChart.setOption(option)`
### ECharts配置项
- 标题组件，包含主标题和副标题

title.text （String：主标题文本）
- 提示框组件

tooltip
- 样式设置

内置了两套主题，分别为'light'，'dark'，`var chart = echarts.init(dom, 'light'|'dark');`
- 饼状图扩展

roseType: 'radius', // 南丁格尔图 饼图的每一个区域的半径是不同的
- 简单的散点图

type: 'effectScatter', // 指明图表为带涟漪动画的散点图

### ECharts绘图实例
```javascript
var option = {
  title: {
    text: '各个年度国外与国内商品销量统计',
    textStyle: {
      color: 'black'
    },
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    left: 'center',
    top: 25
  },
  xAxis: {
    name: '年度',
    type: 'category',
    data: xDataArr,
    scale: true,
    boundaryGap: false
  },
  yAxis: {
    name: '销量',
    type: 'value',
    scale: true,
    max: 8000
  },
    series: [
      {
          name: '国外',
          type: 'line',
          data: yDataArr,
          stack: 'all', // 堆叠图的设置
          smooth: true, // 是否为平滑线
          lineStyle: { // 线的样式设置
            color: 'white',
            type: 'dotted' // dashed dotted solid
          },
          areaStyle: { // 线和x轴形成的区域设置
            color: 'blue'
          },
          markPoint: { // 标记点
            data: [
              {
                type: 'max', name: '最大值'
              },
              {
                type: 'min', name: '最小值'
              }
            ]
          }
        },
      {
        name: '国内',
        type: 'line',
        data: yDataArr2,
        stack: 'all', // 堆叠图的设置
        smooth: true, // 是否为平滑线
        lineStyle: { // 线的样式设置
        color: 'green',
          type: 'solid' // dashed dotted solid
        },
        areaStyle: { // 线和x轴形成的区域设置
          color: 'green'
        },
        markPoint: { // 标记点
          data: [
            {
              type: 'max', name: '最大值'
            },
            {
              type: 'min', name: '最小值'
            }
          ]
        },
      }
    ],
    toolbox: {
      feature: {
        saveAsImage: {}, // 导出图片
        dataView: {}, // 数据视图
        restore: {}, // 重置
        dataZoom: {}, // 区域缩放
        magicType: {
          type: ['bar', 'line']
        } // 动态图表类型的切换
      }
    },
    legend: { // 图例, 图例中的data数据来源于series中每个对象的name, 图例可以帮助我们对图表进行筛选
      data: ['国外', '国内']
    }
}
```

