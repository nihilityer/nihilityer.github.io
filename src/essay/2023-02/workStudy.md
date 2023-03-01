---
title: 工作学习笔记
icon: result
category:
  - 随笔
tag:
  - diary
---

## 工作学习笔记

### 新接触的知识点

#### 1、bootstrap配置文件

- boostrap由父ApplicationContext加载，比applicaton优先加载；

- boostrap里面的属性不能被覆盖。

#### 2、微服务设计原则（AKF原则）

- **X轴：关注水平扩展，即通过应用及数据库多副本&负载均衡解决问题**
- 示例：一个网站部署在服务器A上对外服务，随着访问人数增加，一台服务其的性能无法支持，于是在服务器上B上同样部署了网站，然后在前面部署了Apache或者Nginx来分流访问，这就是最基本的X轴扩展。缺点：例如更新网站的登陆模块，需要将所有服务重新部署发布。如果网站首页新闻访问量大，但是登陆访问量少，无法区分只能复制服务。
- **Y轴：关注应用中功能划分，基于不同的业务拆分**
- 示例：把网站的注册登录模块，首页新闻展示模块，后台维护模块拆成了多个微服务进行部署维护。X轴扩展和Y轴扩展并不矛盾，是可以结合的，比如发现新闻展示模块压力很大，可以对新闻展示模块进行X轴扩展，部署多个镜像来分担压力。
- 缺点：维护成本较高。
- **Z轴：关注服务和数据的优先级划分，如按地域划分**
- 示例1：网站一开始建设在上海数据中心，面向全国服务。随着公司业务的增长，西安的客户大量增加，但是访问上海数据中心速度很慢，所以公司考虑在西安建立数据中心来应对用户访问，这就是Z轴扩展。
- 示例2：某公司系统同时面向多个客户提供数据服务。最近，公司新谈了客户A，客户A由于体量巨大，超过了现有客户的综合，同时对系统稳定性要求很高，公司决定对客户A单独部署系统提供服务，这也是典型的Z轴扩展。
- 缺点：Z轴扩展是所有扩展中成本最高的。

#### 3、开发中一些工具

- tiny-framework企业级开发框架

- hutool一些常用工具封装

- easypoi文档导入导出封装工具包、easyexcel消耗内存更小

- dynamic-datasource-spring-boot-starter**一个基于springboot的快速集成多数据源的启动器**

  ```maven
  <dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
    <version>${dynamic_version}</version>
  </dependency>
  ```

- pagehelper分页

- caffeine内存缓存库

- ansj_seg中文分词

- quartz作业调度框架

- jjwt **Java jwt整合**

- kaptcha验证码框架

- joda-time常用的时间处理类库

- gson json类库

- minio对象存储
