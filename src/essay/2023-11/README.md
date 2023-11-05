---
title: 2023-11
order: 3
icon: result
tag:
  - diary
---

## 本月总结

现在发现，一个月可以记录的东西不算太多，一些小东西就直接在这记录吧。

### Docker查看容器IP

```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my_container
```

### Git常用指令

#### 暂存所有更改

```bash
git add .
```

#### 查看状态

```bash
git status
```

#### 提交

```bash
git commit -m "update in2023-11-05"
```

#### 推送

```bash
git push <远程仓库> <本地分支>:<远程分支>
```

通常使用：`git push origin main`

#### 显示远程仓库信息

```bash
git remote -v
```

详细信息：`git remote show origin`

