---
title: Hadoop安装和使用参考
icon: linux
category:
  - 参考文档
tag:
  - bigdata
---
## 官网：http://hadoop.apache.org

## 常用端口：

### WebUI

用于http访问与监控

| 所属                   | 端口号 |
| ---------------------- | ------ |
| hdfs/namenode(2.x)     | 50070  |
| hdfs/datanode(2.x)     | 50075  |
| hdfs/secondarynamenode | 50090  |
| yarn                   | 8088   |
| hdfs/namenode(3.x)     | 9870   |
| hdfs/datanode(3.x)     | 9864   |
| spark(3.2.1)           | 8080   |

内部端口

| 所属                 | 端口号 | 作用 |
| -------------------- | ------ | ---- |
| namenode             | 9000   |      |
| datanode             | 50010  |      |
| datanode             | 50020  |      |
| yarn/resourcemanager | 8032   |      |
| yarn/resourcemanager | 8030   |      |
| yarn/resourcemanager | 8031   |      |
| yarn/resourcemanager | 8033   |      |
| yarn/nodemanager     | 8040   |      |
| yarn/nodemanager     | 8042   |      |
| yarn/nodemanager     | 8041   |      |

# 技术体系

**存储体系**：Hadoop-HDFS、HBase、MongoDB、Cassandra

**计算体系**：Hadoop-MapReduce、Spark、Storm、Flink

**数据同步**：Sqoop、DataX

**资源调度**：YARN、Oozie、Zookeeper

**日志收集**：Flume、Logstash、Kibana

**分析引擎**：Hive、Impala、Presto、Phoenix、SparkSQL

**集群监控**：Ambari、Ganglia、Zabbix

![Hadoop生态](/image/Hadoop生态.jpg)

## 有关配置命令

将服务器对内网开放

```bash
firewall-cmd --permanent --add-rich-rule='rule family=ipv4 source address=192.168.1.0/24 accept'
```

## 第一章 初识（常用技术介绍）

**数据采集技术**：网络爬虫，日志读取flume logstash filebeat （sqoop）

**离线批处理：**（**数据存储**：HDFS、**数据预处理**：主要用Spark、 **数据入库**：HDFS， HBASE、**调度**：crontab， oozie、 **数据统计/分析**：Spark， Hive）

**实时流式处理：** 可以使用消息队列来减少存储和计算压力，通过stream来使用，流式处理程序：storm、Spark Streaming flink

**结果保存**：HBASE，MySQL， Redis

**数据可视化**：HUE， echart.js， kibina

##### 数据处理方式：离线批处理、实时流式处理

**YARN**：集群资源管理系统

![常用框架](/image/常用框架.png)

## 第二章 安装

### 版本：hadoop：2.7.6、Java：1.8

**hadoop安装方式**：独立安装（一般不用）、分布式安装

**分布式安装**：非高可靠集群（非HA） 、高可靠集群（HA）

**注意：**格式化只能有一次，多次会把hdfs弄坏，要多次格式化的话，需要把tmp路径清空

### **伪分布式安装步骤**：

​	改ip、改hostname、改ip映射、实现免密登录（生成密钥：ssh-keygen -t rsa、拷贝公钥到需要登录的系统：ssh-copy-id -i id_rsa.pub 系统名称）、

确认Java安装地址、配置环境变量（Java，hadoop、配置hadoop/etc/hadoop下的配置文件（hadoop-env.sh、core-site.xml、hdfs-site.xml）

配置模板：（原理：通过：将环境追加到系统环境里）

```sh
export $PATH:$JAVA_HOME/bin
```

**hadoop-env.sh**：配置Java路径

#### 配置hdfs：

**core-site.xml配置**：访问方式+临时文件存储目录

```xml
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>
    <property>
    	<name>hadoop.tmp.dir</name>
        <value>/home/tmp/hadoop</value>
    </property>
</configuration>
```

**hdfs-site.xml配置**：保存副本数量

```xml
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
</configuration>
```

