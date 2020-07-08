# my-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

```css

│  .browserslistrc
│  .gitignore
│  .prettierrc
│  babel.config.js
│  list.txt
│  package-lock.json
│  package.json
│  README.md
│  
├─public
│      index.html
│      
├─src
│  │  App.vue
│  │  main.js
│  │  
│  ├─assets
│  │  └─css
│  │          global.css (全局css样式)
│  │          
│  ├─components (公共组件)
│  ├─plugins
│  │      element.js
│  │      
│  ├─router (路由)
│  │      index.js
│  │      
│  ├─store
│  │      index.js
│  │      
│  ├─mock (mock模拟后台数据)
│  │
│  │
│  └─view (所有静态页面)
│      ├─group (组列表)
│      │      index.vue
│      │      
│      ├─home (首页)
│      │      index.vue
│      │      
│      ├─login (登录页面)
│      │      index.vue
│      │      
│      ├─project (项目列表)
│      │      index.vue
│      │      
│      ├─projectView (组内项目任务视图)
│      │      index.vue
│      │      
│      ├─task (任务列表)
│      │      index.vue
│      │      
│      ├─taskView (项目任务视图)
│      │      index.vue
│      │      
│      ├─user (用户列表)
│      │      index.vue
│      │      
│      ├─userView (组内人员任务视图)
│      │      index.vue
│      │      
│      └─welcome 
│              index.vue
│              
└─static (静态资源)
    └─img ( 图片)
```

