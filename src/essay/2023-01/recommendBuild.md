---
title: 推荐系统构建
icon: result
category:
  - 随笔
tag:
  - diary
---

## nginx使用

使用docker来运行nginx（注意：先不挂在数据卷运行一个镜像，然后复制镜像中的配置文件到宿主机）

```shell
sudo docker run --name nginx -p 80:80 \
-v /home/nihilityer/nginx/html:/usr/share/nginx/html \
-v /home/nihilityer/nginx/nginx.conf:/etc/nginx/nginx.conf \
-v /home/nihilityer/nginx/log:/var/log/nginx \
-d nginx
```

nginx.conf核心配置

```
server {
    listen       80;
    charset utf-8;
    server_name nihilityer.me;

    location ^~ / {
    	try_files $uri $uri/ /index.html;
    }

    location ^~ /api/ {
    	proxy_pass  http://192.168.1.109:8080/;
    }

}
```

**PS：**镜像设置重启方式

```shell
sudo docker update --restart=always <容器ID>
```

## docker打包运行springboot项目

### Dockerfile

```dockerfile
FROM java:8
COPY ./BusinessServerModule-1.0.0.jar /home/musicRecommend/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/home/musicRecommend/app.jar"]
```

**打包命令**

```shell
sudo docker build -t <镜像标签：v1> .
```

## Docker开启远程TCP连接

修改`/etc/systemd/system/multi-user.target.wants/docker.service`文件；

在`ExecStart`这一项之后添加

```
-H tcp://0.0.0.0:2375
```

刷新service文件并重启docker

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

