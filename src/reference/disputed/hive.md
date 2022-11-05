---
title: Hive基础知识整理
icon: float
category: 
  - 参考文档
tag:
  - bigdata
---
## Hive简介
**Hive是将数据映射成数据库和一张张的表，库和表的元数据信息一般存在关系型数据库上（比如MySQL）。**
### Hive组成与结构
1.用户接口主要有三个：CLI（命令行接口）、Client（JDBC/ODBC接口，对外提供服务） 和 WUI（提供界面）。

2.中间件：包括Thrift Server接口和JDBC/ODBC的服务端，用于整合Hive和其它程序。

### Hive与传统数据库对比
由于 Hive 是针对数据仓库应用设计的，而数据仓库的内容是读多写少的。

**索引**：Hive在加载数据的过程中不会对数据进行任何处理，甚至不会对数据进行扫描，因此也没有对数据中的某些key建立索引。Hive要访问数据中满足条件的特定值时，**需要暴力的扫描整个数据，因此访问的延迟较高。**

### Hive特点
支持索引，加快数据查询。

不同的存储类型，例如，纯文本文件、HBase 中的文件。

将元数据保存在关系数据库中，减少了在查询中执行语义检查时间。

可以直接使用存储在Hadoop 文件系统中的数据。

内置大量用户函数UDF 来操作时间、字符串和其他的数据挖掘工具，支持用户扩展UDF 函数来完成内置函数无法实现的操作。

类SQL的查询方式，将SQL 查询转换为MapReduce 的job 在Hadoop集群上执行。

编码跟Hadoop同样使用UTF-8字符集。

## Hive安装与配置
### 安装
hive的安装一共有二种方式:**内嵌模式**、**独立模式**

**概念**

Metastore

Metastore是Hive元数据的集中存放地。Metastore默认使用内嵌的Derby数据库作为存储引擎。
Derby引擎的缺点：一次只能打开一个会话

- （1）内嵌模式安装

使用的是内嵌的Derby数据库来存储元数据，也不需要额外启动Metastore服务。数据库和Metastore服务都嵌入在主Hive Server进程中。**这样安装的元数据保存在内嵌的Derby数据库中，只能允许一个会话连接，只适用于简单的测试。**
- （2）独立模式安装

支持多用户会话，需要一个独立的元数据库，常用的是使用MySQL作为元数据库，适用于生产环境。
### HiveQL的数据类型
基本与MySQL一致，补充HiveQL独有的复杂类型：
- ARRAY：有序的同类型的集合，如`["beijing", "shanghai", "tianjing", "hangzhou"]`
- MAP: key-value, key必须为原始类型，value可以为任意类型，如`{"数学":"80","语文":"89","英语":"95"}`
- STRUCT：字段集合，类型可以不同，如`struct('1',1,1.0)`

### 基本概念
- 1、Hive上创建测试表test
```sql
create table test(
        name string,
        friends array<string>,
        children map<string,int>,
        address struct<street:string,city:string>
)
row format delimited 
fields terminated by ','
collection items terminated by '_'
map keys terminated by ':'
lines terminated by '\n'
```
- 2、修改数据库
`ALTER (DATABASE|SCHEMA) database_name SET DBPROPERTIES`
- 3、表的分类

hive表大致分为内部表、外部表、分区表三种。

**根据表数据是否存放在数据仓库目录以内，Hive数据表可以分为内部表、外部表。**

Hive 默认创建Managed Table(普通表、分区表)，由Hive来管理数据，意味着Hive会将数据移动到数据仓库目录。

另外一种选择是创建External Table(外部表)，这时Hive会到仓库目录以外的位置访问数据。
- 4、字段解释说明

TEMPORARY：临时表  `create temporary table xxxx`

EXTERNAL：外部表  `create external table xxxx`

ROW FORMAT row_format：指定行的分割符，文件在加载到表时，怎么分割定义：DELIMITED
  - [FIELDS TERMINATED BY char [ESCAPED BY char]]
  - [COLLECTION ITEMS TERMINATED BY char]
  - [MAP KEYS TERMINATED BY char]
  - [LINES TERMINATED BY char]
  - [NULL DEFINED AS char] 