格式化HDFS进行测试

```bash
hdsf namenode -format
```

启动hdfs :执行start-dfs.sh

通过jps查看进程是否存在

通过网站来确认是否成功：端口：50070

#### 配置yarn:

首先复制模板文件：cp mapred-site.xml.template marred-site.xml

marred-site.xml配置（配置mapreduce再yarn上）

```xml
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
</configuration>
```

yarn-site.xml配置

```xml
<configuration>
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
</configuration>
```

使用start-yarn.sh启动yarn

再使用jps查看是否启动

网络查看端口：8088

ps：单独启动hdfs和yarn，因为start-all脚本被弃用了

效果图

![运行输出](/image/运行输出.png)

![dfs网页查看状态](/image/dfs网页查看状态.png)

![yarn网页查看状态](/image/yarn网页查看状态.png)

### 完全分布式安装步骤：

​	步骤与伪分布式基本一致，不过要注意：

#### 1、公钥发放可以使用xshell的撰写网格发放给全部会话，快捷完成

#### 2、使用date命令来同步所有主机时间（如果时间一致，可以略过）：

​		使用`date`来查看本机时间

​		`date -s 时间`来设置时间（-s伪”set“设置）

​		可以联网使用ntpdate来同步`sudo ntpdate -u ntp1.aliyun.com`(**在阿里云的时间服务器上获取时间**)

#### 3、在一台主机上安装完jdk和hadoop，让后同步给其他主机

**配置core-site.xml**

```xml
<configuration>
    <!--此处与伪分布不同-->
    <property>
        <name>fs.default.name</name>
        <value>hdfs://nihilityers:9000</value>
    </property>
    <property>
    	<name>hadoop.tmp.dir</name>
        <value>/home/tmp/hadoop</value>
    </property>
</configuration>
```

**配置hdfs-site.xml**

```xml
<configuration>
    <!--副本个数，默认为3-->
    <property>
        <name>dfs.replication</name>
        <value>2</value>
    </property>
    <property>
        <name>dfs.namenode.name.dir</name>
        <value>/home/tmp/hadoop/dfs/name</value>
    </property>
    <property>
        <name>dfs.datanode.data.dir</name>
        <value>/home/tmp/hadoop/dfs/data</value>
    </property>
    <property>
        <name>dfs.namenode.secondary.http-address</name>
        <value>nihilityer:50090</value>
    </property>
</configuration>
```

**mapred-stie.xml与伪分布式一致**

```XML
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
</configuration>
```

**配置yarn-site.xml**

```xml
<configuration>
    <!--与伪分布式一致-->
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
    <property>
        <name>yarn.resourcemanager.hostname</name>
        <value>nihilityer</value>
    </property>
</configuration>
```

**使用scp命令来发送文件**(使用-r递归传送)

命令格式：`scp -r /home/user user@nihilityer:/home/user`

#### 4、设置从节点名称（更改slaves文件）

#### 5、启动yarn只能在resourcemanager上启动，hdfs可以在任意一台上启动

ps:文件分块存储。一块默认为128MB

## 第三章 高可用和联邦

### HDFS-HA（NN->NameNode、DN->DataNode）

完全分布式中，Nmaenode进程和ReourceManager进程只有一个，如果宕机了，会影响HDFS和yarn的使用，出现单点故障。

解决方法：在集群中添加一个NN和RM节点， 

在HA集群中，有多个DN，两个及以上NN，一个Active（向外提供读写服务）一个Standby（作为备用节点）；还会有奇数个JournalNode，用来共享NN的状态。 zookeeper是作为整个HA的协调工具。每个NN都会有一个ZKFC进程来监控。

![HA原理](/image/HA原理.png)

![HA原理-yarn](/image/HA原理-yarn.png)

### 搭建步骤

解压文件，配置环境。

#### 配置并运行zookeeper

修改zookeeper安装目录下的conf文件夹下的文件zoo.cfg（通过复制zoo_sample.cfg生成）

**更改部分：*

