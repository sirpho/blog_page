# blog_page

个人博客--前端

### 依赖安装

```
pnpm install
```

### 测试环境打包命令

```
pnpm run build
```

### 正式环境打包命令

```
pnpm build:prod
```

# 脚本打包上传
```
pnpm upload-prod
```

# 手动打包上传
## 1. 打包上传到服务器

```bash
D:

scp "D:\document\sirpho\blog_page\dist\dist.zip" root@www.sirpho.top:/var/www/html/blog


```

## 2. 登录服务器解压

```bash

ssh root@www.sirpho.top

cd /var/www/html/blog
rm -rf assets index.html favicon.svg  iconfont.js
unzip dist.zip
rm -rf dist.zip
```