- 5、复制表语句

`CREATE [TEMPORARY] [EXTERNAL] TABLE [IF NOT EXISTS] [db_name.]table_name LIKE existing_table_or_view_name [LOCATION hdfs_path];`

功能：复制，`create table xxx like xxx`,把like后面的表的结构复制给新创建的表
- 6、外部表

在创建表的时候可以指定external关键字创建外部表,外部表对应的文件存储在location指定的hdfs目录下,向该目录添加新文件的同时，该表也会读取到该文件(当然文件格式必须跟表定义的一致)。

外部表因为是指定其他的hdfs路径的数据加载到表当中来，所以hive表会认为自己不完全独占这份数据，所以删除hive外部表的时候，数据仍然存放在hdfs当中，不会删掉。
- 7、数据装载命令load

Load命令用于将外部数据加载到Hive表中

语法：`load data [local] inpath '/export/data/datas/student.txt' [overwrite] | into table student [partition (partcol1=val1,…)];`
- 8、分区表

**分区表中的Partition对应于表中的目录**

分区表的意义在于优化查询。查询时尽量利用分区字段。如果不使用分区字段，就会全部扫描。

在查询是通过where子句查询来指定所需的分区。

在hive中，分区就是分文件夹
- 9、分桶表

Buckets是将表的列通过Hash算法进一步分解成不同的文件存储。它对指定列计算hash，根据hash值切分数据，目的是为了并行，每一个Bucket对应一个文件。
- 10、清空表数据

`truncate table 表名`只会清空表中的数据，不会删除表，**只能清空管理表，也就是内部表**
- 11、使用动态分区

将设置改为`hive.exec.dynamic.partition.mode=nonstrict`


### 实际例子
- 1、创建表
```sql
create database myhive;

use myhive;

create table stu(id int,name string);
```
- 2、删除表

`drop table stu2;`
- 3、直接向分区表中插入数据

通过`insert into`方式插入数据
- 4、通过查询方式加载数据

`INSERT OVERWRITE TABLE tablename1 [PARTITION (partcol1=val1, partcol2=val2 ...) [IF NOT EXISTS]] select_statement1 FROM from_statement;`
- 5、从本地或者HDFS中通过load加载数据

`LOAD DATA [LOCAL] INPATH 'filepath' [OVERWRITE]| into table  tablename  [PARTITION (partcol1=val1, partcol2=val2 ...)]`
- 6、查询语句中创建表并加载数据（as select）

`create table score5 as select * from score;`
- 7、Import数据到指定的Hive表中

`import table tablename [partition(month='2019001')] from '/user/hive/warehouse/export/student'`
- 8、查询薪水大于1000的所有员工

`select * from emp where sal>1000;`
- 9、查找以8开头的所有成绩

`select * from score where s_score like '8%';`
- 10、分组（GROUP BY语句）

计算每个学生的平均分数

`select s_id ,avg(s_score) from score group by s_id;`
- 11、JOIN语句
  - （1）内连接（INNER JOIN）
  
  内连接：只有进行连接的两个表中都存在与连接条件相匹配的数据才会被保留下来。
    ```sql
    select * from teacher t, course c where t.t_id = c.t_id;
    select * from teacher t inner join course c on t.t_id = c.t_id;
    select * from teacher t join course c on t.t_id = c.t_id;
    ```
  - （2）左外连接（LEFT OUTER JOIN）
  
  左外连接：JOIN操作符左边表中符合WHERE子句的所有记录将会被返回。
  
  `select * from teacher t left join course c on t.t_id = c.t_id;`
  - （3）右外连接（RIGHT OUTER JOIN）
  
  右外连接：JOIN操作符右边表中符合WHERE子句的所有记录将会被返回。
  
  `select * from teacher t right join course c on t.t_id = c.t_id;`
  - （4）满外连接（FULL OUTER JOIN）
  
  满外连接：将会返回所有表中符合WHERE语句条件的所有记录。如果任一表的指定字段没有符合条件的值的话，那么就使用NULL值替代。
  
  `select * from teacher t full join course c on t.t_id = c.t_id ;`