```bash
#保存目录
dayaDir=/home/hechuhuan/tmp/zookeeper
#客户端访问zookeeper服务的端口
clientPort=2181
#配置运行节点，2888为zookeeper节点相互通信端口，3888为选举leader的接口
server.1=nihilityer:2888:3888
server.2=nihilityers:2888:3888
server.3=nihilityerair:2888:3888
```

要在tmp/zookeeper目录下生成myid文件（通过mkdir -p来创建多级目录）：echo 1 > myid （数值对应节点的值）

命令：(要分别启动，可以一次发送多个会话来减少操作)

**启动：**zkServer.sh start

**查看状态：**zkServer.sh status

**关闭：**zkServer.sh stop

#### 配置hdfs

**hdfs-site.xml配置**

```xml
<!--
为此名称服务选择一个逻辑名称，例如“mycluster”，并将此逻辑名称用作此配置选项的值。您选择的名称是任意的。它将用于配置，并作为集群中绝对HDFS路径的授权组件。
-->
	<property>
      <name>dfs.nameservices</name>
      <value>mycluster</value>
    </property>
<!--
使用逗号分隔的NameNode ID列表进行配置。DataNodes将使用它来确定集群中的所有NameNodes。使用“mycluster”作为nameservice ID，并且希望使用“nn1”和“nn2”作为NameNodes的单独ID(目前，每个nameservice最多只能配置两个NameNode。)
-->
    <property>
      <name>dfs.ha.namenodes.mycluster</name>
      <value>nn1,nn2</value>
    </property>
<!--
对于之前配置的两个NameNode ID，设置NameNode进程的完整地址和IPC端口。请注意，这会导致两个单独的配置选项。
-->
    <property>
      <name>dfs.namenode.rpc-address.mycluster.nn1</name>
      <value>nihilityer:8020</value>
    </property>
    <property>
      <name>dfs.namenode.rpc-address.mycluster.nn2</name>
      <value>nihilityers:8020</value>
    </property>
<!--
与上面的rpc地址类似，设置两个NameNodes的HTTP服务器要监听的地址。(如果启用了Hadoop的安全功能，还应该为每个NameNode设置类似的https地址。)
-->
    <property>
      <name>dfs.namenode.http-address.mycluster.nn1</name>
      <value>nihilityer:50070</value>
    </property>
    <property>
      <name>dfs.namenode.http-address.mycluster.nn2</name>
      <value>nihilityers:50070</value>
    </property>
<!--
这是配置日志节点地址的地方，日志节点提供共享编辑存储，由活动的nameNode写入，由备用的nameNode读取，以与活动的nameNode所做的所有文件系统更改保持最新。尽管必须指定多个JournalNode地址，但只应配置其中一个URI。日志ID是此名称服务的唯一标识符，它允许一组日志节点为多个联合名称系统提供存储。虽然不是必需的，但将nameservice ID重新用于日志标识符是一个好主意。（JournalNode的默认端口为8485）
-->
    <property>
      <name>dfs.namenode.shared.edits.dir</name>
      <value>qjournal://nihilityer:8485;nihilityers:8485;nihilityerAir:8485/mycluster</value>
    </property>
<!--
配置DFS客户端将使用的Java类的名称，以确定哪个NameNode当前处于活动状态，从而确定哪个NameNode当前为客户端请求提供服务。目前Hadoop附带的唯一实现是ConfiguredFailoverProxyProvider，所以除非您使用的是定制的，否则请使用它。

===============================================================================================================================
为了保证系统的正确性，在任何给定的时间只有一个NameNode处于活动状态。重要的是，在使用Quorum日志管理器时，只允许一个NameNode向JournalNodes写入数据，因此不存在从裂脑场景中破坏文件系统元数据的可能性。但是，当发生故障转移时，前一个活动的NameNode仍有可能向客户端提供读取请求，在尝试写入JournalNodes时该NameNode关闭之前，这些请求可能已经过期。因此，即使在使用仲裁日志管理器时，仍然需要配置一些隔离方法。然而，为了在围栏机制失效时提高系统的可用性，建议配置一种围栏方法，作为列表中的最后一种围栏方法，该方法保证返回成功。
故障切换期间使用的防护方法配置为回车分隔列表，将按顺序尝试，直到有一种方法指示防护已成功。Hadoop附带了两种方法：shell和sshfence。
-->
    <property>
      <name>dfs.client.failover.proxy.provider.mycluster</name>
      <value>org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider</value>
    </property>
<!--
sshfence选项将发送到目标节点，并使用fuser终止侦听服务TCP端口的进程。为了让这个防护选项起作用，它必须能够在不提供密码短语的情况下通过SSH连接到目标节点。因此，还必须配置dfs.ha.fencing.ssh.private-key-files选项，这是一个以逗号分隔的SSH私钥文件列表。
-->
    <property>
      <name>dfs.ha.fencing.methods</name>
      <value>sshfence</value>
    </property>
    <property>
      <name>dfs.ha.fencing.ssh.private-key-files</name>
      <value>/home/hechuhuan/.ssh/id_rsa</value>
    </property>
<!--
或者，可以配置非标准用户名或端口来执行SSH。还可以为SSH配置一个以毫秒为单位的超时，在此超时之后，此防护方法将被视为失败。(不使用此方法)
-->
<!--
    <property>
      <name>dfs.ha.fencing.methods</name>
      <value>sshfence([[username][:port]])</value>
    </property>
    <property>
      <name>dfs.ha.fencing.ssh.connect-timeout</name>
      <value>30000</value>
    </property>
-->
<!--
shell Fenging方法运行任意shell命令。
-->
<!--
    <property>
      <name>dfs.ha.fencing.methods</name>
      <value>shell(/path/to/my/script.sh arg1 arg2 ...)</value>
    </property>
-->
<!--
这些环境变量也可以在shell命令本身中用作替换。
-->
<!--
    <property>
      <name>dfs.ha.fencing.methods</name>
      <value>shell(/path/to/my/script.sh --nameservice=$target_nameserviceid $target_host:$target_port)</value>
    </property>
-->
<!--
dfs的NN权限检查
-->
    <property>
      <name>dfs.permissions.enabled</name>
      <value>true</value>
    </property>
<!--
自动故障切换的配置需要在配置中添加两个新参数。
-->
    <property>
        <name>dfs.ha.automatic-failover.enabled</name>
        <value>true</value>
    </property>
```

