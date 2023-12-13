---
title: npm使用
author: kebobo
date: '2023-12-13'
---

## npm 查看远程依赖

```bash
npm info <packageName>

npm view <packageName> version --json
```

## npm 查看本地安装依赖树关系

```bash
npm ls <packageName>    // 本地依赖

npm ls <packageName> -g // 全局安装包
```

## npm 语义化版本

npm 使用 a.b.c 的版本号来管理安装包。

> a 为大版本：有重大改变，一般是架构、api 等改变，不向下兼容。
>
> b 为小版本：新增功能，向下兼容
>
> c 为补丁：修复 bug，向下兼容

```bash
~a.b.c  取最新的c的版本号值，a和b保持不变
^a.b.c  取b和c均为最新版本号，a保持不变
```
