# cv-space-mini

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目启动报错问题
1、`Error: PostCSS plugin autoprefixer requires PostCSS 8. Migration guide for end-users:`，报错原因：autoprefixer版本过高，运行`Error: PostCSS plugin autoprefixer requires PostCSS 8. Migration guide for end-users:`命令。
2、执行`npm i`时报错，是由于npm7.x对某些事更严格，需要执行`npm i --legacy-peer-deps`
