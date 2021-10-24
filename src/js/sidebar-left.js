import '../css/sidebar-left';

/* 左侧侧边栏折叠功能（整个博客项目的目录） */
const sidebarLeft = (hook, vm) => {
    // 准备一个状态存放容器
    let stateMap = JSON.parse(localStorage.getItem('chapterFold'));
    if (!stateMap) {
        stateMap = {};
        localStorage.setItem('chapterFold', JSON.stringify(stateMap));
    }
    // 虽然我们将sidebar的内容设置成静态的了，但是docsify在路由变化时每次都重新渲染了
    hook.doneEach(function () {
        const sidebarNav = Docsify.dom.find(".sidebar-nav");
        if (!sidebarNav) return;
        let ulEl = Docsify.dom.findAll(sidebarNav, "ul li a");
        ulEl.forEach((item, index) => {
            const parentNode = item.parentNode;
            const nextEl = item.nextElementSibling;
            // 只有能展示/折叠的才设置chapterFold功能
            if (item.nodeName === 'A' && nextEl && nextEl.nodeName === 'UL') {
                // 要折叠的话，li里的ul必须设置class="app-sub-sidebar"，这是docsify内部样式
                Docsify.dom.toggleClass(nextEl, "add", "app-sub-sidebar");
                // 使用<a>标签的href作为key
                const key = item.href;
                // 每次路由改变我们就去读取stateMap，看当前这个li是展示还是折叠
                let state = stateMap[key];
                // 如果读取不到，证明是第一次进入博客，不是路由跳转，所以得手动初始化为hidden，也就是默认折叠
                if (!state) {
                    state = "hidden";
                    // 手动设置还要保存到容器里
                    stateMap[key] = "hidden";
                    localStorage.setItem('chapterFold', JSON.stringify(stateMap));
                    // 章节名前面的箭头（折叠图标）
                    setBeforeIcon(parentNode, 'hidden');
                }
                // 要折叠的话，li里必须设置class="collapse"，这是docsify内部样式
                Docsify.dom.toggleClass(parentNode, state === "hidden" ? "add" : "remove", "collapse");
                // 章节名前面的箭头（折叠图标）
                setBeforeIcon(parentNode, state);
                // 以前是折叠，那现在就展示
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (e.target.nodeName !== 'A') return;
                    const nowKey = e.target.href;
                    // 先读取以前的状态
                    const nowState = stateMap[nowKey];
                    // 状态取反
                    const afterState = nowState === "show" ? "hidden" : "show";
                    // 章节名前面的箭头（折叠图标）
                    setBeforeIcon(parentNode, afterState);
                    // 保存新状态到容器里
                    stateMap[nowKey] = afterState;
                    localStorage.setItem('chapterFold', JSON.stringify(stateMap));
                    // 设置li的class
                    Docsify.dom.toggleClass(e.target.parentNode,
                        afterState === "hidden" ? "add" : "remove", "collapse");
                });
            }
        });
    });
};
// 设置折叠图标
const setBeforeIcon = (el, state) => {
    // 25B6 25BC 1433 142F 1405 1401
    const value = state === 'hidden' ? '\u{1433}' : '\u{142F}';
    el.setAttribute('data-content-before', value);
}
export default sidebarLeft;
