---
title: 使用git rebase合并多次commit
author: kebobo
date: '2023-12-06'
---

当我们开发时，通常会过多地 commit 一些修改，而有时这些 commit 只是为了测试，或者频繁更新一个测试的库，这时我们的 commit 记录会很多。并且这些 commit 都是没太大必要的。

这时我们希望合并或者摒弃一些 commit 以此达到分支简洁的效果。

使用 rebase 合并多个分支。

> rebase 的作用简要概括为：可以对某一段线性提交历史进行编辑、删除、复制、粘贴；因此，合理使用 rebase 命令可以使我们的提交历史干净、简洁！

## 具体操作

```bash
git rebase -i [startpoint] [endpoint]
```

其中`-i`的意思是`--interactive`，即弹出交互式的界面让用户编辑完成合并操作。`[startpoint] [endpoint]`则指定了一个编辑区间，如果不指定`[endpoint]`，则该区间的终点默认是当前分支 HEAD 所指向的 commit。

```bash
git rebase -i xxx
# 不包含 xxx 记录
```

或者

```bash
git rebase -i HEAD~3
# 前三个记录
```

### 例子

假设我们有以下历史记录：

```bash
commit 1111111
Author: user1 <user1@example.com>
Date:   Mon Sep 6 10:00:00 2021 +0800

    Add feature A

commit 2222222
Author: user1 <user1@example.com>
Date:   Tue Sep 7 10:00:00 2021 +0800

    Add feature B

commit 3333333
Author: user1 <user1@example.com>
Date:   Wed Sep 8 10:00:00 2021 +0800

    Add feature C
```

如果我们想将 commit 1111111 和 commit 2222222 合并成一个 commit，可以使用以下命令：

```bash
git rebase -i HEAD~3
```

输入之后，会进入编辑阶段。然后 win 下按 i 键，可以进入编辑。编辑完只有按 `Esc` 退出编辑，然后输入 `:wq` 保存并退出

```bash
pick 1111111 Add feature A
squash 2222222 Add feature B
pick 3333333 Add feature C
```

保存并退出后，会生成一个新的 commit，包含了 commit 1111111 和 commit 2222222 的修改，同时保留了 commit 3333333 的修改。然后使用 `git push --force` 命令强制推送修改到远程仓库。

```bash
git push --force
```

执行完上述命令后，commit 历史记录变成了：

```bash
commit 4444444
Author: user1 <user1@example.com>
Date:   Thu Sep 9 10:00:00 2021 +0800

    Add feature A and B

commit 3333333
Author: user1 <user1@example.com>
Date:   Wed Sep 8 10:00:00 2021 +0800

    Add feature C
```

可以看到，commit 1111111 和 commit 2222222 被合并成了一个 commit 4444444，而且使用了 `git push --force` 命令强制推送修改到远程仓库。

## 指令说明

> pick：保留该 commit（缩写:p）
>
> reword：保留该 commit，但我需要修改该 commit 的注释（缩写:r）
>
> edit：保留该 commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
>
> squash：将该 commit 和前一个 commit 合并（缩写:s）
>
> fixup：将该 commit 和前一个 commit 合并，但我不要保留该提交的注释信息（缩写:f）
>
> exec：执行 shell 命令（缩写:x）
>
> drop：我要丢弃该 commit（缩写:d）
