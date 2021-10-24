import themeLiawnConfig from './config';
import '../css/reset';
import '../css/init';

/* 初始化 */
const init = (hook, vm) => {
    // 合并主题配置，以$docsify.themeLiawn为主
    $docsify.themeLiawn = Object.assign(themeLiawnConfig, $docsify.themeLiawn || {});
    // 生成:root里的变量，供css使用
    for (const [key, value] of Object.entries($docsify.themeLiawn.basicsStyle)) {
        document.documentElement.style.setProperty('--' + key, value);
    }
    // 读取浏览器是什么主题
    $docsify.themeLiawn.basicsStyle.defaultTheme =
        window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
    // 非根目录的页面body是有sticky的
    hook.doneEach(() => {
        const body = Docsify.dom.find("body");
        if (vm.route.path !== '/' && !body.classList.contains('sticky')) {
            body.classList.add('sticky');
        }
    });
};
export default init;