**core-site.xml配置**

```xml
<!--
为Hadoop客户端配置默认路径，以使用新的启用HA的逻辑URI。如果您之前使用“mycluster”作为nameservice ID，那么这将是所有HDFS路径的权限部分的值。
-->
	<property>
      <name>fs.defaultFS</name>
      <value>hdfs://mycluster</value>
    </property>
<!--
tmp路径更改，与伪分布式基本一致
-->
	<property>
		<name>hadoop.tmp.dir</name>
        <value>/home/hechuhuan/tmp/data/hadoop/hdfs</value>
	</property>
<!--
这是JournalNode机器上的绝对路径，JNs使用的编辑和其他本地状态将存储在该路径中。此配置只能使用一条路径。通过运行多个单独的日志节点，或在本地连接的RAID阵列上配置此目录，可以提供此数据的冗余。
-->
    <property>
      <name>dfs.journalnode.edits.dir</name>
      <value>/home/hechuhuan/tmp/data/journalNode</value>
    </property>
<!--
这指定应将群集设置为自动故障切换。 告知hdfs访问zookeeper的地址。
-->
    <property>
        <name>ha.zookeeper.quorum</name>
        <value>nihilityer:2181,nihilityers:2181,nihilityerAir:2181</value>
    </property>
```

#### 启动hdfs过程

**第一次启动比较复杂：**(之后的启动都只需要正常的一步)

