# 如何使用docsify-theme-liawn

## 通过cdn引入来使用docsify-theme-liawn

theme-liawn.min.css样式（要先引入vue.css）：

```html
<!-- 使用官方的主题样式vue.css -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css" title="vue">
<!-- 必须先引入vue.css然后再引入自定义主题css //cdn.jsdelivr.net/gh/用户名/仓库名@版本/文件夹/文件名 -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/liawnliu/docsify-theme-liawn@v1.0.0/dist/theme-liawn.min.css"
type="text/css" />
```

theme-liawn.min.js

```html
<script src="//cdn.jsdelivr.net/gh/liawnliu/docsify-theme-liawn@v1.0.0/dist/theme-liawn.min.js"></script>
```

如果引入后**控制台报错**，那么可以照着**下面两章**的内容来设置。

## 文档项目结构和package.json

首先确保你的blog或者文档项目是如下结构的：

```test
ProjectName（例如blog，也可以是xxx-react，只要保证docs是真正的文档入口目录即可）
  ├──docs （docsify作用于这个文件夹，也是部署在GitHub Pages上的目录）
  │   ├──book-sketches （博客内容，例如生活部分）
  │   │       └──_sidebar.md （book-sketches里所有md文件组成的目录）
  │   ├──book-web （博客内容，例如web部分）
  │   │       └──_sidebar.md （book-web里所有md文件组成的目录）
  │   ├──public （存放博客系统的公共资源，也可以放本地插件）
  │   │   └──image （博客系统的公共图片资源）
  │   │       ├──bg.png （封面背景图）
  │   │       ├──bgPhone.png （移动端封面背景图）
  │   │       └──favicon.ico （网站页签图标icon）
  │   ├──_coverpage.md （博客系统的封面）
  │   ├──_navbar.md （博客系统的导航栏）
  │   ├──.nojekyll （解决名字为下划线开头的文件在GitHub上的报错）
  │   ├──index.html （博客系统的入口文件，存放一些配置，引入一些插件等）
  │   ├──README.md （博客系统的HomePage主页）
  │   └──sw.js （博客系统的离线功能）
  ├──node_modules （npm包安装所在）
  ├──.gitignore （git忽略文件）
  ├──package-lock.json （npm包管理文件）
  ├──package.json （npm包管理文件）
  └──README.md （本项目说明文件）
```

其中的package.json应该是这样的：

```json
{
  "name": "blog_docsify",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "init": "docsify init ./docs",
    "dev": "docsify serve ./docs"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "docsify-cli": "^4.4.3"
  }
}
```

可以看到`"init": "docsify init ./docs"`，它会在`docs`目录里生成`index.html`、`.nojekyll`等文件。让docsify只作用到`docs`目录，原因是考虑到很多前端项目有现存的`docs`目录，我们只需要在这个**目录里**上加docsify相关文件就能部署到GitHub Page上，不要影响到前端项目的`docs`同级的`src`了。

## docs里的index.html

我本人的`docs/index.html`如下：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="description" content="Description">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <!-- 使用官方的主题样式vue.css -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css" title="vue">
  <!-- 必须先引入vue.css然后再引入自定义主题css //cdn.jsdelivr.net/gh/用户名/仓库名@版本/文件夹/文件名 -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/liawnliu/docsify-theme-liawn@v1.0.0/dist/theme-liawn.min.css"
    type="text/css" />
  <!-- 网站页签图标 -->
  <link rel="shortcut icon" href="public/image/favicon.ico" type="image/x-icon" />
</head>

<body>
  <div id="app">亲，正在加载中，请稍等~</div>
  <script>
    window.$docsify = {
      name: 'Liawn\'s blog', // 左侧侧边栏最顶部的文字
      repo: '', // 右上角的挂件（跳转链接）
      el: '#app', // 欢迎页
      coverpage: true, // 开启封面功能
      loadSidebar: true, // 开启侧边栏功能
      loadNavbar: true, // 开启导航栏功能
      // 解决控制台404问题
      alias: {
        /* 使用自定义的侧边栏 */
        '/_sidebar.md': '/book-web/_sidebar.md',
        '/book-web/.*/_sidebar.md': '/book-web/_sidebar.md',
        '/book-sketches/.*/_sidebar.md': '/book-sketches/_sidebar.md',
        /* 使用自定义的侧边栏 */
        '/.*/_navbar.md': '/_navbar.md'
      },
      relativePath: true, // 启用相对路径
      topMargin: 55, // 让你的内容页在滚动到指定的锚点时，距离页面顶部有一定空间，一般顶部有导航栏就会用到这个
      mergeNavbar: true,  // 小屏设备下合并导航栏到侧边栏
      auto2top: true, // 切换页面后是否自动跳转到页面顶部
      // search.min.js插件
      search: {
        maxAge: 86400000, // 过期时间，单位毫秒，默认一天
        paths: 'auto', // or 'auto'
        placeholder: '搜索',
        noData: '没有搜索到相应的结果',
        // 搜索标题的最大层级, 1 - 6
        depth: 6,
      },
      // docsify-tabs插件
      tabs: {
        persist: true,
        sync: true,
        theme: 'material',
        tabComments: true,
        tabHeadings: true
      },
      // 其他插件
      plugins: [],
    }
    // 离线也能查看
    if (typeof navigator.serviceWorker !== 'undefined') {
      navigator.serviceWorker.register('sw.js')
    }
  </script>
  <!-- Docsify v4 -->
  <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
  <!-- 自定义主题 //cdn.jsdelivr.net/gh/用户名/仓库名@版本/文件夹/文件名 -->
  <script src="//cdn.jsdelivr.net/gh/liawnliu/docsify-theme-liawn@v1.0.0/dist/theme-liawn.min.js"></script>
  <!-- 全文搜索 -->
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
  <!-- 代码复制 -->
  <script src="//cdn.jsdelivr.net/npm/docsify-copy-code/dist/docsify-copy-code.min.js"></script>
  <!-- 底部分页 -->
  <script src="//cdn.jsdelivr.net/npm/docsify-pagination/dist/docsify-pagination.min.js"></script>
  <!-- 标签展示 -->
  <script src="//cdn.jsdelivr.net/npm/docsify-tabs@1"></script>
</body>

</html>
```

有几个注意点：

- 必须要先引入vue.css，再引入theme-liawn.min.css，因为vue.css才是主要的样式，theme-liawn.min.css只是覆盖了某些样式并新增了一些样式。
- 我们开启了封面、侧边栏、导航栏功能，如果你自己的文档项目没有开这些功能，我们的theme-liawn主题的js运行会报错的（但关闭了右上角的挂件repo，暂时没有做repo的适配）。公共资源要放在docs/public里。最好是在docs/public/image里准备一个bgPhone.png，用于移动端封面展示。
- 因为我们将搜索栏、博客名、导航栏放到了顶部的header里，并且固定是55px，所以配置中加了`topMargin: 55`。移动端的header展示为了更友好，我们设置了`mergeNavbar: true`。
- 左侧侧边栏的配置就不要变动，原因是我们将当前展示的文章标题抽到了**右侧侧边栏**了，原先是出现在左侧的。

按照以上的项目结构和一些配置，**基本能正常使用theme-liawn了**。
