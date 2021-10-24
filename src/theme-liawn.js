import init from './js/init';
import header from './js/header';
import sidebarLeft from './js/sidebar-left';
import sidebarRight from './js/sidebar-right';
import other from './js/other';

/* 自定义主题 index.js入口 */
const themeLiawn = (hook, vm) => {
    // 初始化
    init(hook, vm);
    // 头部header
    header(hook, vm);
    // 左侧侧边栏折叠功能（整个博客项目的目录）
    sidebarLeft(hook, vm);
    // 右侧侧边栏目录（当前文章的目录）
    sidebarRight(hook, vm);
    // 其他内容（解析<details>里的<code>）
    other(hook, vm);
}
// 将插件添加到docsify插件列表里，放在最后面
$docsify.plugins = [].concat($docsify.plugins, themeLiawn);