```BASH
#1、启动journalnode（拥有journalnode的节点都要运行一遍）
hadoop-daemon.sh start journalnode
#2、在activeNN的节点上格式化HDFS
hdfs namenode -format
#3、在activeNN节点上启动NN进程
hadoop-daemon.sh start namenode
#4、StandbyNN节点复制activeNN节点格式化好的数据
hdfs namenode -bootstrapStandby
#5、关闭除了zookeeper之外的所有hdfs进程
stop-dfs.sh
#6、在activeNN节点上格式化zkfc（为了实现自动切换状态）
hdfs zkfc -formatZK
#7、正常启动
start-dfs.sh
```

#### 配置yarn

**配置yarn-site.xml**

```XML
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
<!--官网关于ResourceManagerHA的配置-->
	<property>
      <name>yarn.resourcemanager.ha.enabled</name>
      <value>true</value>
    </property>
    <property>
      <name>yarn.resourcemanager.cluster-id</name>
      <value>cluster1</value>
    </property>
    <property>
      <name>yarn.resourcemanager.ha.rm-ids</name>
      <value>rm1,rm2</value>
    </property>
    <property>
      <name>yarn.resourcemanager.hostname.rm1</name>
      <value>nihilityer</value>
    </property>
    <property>
      <name>yarn.resourcemanager.hostname.rm2</name>
      <value>nihilityerair</value>
    </property>
    <property>
      <name>yarn.resourcemanager.webapp.address.rm1</name>
      <value>nihilityer:8088</value>
    </property>
    <property>
      <name>yarn.resourcemanager.webapp.address.rm2</name>
      <value>nihilityerair:8088</value>
    </property>
    <property>
      <name>yarn.resourcemanager.zk-address</name>
      <value>nihilityer:2181,nihilityers:2181,nihilityerair:2181</value>
    </property>
```

**mapred-site.xml配置**

```XML
<!--配置mapreduce运行在yarn上-->
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
</configuration>
```

#### 启动yarn

```BASH
#1、在activeRM节点上启动RM
start-yarn.sh
#2、在standbyRM节点上单独启动RM
yarn-daemon.sh start resourcemanager
```

## 第四章 分布式文件系统HDFS

### 分布式文件系统

#### 特点：

是一种允许文件通过网络在多台主机上共享的文件系统，可让多台机器的多用户共享文件和存储空间。

 通透性：让实际上是通过网络来访问文件的动作，由程序与用户看来，就像访问本地主机一般。

容错：即使某些节点宕机，整体来说系统仍然可以持续运行而不会有数据丢失。

适用于**一次写入多次查询**的情况，。不支持并发写，不适合小文件的保存。

**HDFS特点**

具有高度的容错能力，可以部署在低成本硬件上，提供对应用程序的高吞吐量访问，适用于具有大数据集的应用程序。

放宽了一下POSIX要求，以实现对文件系统数据的流式访问。

客户端功能：对文件进行逻辑分块。

**特点：移动数据不如移动计算**

**数据块**：默认大小为128M一块（2.x版本），一个文件有自己独立的块，不会合并。

#### 机架感知的副本放置策略

三份副本的放置策略如下：

第一个副本放置在客户端所在的节点，若客户端为远程访问则随机选择一个节点。

第二个副本放置在与第一个副本同机架的另外一个节点上

第三个副本放置在不同机架的节点上

数据复制：当节点数小于设置的副本值时，集群会先创建与节点数相同的副本并存储，将剩余的副本数进行记录，当有新的节点时，会创建新的副本，直到副本数与设置的值相同。

**HDFS具有主/从(master/slave)体系架构**

（1） **Client**（客户端）：

HDFS文件系统的使用者，进行读写操作。（客户端可以是集群中的某个节点，也可以是远程的）

对文件进行逻辑分块（文件是分成很多的block块保存在不同的节点上）

（2）**NameNode**（主节点进程）

整个HDFS集群的协调者，负责文件系统命名空间和负责客户端的请求

负责维护元数据信息（抽象的目录树，文件名和数据块的映射，DataNode和数据块的关系）

负责系统状态监控与调度

