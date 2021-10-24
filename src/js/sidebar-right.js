import '../css/sidebar-right';

/* 右侧侧边栏目录（当前文章的目录） */
const sidebarRight = (hook, vm) => {
    // 功能没开启就return
    if (!$docsify.themeLiawn.floatingToc.open) return;
    hook.mounted(() => {
        const main = Docsify.dom.find('main');
        if (!main) return;
        // 准备一个目录容器
        const floatingToc = Docsify.dom.create('aside', '')
        Docsify.dom.toggleClass(floatingToc, 'add', 'aside-float')
        Docsify.dom.appendTo(main, floatingToc);
        // 准备一个目录按钮
        const tocButton = Docsify.dom.create('button',
            `<div class="sidebar-toggle-button"><span></span>
            <span></span><span></span></div>`);
        tocButton.classList.add('sidebar-toggle');
        tocButton.classList.add('toc-btn');
        Docsify.dom.appendTo(main, tocButton);
        const body = Docsify.dom.find('body');
        // 点击tocButton切换状态
        tocButton.addEventListener('click', (e) => {
            e.stopPropagation();
            // 有就去掉，没有就加上
            body.classList.toggle('close-float-toc')
        });
        // 移动端，点击body，如果打开了就关闭（移动端状态是反的)
        // 目前docsify设计sidebar就是这样的，所以我们的floatingToc也跟着这样
        Docsify.util.isMobile && body.addEventListener('click', () => {
            body.classList.contains('close-float-toc') && body.classList.toggle('close-float-toc')
        });
    })
    hook.doneEach(() => {
        const floatingToc = Docsify.dom.find('.aside-float')
        if (!floatingToc) return;
        floatingToc.innerHTML = pageToC();
        document.addEventListener('scroll', scrollHand)
        scrollHand(); // 第一次要手动调一次
        // 由于我们使用了右侧目录，文章自带目录比较多余，另一个原因是自带目录规则与docsify暂时不兼容
        const scope = $docsify.themeLiawn.floatingToc.scope;
        const tocUl = document.querySelector(scope + ' h1+ul');
        tocUl && tocUl.remove();
    })
}
/* 从正文中获取所有有效标题 */
const getHeaders = () => {
    const length = $docsify.themeLiawn.floatingToc.headings; // 读取配置
    const scope = $docsify.themeLiawn.floatingToc.scope;
    let headerStr = 'h1';
    for (let i = 2; i <= length; i++) {// 生成Selector
        headerStr = `${headerStr}, h${i}`;
    }
    // 在文章区域options.scope里搜索所需等级的标题
    let headers = document.querySelectorAll(`${scope} ${headerStr}`);
    return [].filter.call(headers, h => h.id); // 只留下有id的标题
}
/* 拼装标题 */
const pageToC = () => {
    let toc = ['<div class="page-toc">']
    const list = [], headers = getHeaders();
    if (!headers.length) return '';
    headers.forEach(header => {
        const level = Number(header.tagName.substring(1));
        list.push(`<div class='lv${level}'>${header.innerHTML}</div>`);
    })
    toc = toc.concat(list, '</div>');
    return toc.join('');
}
/* 文章内容滚动，让浮动目录进行联动 */
const scrollHand = () => {
    const headers = getHeaders();
    let goal = 0; // 目标，当前滚动到哪个章节了
    for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        // 返回元素的大小及其相对于视口的位置
        const rect = header.getBoundingClientRect();
        // 刚好滚动到顶部
        if (rect.top === 85) { // 55是header的高度，30是markdown-section的paddingTop值
            goal = i
            break;
        } else if (rect.top > 85) { // 还没滚到顶部，那么我们取它前一个
            goal = i - 1;
            break;
        }
        // 最后一个比较特殊
        if (i === headers.length - 1) goal = i;
    }
    const tocList = document.querySelectorAll('.page-toc>div');
    // 联动样式
    tocList.forEach((tocDiv, index) => {
        if (index === goal) {
            tocDiv.classList.add('active')
        } else {
            tocDiv.classList.remove('active')
        }
    });
}
export default sidebarRight;
