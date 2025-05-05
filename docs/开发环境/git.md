# Git 常用操作

## 本地配置

```bash
git config --global user.name 你的英文名
git config --global user.email 你的邮箱
git config --global push.default simple
git config --global core.quotepath false
git config --global core.editor "code --wait"
git config --global core.autocrlf input
```

## 查看 git 配置

```bash
git config --global --list  # 查看 git 的配置
```

## 生成 ssh key

```bash
ssh-keygen -t rsa -b 4096 -C 你的邮箱
```

然后一直回车，直到没有提示。然后运行以下代码，获取公钥内容：

```bash
cat ~/.ssh/id_rsa.pub  # 得到公钥内容
```
