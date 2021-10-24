/**
    除了本js的themeLiawnConfig配置以外，$docsify里也要配置如下信息，否则本主题会报错
    coverpage: true,    // 开启封面功能
    loadSidebar: true,  // 开启侧边栏功能
    loadNavbar: true,   // 开启导航栏功能
    relativePath: true, // 启用相对路径
    topMargin: 55,      // 让你的内容页在滚动到指定的锚点时，距离页面顶部有一定空间
    mergeNavbar: true,  // 小屏设备下合并导航栏到侧边栏
    auto2top: true,     // 切换页面后是否自动跳转到页面顶部
    onlyCover: true,    // 让封面单独出现，封面滑动在移动端效果并不好，所有固定onlyCover为true
*/

// 主题默认配置
const themeLiawnConfig = {
    // 基本样式
    basicsStyle: {
        defaultTheme: 'light',                              // 默认什么背景风格
        basicsFont: "Segoe UI, Microsoft YaHei",            // 整个网站的字体
        codeFont: 'Consolas, Courier New, monospace',       // 代码块字体
        bodyFontSize: '16px',                               // 文章字体大小
        sidebarWidth: '250px',                              // 左侧侧边栏宽度
        appNavHeight: '55px',                               // PC端导航栏高度
        fTocWidth: '250px',                                 // 右侧侧边栏宽度
        coverMaskOpacity: '.1',                             // 封面遮罩的透明度
    },
    // 白天黑夜模式切换
    switchStyle: {
        series: ['#42b983', '#42b983'],                     // 风格颜色：按钮、超链接、显目标记等
        background: ['#fdfdfd', '#1c1c1c'],                 // 主题大背景颜色
        borderColor: ['#eeeeee', '#333'],                   // 区域边框颜色
        textColor: ['#34495e', '#9a9a9a'],                  // 文章文字颜色
        strongTextColor: ['#34495e', '#5983af'],            // 加粗文字颜色
        codeBg: ['#f8f8f8', '#262626'],                     // 文章中``的背景颜色
        codeAreaBg: ['#272727', '#262626'],                 // 代码块的背景颜色
        codeTextColor: ['#3ac1ff', '#c2c3c3'],              // 代码块文字颜色
        codeHighlightColor: ['#d22778', '#d22778'],         // 代码块高亮显示区域
        sidebarTextColor: ['#505d6b', '#888'],              // 左侧侧边栏文字颜色
        sidebarBg: ['#f7f7f7', '#212121'],                  // 左侧侧边栏背景色
        fTocBg: ['#f8f8f8', '#212121'],                     // 右侧侧边栏背景色
        fTocActiveBg: ['#d2f7e6', '#464646'],               // 左侧侧边栏目录章节被选中时颜色
        hrColor: ['#eeeeee', '#a9a9a9'],                    // 文章中hr横线的颜色
        searchBg: ['#eeeeee', '#454545'],                   // 搜索框背景色
        searchFocusBg: ['#fff', '#888888'],                 // 搜索框获取焦点时的颜色
        searchResultBg: ['#ebebeb', '#2E2E2E'],             // 搜索结果面板背景色
    },
    // 右侧侧边栏
    floatingToc: {
        open: true,                                         // 是否开启右侧浮动目录功能
        scope: '.markdown-section',                         // 文章显示区域
        headings: 6,                                        // 要设置几级标题
    },
    // 是否需要解析md里的<details>里的<code>
    analysisDetailsCode: true,
    // 切换按钮的svg图片
    switchImage: {
        light: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
            fill="#ffffff" stroke="#34495e" stroke-width="2" stroke-linecap="round" 
            stroke-linejoin="round" class="feather feather-moon">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
        dark: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
            fill="#ffffff" stroke="#ffffff" stroke-width="2" stroke-linecap="round" 
            stroke-linejoin="round" class="feather feather-sun">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    },
};
export default themeLiawnConfig;
