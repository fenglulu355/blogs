##### vue自动转化rem

1、安装

```
npm i lib-flexible --save
npm install px2rem-loader --save-dev
```

2、引入

```
import 'lib-flexible'
```

3、配置build下面的util.js

3.1在cssLoader里面添加

```
const px2remLoader = {
    loader: 'px2rem-loader',
        options: {
        remUnit: 75
      }
    }
```

3.2 function generateLoaders

```
 const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader,px2remLoader]
```

