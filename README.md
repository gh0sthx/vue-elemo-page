# Vue高仿饿了么APP（用户端）
- 使用vue@1.0
  - mock假数据存储在本地
  - 使用stylus编写样式
  - 使用eslint进行js代码的规范
  - 使用[better-scroll](https://github.com/ustbhuangyi/better-scroll)进行联动滑动
- vue@2.x
  - 修正package.json
  - 修正route，keeplive使用方式
  - 修正v-for,v-el,v-ref
  - 模板变化，组件只允许一个根元素
  - 组件通信变化$dispatch(子组件向父组件冒泡,父组件添加event属性来监听事件)废除,取而代之$emit（当前实例派发事件）
  - 事件监听变化，废除 events 属性
  - 不能在子组件直接修改父组件传入的prop
  - 过渡的变化，transition组件
- vue@2.5 + cubi-ui 
(http://coding.imooc.com/class/74.html)

## 主要问题
- better-scroll不能滚动？

better-scroll的滚动原理，dom结构至少需要2层。外层容器需要有固定的大小（宽度或高度），作为视口；内层容器的大小是由内容撑开的，当内层高度或宽度超过外层视口的时候，才会产生滚动。
所以首先需要检查内外层的尺寸，其次是在Vue.js里，我们改变数据，dom并不会立刻改变，通常会在下一个Event Loop，nextTick去更新。而我们的better-scroll是依赖dom的。所以，当数据变化映射的dom和better-scroll相关的时候，我们通常需要在vm.$nextTick的回调函数里初始化或者刷新better-scroll。

- css编译不正确 只有-ms厂商的前缀，如display:flex编译后只有display:-ms-flexbox ？

在 webpack.base.conf.js 加上如下配置：
```
vue: {
 loaders: utils.cssLoaders(),
 postcss: [
   require('autoprefixer')({
     browsers: ['last 2 versions', 'Android >= 4.0']
   })
 ]
}
```

- 为什么在main.js全局加载了index.styl（包含mixin.styl），在一些Vue组件里面还要import mixin.styl呢？

确实需要在每个组件引入依赖的 mixin.styl 文件，因为webpack是单文件编译的。在webpack的编译过程中，由vue-loader处理vue文件，vue文件在处理stylus编译的时候，遇到了使用mixin的地方，但这个时候它并不会知道“全局”依赖了mixin.styl，它需要给根据依赖的文件去查找是否定义了这个mixin，然后把对应的代码替换到当前stylus文件里。 

