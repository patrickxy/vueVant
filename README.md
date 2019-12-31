# vue-vant

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

#### 按需引入方式

[按需引入组件配置方式](https://youzan.github.io/vant/#/zh-CN/quickstart).

1. 引用 babel-plugin-import 组件 "babel-plugin-import": "^1.12.0",
2. 放开 babel.config.js 配置
3. 按需引用 import { Button } from 'vant';
4. 全局注册 import { Button } from "vant"; Vue.use(Button);

#### 直接引入全部组件的方式

```javascript
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);
```

#### rem 布局引入方式

1. 引入 postcss-pxtorem amfe-flexible 包

2. ```javascript
   //vue.config.js
   css: {
     loaderOptions: {
       postcss: {
         plugins: [
           autoprefixer(),
           pxtorem({
             rootValue: 37.5,
             propList: ["*"]
           })
         ];
       }
     }
   }
   ```

3. ```javascript
   //main.js
   import "amfe-flexible";
   ```