（3）**DataNode**（从节点进程）

负责处理来自文件系统客户端的读写请求。

存储文件的数据块，执行块的创建和删除。

定期向NameNode发送心跳信息，包括本身信息和block信息。

（4）**SecondaryNameNode**

一般运行在单独的物理计算机上，与NameNode进行通信，按照一定的时间间隔保持文件系统元数据的快照，是HA的一种解决方案，在生产环境的集群中，没有这个进程，当NameNode挂掉之后，可以帮助NameNode重启启动并恢复数据。

#### 命名空间（namespace）与块存储服务

HDFS使用的是传统的分级文件组织结构。

namespace负责管理文件系统中的树状目录结构。

块存储服务，负责管理文件系统中文件的物理块与实际存储位置的映射关系。

#### 文件操作命令

（参考网址）：https://hadoop.apache.org/docs/r3.2.2/hadoop-project-dist/hadoop-common/FileSystemShell.html

### 读写数据流

![写入数据流](/image/写入数据流.png)

![读取数据流](/image/读取数据流.png)

读写的单元：

block（128mb）

packet：网络传输单元（64kb）

chunk：校验单元（512bit）

### 元数据管理机制

#### 元数据

元数据是NameNode维护的，保存的信息：

（1）文件目录结构信息（抽象目录），及其自身的属性信息。

（2）文件存储信息，包括文件分块信息 file-> blk1 blk2 blk3；block和节点对应信息:  blk1->dn1 dn2 dn3  blk2-> dn2 dn3 dn4 blk3-> dn3 dn4 dn5

（需要注意的是block和节点的对应关系是临时构建的，并不会持久化存储，言外之意就是这部分元数据不会保存在磁盘中，但是DataNode会定期向NameNode通过心跳的方式汇报。）

**总结出内存中的元数据≈磁盘中的fsimage+日志**

操作越多，内存中的元数据与磁盘中的元数据差异性越大，如果NameNode不小心宕机，可能造成元数据的损失，所以就达到一定的条件需要对磁盘中的fsimage和edits做合并操作

#### 合并机制

Checkpoint:检查点（合并点）  hdfs-default.xml

dfs.namenode.checkpoint.period：设置两次相邻CheckPoint之间的时间间隔，默认是1小时；

dfs.namenode.checkpoint.txns：设置的未经检查的事务的数量，默认为1百万次。

非高可靠集群：secondaryNameNode合并元数据，高可靠的集群中由备用的namenode节点

![合并机制](/image/合并机制.png)

## 第五章 JAVA API

加入Hadoop依赖：

```xml
<!-- https://mvnrepository.com/artifact/org.apache.hadoop/hadoop-client -->
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-client</artifactId>
    <version>2.7.6</version>
</dependency>
```

## 第六章 YARN

### 一、MapReduce的构架

#### MapReduce（1.x）【只需要了解】

**主从构架**

![mapreduce1的构架](/image/mapreduce1的构架.png)

（1）JobTracker

主节点，在整个集群也只有一个

负责：

​	作业的管理

​	接受并响应客户端的命令：提交，查看，杀死/停止作业

​	将一个作业分为多个任务（Map任务和Reduce任务），并把任务分发给TT（TaskTracker）

​	接受TT的心跳信息，如果接收不到，则认为宕机，会把该TT的任务分发给其他TT节点。

​	进行集群资源的管理和分配

（2）TaskTracker

从节点：整个集群中有很多个

用来执行任务，定期向JT发送心跳信息（自身的健康状况，作业执行状况，资源使用情况），管理自身的资源使用情况

（3）Client

客户端：提交作业，查看作业进度，发送指令杀死作业或者停止作业

（4）MapTask

Map任务，执行设定好的Map程序

在HDFS上读取并且缝隙需要处理计算的数据，并对书记进行map计算

将计算结果保存在本地磁盘上

（5）ReduceTask

Reduce任务，执行设定好的reduce程序

读取map的计算结果，并对结果进行计算，将最终结果保存在HDFS上

