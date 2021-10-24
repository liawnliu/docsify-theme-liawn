import '../css/header';

/* 生成公共header */
const header = (hook, vm) => {
    makeHeader(hook, vm);
    moveSearch(hook, vm);
    createTheme(hook, vm);
}
/* 自定义头部header */
const makeHeader = (hook, vm) => {
    hook.mounted(() => {
        // 导航栏修改
        const appNav = Docsify.dom.find(".app-nav");
        appNav && appNav.remove();
        // 侧边栏顶部的名字
        const blogName = Docsify.dom.find(".app-name");
        blogName && blogName.remove();
        // 右上角Git按钮
        const gitCorne = Docsify.dom.find(".github-corner");
        gitCorne && gitCorne.remove();
        // 构造一个头部header，将appNav和blogName放入header
        const header = Docsify.dom.create("header");
        blogName && Docsify.dom.appendTo(header, blogName);
        appNav && Docsify.dom.appendTo(header, appNav);
        gitCorne && Docsify.dom.appendTo(header, gitCorne);
        // 放在main里的最前面
        const main = Docsify.dom.find("main");
        Docsify.dom.before(main, header);
    });
}
// 移动搜索框
const moveSearch = (hook, vm) => {
    hook.mounted(() => {
        const search = Docsify.dom.find('.search');
        if (!search) return;
        search.remove();
        const header = Docsify.dom.find("header");
        header.insertBefore(search, header.children[1]);
        search.classList.add('theme-liawn-search');
        // 点击了就隐藏
        const searchResult = Docsify.dom.find('.results-panel');
        const input = Docsify.dom.find('.search input');
        const clearBtn = Docsify.dom.find('.clear-button');
        searchResult.addEventListener('click', () => {
            searchResult.classList.remove('show');
            clearBtn.classList.remove('show');
            input.value = '';
        })
    })
}
/* 主题切换功能 */
const createTheme = (hook, vm) => {
    hook.mounted(() => {
        // 主题切换按钮
        const switchBtn = Docsify.dom.create("div", "");
        Docsify.dom.toggleClass(switchBtn, 'add', 'switch-btn')
        const header = Docsify.dom.find("header");
        const gitCorne = Docsify.dom.find(".github-corner");
        header.insertBefore(switchBtn, gitCorne);
        setTheme($docsify.themeLiawn.basicsStyle.defaultTheme);
        // 点击取反
        switchBtn.addEventListener('click', () => {
            let theme = $docsify.themeLiawn.basicsStyle.defaultTheme;
            theme = theme === 'light' ? 'dark' : 'light';
            setTheme(theme);
            $docsify.themeLiawn.basicsStyle.defaultTheme = theme;
        });
    })
}
/* 设置主题 */
const setTheme = (theme) => {
    // 主题相关颜色的更改
    for (const [key, value] of Object.entries($docsify.themeLiawn.switchStyle)) {
        const val = theme === 'light' ? value[0] : value[1];
        document.documentElement.style.setProperty('--' + key, val);
    }
    // 切换按钮状态更改
    const switchBtn = Docsify.dom.find('.switch-btn');
    switchBtn.innerHTML = $docsify.themeLiawn.switchImage[theme];
}
export default header;
