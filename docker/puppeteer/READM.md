# Usage


1. 定制 puppeteer 运行镜像

- puppeteer 运行环境依赖 chrome 浏览器，不同系统间要安装的版本，由于众所周知原因，可能会存在下载不成功

```
  docker-pptr
  
```



```
docker run --cap-add SYS_ADMIN -v $PWD:/app mirrors.tencent.com/xcatliu/pptr node example.js

docker run --cap-add SYS_ADMIN -v $PWD:/app -d pptr-images:latest node puppeteer/index.js
```