**1.x存在的问题**

1、整个集群存在单点故障

2、JobTask压力太大，不易于集群的扩展

3、只能运行MapReduce程序，没有办法整合其他框架

4、资源利用率低

5、运维成本高

### 二、YARN

概述：是hadoop2.0中的资源管理系统。它的基本思想是将资源管理和作业调度/监控分解成为单独的守护进程

![YARN构架](/image/YARN构架.png)

体系构架

（1）ResourceManager（RM）

整个集群同一时间提供服务的RM只有一个。

有两个主要组件：Scheduler（资源调度）和ApplicationManager（程序管理）

负责集群资源的统一管理和调度（RM/Scheduler）

处理客户端的请求，协商启动第一个容器，运行AM，任务失败后重启AM

监控NM的状态

（2）NodeManager（NM）

整个集群有多个

负责自己本身节点资源管理和使用

定时向RM汇报本节点的资源使用情况

接收并处理来自RM的各种命令（启动容器，运行AM）

处理来自AM的命令（启动容器，运行任务）

（3）ApplicationMaster（AM）

每个应用程序对应一个，负责应用程序的管理（作业调度/监控）

为应用程序向RM申请资源，分配给内部task

与NM通信，启动/停止Task，task运行在Container中

（4）Container

封装了CPU、内存等资源，是一个任务运行环境的抽象

（6）Client

提交，查找，杀死作业

![MapReduce运行在Yarn上](/image/MapReduce运行在Yarn上.png)

### 三、MapReduce

#### 1.MapReduce的执行流程

MapReduce作业通常将输入数据集分割成独立的区块，由map任务以完全并行的方式处理这些区块，框架对map的输出进行排序，然后将其输入到reduce任务中。通常作业的输入和输出都存储在文件系统中。框架负责调度任务、监视它们并重新执行失败的任务。

作业是分成了Map和Reduce两种任务，源数据和计算完成的结果通常都是保存在HDFS上的。

![MapReduce运行流程](/image/MapReduce运行流程.png) **map**

（1）系统将数据拆分为若干个“分片”（split）

（2）将分片数据以键-值方式传递给map进行处理

（3）map方法对数据进行业务处理

（4）将处理的数据写入到磁盘

**reduce**

（1）通过多个复制线程去拉取不同map节点输出的数据文件

（2）对这些数据文件进行排序和合并，然后传入reduce方法

（3）reduce方法对数据进行业务处理

（4）输入数据到文件系统（HDFS）

#### 2.wordcount源码解析和图解执行流程

![WordCount](/image/WordCount.png)

## 第七章 编码与源码阅读

### 一、Mapper和Reducer源码解读

#### Mapper

**org.apache.hadoop.mapreduce.Mapper**

**四个泛型：**

KEYIN:map任务输入的key的类型，默认的是行的偏移量

VALUEIN：map任务输入的value的类型，默认的是读的当前行的内容

KEYOUT: map任务输出的key的类型

VALUEOUT:map任务输出的value的类型

#### **Reducer**

**org.apache.hadoop.mapreduce.Reducer**

**四个泛型：**

KEYIN:reduce任务输入的key的类型，也是map输出的key的类型

VALUEIN: reduce任务的输入的value的类型，也是map输出的value的类型

KEYOUT:最终结果输出的key的类型

VALUEOUT:最终结果输出的VALUE的类型

#### Job

**org.apache.hadoop.mapreduce.Job**

**常用方法：**

**1.getInstance(Configuration, String)**

获取Job对象的方法

参数：Configuration对象，用来读取配置文件的。String: 设置Job的名称。

**2.setJarByClass(Class<?> cls)**

设置程序的驱动类的方法

