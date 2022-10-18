---
title: 工具使用心得
icon: linux
order: 1
category:
  - 心得
tag:
  - tools
---
vscode使用alt+shift+f整理代码。
shift+！可以按照模板生成内容。

promise封装异步操作：
```
function get(url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            data: data,
            success: function (data) {
                resolve(data);
            },
            error: function (err) {
                reject(err)
            }
        })
    })
}

get("mock/user.json")
    .then((data) => {
        console.log("test", data)
        return get(`mock/user_sorse_${data.id}.json`);
    })
    .then((data) => {
        console.log("test", data)
        return get(`mock/user_sorse_${data.id}.json`);
    })
    .then((data) => {
        console.log("test", data)
    })
    .catch((err) => {
        console.log("err", err)
    })
```
