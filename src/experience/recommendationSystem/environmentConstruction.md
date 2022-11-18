---
title: 环境搭建
icon: condition
category:
  - 总结
tag:
  - RecommendationSystem
---
## 操作系统安装
使用ubuntu20.04.5作为操作系统，ubuntu具有桌面版和服务器版。
初次实验时使用的是desktop版，为了后续演示过程的系统性能考虑，实体机上使用的版本为live-server版。

操作系统的安装比较简单，为了防止安装过程遗漏细节，以下列出安装完操作系统之后需要的操作：
- 修改hosts以及hostname为`nihilityer`以及`nihilityer.me`，使用静态IP
- 将ubuntu的系统更新站换成清华镜像站、更新系统软件
- 安装必须软件docker、ssh
- 安装hadoop、jdk、scala、spark等组件

### ubuntu更换更新站
#### 手动更改
Ubuntu 的软件源配置文件是`/etc/apt/sources.list`。将系统自带的该文件做个备份，将该文件替换为下面内容，即可使用 TUNA 的软件源镜像。
**注意！以下为20.04版本的，[镜像站帮助地址](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)**
```
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
```
#### 使用命令替换
```shell
sudo sed -i "s@http://.*archive.ubuntu.com@https://mirrors.tuna.tsinghua.edu.cn@g" /etc/apt/sources.list
sudo sed -i "s@http://.*security.ubuntu.com@https://mirrors.tuna.tsinghua.edu.cn@g" /etc/apt/sources.list
```
### 安装docker、ssh
#### 配置ssh
```shell
sudo apt-get install openssh-server
```
确认ssh启动之后，配置免密登录（在用户目录下的`.ssh`目录下操作）
- 生成密钥
```shell
ssh-keygen -t rsa
```
- 密钥分发
```shell
ssh-copy-id -i id_rsa.pub nihilityer
```
#### 安装docker
[官网地址](https://docs.docker.com/engine/install/ubuntu/)
- 卸载旧版本
```shell
sudo apt-get remove docker docker-engine docker.io containerd runc
```
- 安装前置依赖
```shell
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```
- 添加GPG证书
```shell
# 官网版本
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```
```shell
# 阿里云版本（来自社区）
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
```
- 添加软件源信息
```shell
# 官网版本
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
```shell
# 阿里云版本（来自社区）
add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
```
- 安装
```shell
# 官网版本
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```
```shell
# 阿里云版本（来自社区）
sudo apt-get update
apt-get install docker-ce docker-ce-cli containerd.io
```
- 开启docker并设置开机启动
```shell
# 验证
sudo docker version
sudo docker run hello-world
```
```shell
systemctl start docker
systemctl enable docker
```
- (可能需要的步骤)配置镜像仓库 

去阿里云控制台申请镜像仓库地址，将地址添加到`/etc/docker/daemon.json`中，添加格式：
```json
{
  "registry-mirrors": ["https://xxxxxxx.mirror.aliyuncs.com"]
}
```

## 安装hadoop等组件
**所有组件安装在用户目录的software目录下，即`/home/nihilityer/software`**

tar解压命令格式：`tar -zxvf [压缩包] -C /home/nihilityer/software`
```shell
# 环境依赖配置完成后注意刷新，.bashrc文件在用户根目录下
source .bashrc
```
### 安装jdk
将jdk压缩包使用tar解压（注意更改解压后文件夹名为`jdk1.8`），在.bashrc文件中添加环境依赖
```shell
export JAVA_HOME=/home/nihilityer/software/jdk1.8
export PATH=$PATH:$JAVA_HOME/bin
```
### 安装scala
将scala压缩包解压（文件夹名应为`scala`），在.bashrc文件中添加环境依赖
```shell
export SCALA_HOME=/home/nihilityer/software/scala
export PATH=$PATH:$SCALA_HOME/bin
```
### 安装hadoop
将hadoop压缩包解压（文件夹应为hadoop），在.bashrc文件中添加环境依赖
```shell
export HADOOP_HOME=/home/nihilityer/software/scala
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
```
配置hdfs相关文件：
- 配置`core-site.xml`文件
```xml
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://nihilityer:9000</value>
    </property>
    <property>
    	<name>hadoop.tmp.dir</name>
        <value>/home/nihilityer/tmp/hadoop</value>
    </property>
</configuration>
```
- 配置`hdfs-site.xml`文件
```xml
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
</configuration>
```
- 初始化hdfs
```shell
hdsf namenode -format
```
- 启动hdfs
```shell
start-dfs.sh
```
- 配置`mapred-site.xml`文件（没有就复制模板文件创建）
```xml
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
</configuration>
```
- 配置`yarn-site.xml`文件
```xml
<configuration>
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
</configuration>
```
- 启动yarn
```shell
start-yarn.sh
```
- 通过浏览器访问验证启动是否成功
[hdfs地址](http://nihilityer.me:9870)
[yarn地址](http://nihilityer.me:8088)
### 安装spark
spark只使用spark-submit方式运行

将spark压缩包解压（文件夹名应为`spark`），在.bashrc文件中添加环境依赖
```shell
export SPARK_HOME=/home/nihilityer/software/spark
export PATH=$PATH:$SPARK_HOME/bin
```
在`spark`文件夹`conf`目录下配置`spark-env.sh`文件（没有就使用模板文件创建）
```shell
export HADOOP_CONF_DIR=/home/nihilityer/software/hadoop/etc/hadoop
```
验证：
```shell

```
