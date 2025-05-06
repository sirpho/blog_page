# blog_page

# 博客--前端

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

## 1. 打包dist目录并上传到服务器，上传完毕后删除dist目录

```bash

tar -a -c -f D:\document\sirpho\blog_page\dist\dist.zip --exclude=dist.zip -C D:\document\sirpho\blog_page\dist .

scp "D:\document\sirpho\blog_page\dist\dist.zip" root@www.sirpho.top:/var/www/html/blog

Remove-Item -Path "D:\document\sirpho\blog_page\dist" -Recurse -Force

```

## 2. 登录服务器解压

```bash

ssh root@www.sirpho.top

cd /var/www/html/blog
rm -rf assets index.html favicon.svg  iconfont.js
unzip dist.zip
rm -rf dist.zip
```
