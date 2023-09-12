---
title: nihility助手制作笔记
order: 1
icon: result
category:
  - 随笔
tag:
  - diary
---

## rust初学笔记

### 一、接受命令行参数

rust使用cargo运行时，当命令加入`--`即可对程序传入命令参数，构建可以直接传参，读取时类似下面这种：

```rust
// in main.rs
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    dbg!(args);
}
```

::: warning

所有的用户输入都不可信！不可信！不可信！

重要的话说三遍，我们的命令行程序也是，用户会输入什么你根本就不知道，例如他输入了一个非 Unicode 字符，你能阻止吗？显然不能，但是这种输入会直接让我们的程序崩溃！

原因是当传入的命令行参数包含非 Unicode 字符时， `std::env::args` 会直接崩溃，如果有这种特殊需求，建议大家使用 `std::env::args_os`，该方法产生的数组将包含 `OsString` 类型，而不是之前的 `String` 类型，前者对于非 Unicode 字符会有更好的处理。

至于为啥我们不用，两个理由，你信哪个：1. 用户爱输入啥输入啥，反正崩溃了，他就知道自己错了 2. `args_os` 会引入额外的跨平台复杂性

:::

### 二、配置构建

例子：

```rust
impl Config {
    fn build(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("not enough arguments");
        }

        let query = args[1].clone();
        let file_path = args[2].clone();

        Ok(Config { query, file_path })
    }
}
```

以上代码中，需要注意的几点：

1、`Result`的Err类型应该为`&'static str`;

2、由于配置构建只在程序开始运行时运行一次，所以使用clone没有问题，省时省力，性能损耗可以忽略。

```rust
// 对 build 返回的 `Result` 进行处理
let config = Config::build(&args).unwrap_or_else(|err| {
    println!("Problem parsing arguments: {err}");
    process::exit(1);
});
```

### 三、main分割

示例：

```rust
//in main.rs
use std::error::Error;

// --snip--

fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let contents = fs::read_to_string(config.file_path)?;

    println!("With text:\n{contents}");

    Ok(())
}

// 调用方式
if let Err(e) = run(config) {
    println!("Application error: {e}");
    process::exit(1);
}
```

### 四、测试

示例：

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn one_result() {
        let query = "duct";
        let contents = "\
Rust:
safe, fast, productive.
Pick three.";

        assert_eq!(vec!["safe, fast, productive."], search(query, contents));
    }
}
```