**3.setMapperClass(Class<? extends Mapper>**

设置整个程序的Mapper类，接收的参数就是我们开发Mapper

**4.setReducerClass(Class<? extends Reducer> cls)**

设置程序的Reducer类,接收的参数就是我们开发的Reducer

**5.setMapOutputKeyClass(Class<?> theClass cls)**

  设置map任务的输出的key的类型

**6.setMapOutputValueClass(Class<?> theClass cls)**

  设置map任务输出的value的类型

**7.setOutputKeyClass(Class<?> theClass cls)**

  设置程序输出的key的类型

**8.setOutputValueClass(Class<?> theClass cls)**

  设置程序输出的value的类型

**9. waitForCompletion(boolean)**

提交作业的

**10. setCombinerClass(Class<? extends Reducer>)**

设置自己开发的Combiner类的方法。

**11.setPartitionerClass(Class<? extends Partitioner>)**

 设置自定义分区类的方法

**12.setNumReduceTasks(int)**

设置Reducer任务的个数的（reducetask并行度）。

### 二、输入输出类

![mapreduce运行示意图](/image/mapreduce运行示意图.png)

#### 输入

**InputFormat**

org.apache.hadoop.mapreduce.InputFormat(抽象类)

验证整个job的输入规则；将输入文件拆分为逻辑的inputsplit，然后将每个inputsplit分配给一个独立的Mapper；创建RecoderReader对象

**RecoderReader**

org.apache.hadoop.mapreduce.RecoderReader

会将InputSplites以Key/Value对的方式输入到map中

#### 输出

**OutputFormat**

org.apache.hadoop.mapreduce.OutputFormat

验证输出规则，比如检查输出路径是否已经存在；创建RecordWriter对象

**RecoderWriter**

org.apache.hadoop.mapreduce.RecoderWriter

以Key-Vlaue对的方式将结果写入到输出的文件中

### 三、partitioner和combiner编程

##### partitioner

分区：默认所有的数据都在一个分区

   开发者可以根据业务需求自定义分区，并且在Job中设置使用自定义分区

   只有是在Job中设置了分区，也需要设置reduce任务的数量

##### combiner

在map端的shuffle

Hadoop [1,1,1,1,1] reduce->5

HBase [1,1,1]   reduce->3

就是reduce的一次预演，它不适合所有的业务逻辑

如果使用Combiner，可以继承Reducer开发Combiner组件，也可以不开发，直接使用Reducer作为Combiner组件。

### 四、总结

1.MapReduce 软件框架，开发者基于这个框架来编写程序

特点：可靠 并行计算（Map阶段和Reduce阶段）

2.MapReduce流程：

（1）Map任务的并行度是由切片的数量的决定的

（2）Reduce任务的并行度是由分区的数量决定的

（3）切片的默认的大小是128M

（4）默认的分区的个数1个，开发者可以自定义分区，按照开发者的规则进行分区

（5）Map任务执行的Mapper的map方法，输出的结果会进入shullfe的过程（分区，排序），思想：分而治之,数据经过shullfle后写到磁盘上

（6）Reduce任务执行的Reducer中reduce方法，在reduce输入之前，启动几个线程将不同节点上的相同分区的数据拉取到同一个节点，进入到Reducer的shullfe中（合并、排序）

（7）MapReduce数据的输入和输出都是键值对的数据

## 第八章 Hadoop的I/O操作

### 一、序列化和反序列化

序列化（钝化）：将结构化的对象转化为字节流，在网络上传输或者写入到硬盘进行永久存储。

反序列化（活化）：将字节流转化为结构化的对象（读取文件）

### 二、序列化对象

在Java中的序列化对象 Serializable,Hadoop认为这个对象是一个重量级的对象，

（1）Hadoop开发了自己的序列化对象Writable

（2）MapReduce中的key和value必须要实现Writale接口

（3）MapReduce会默认按照输出的Key进行排序，所以，MR中的所有的key都必须要实现WritableComparable接口。

### 三、常用的子类

**ByteWritable** 

**ShorWritable** 

**IntWritable** 

**LongWritable** 

**DoubleWritable** 

**FloatWritable** 

**Text** 

**NullWritale**

如果上面的这些基本的类型不满足业务要求，此时需要自定义序列化
