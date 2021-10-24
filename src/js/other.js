
import '../css/main';
import '../css/mobile';

/* 其他功能 */
const other = (hook, vm) => {
    // 解析<details>标签里的<code>
    analysisDetailsCode(hook, vm);
};
/* markdown里直接使用<details>标签，并且在<details>里使用<pre><code>。但是docsify内置的Prism并不会解析<code>。
   所以这里手动调用Prism来解析<code>。使用<pre><code>会出现样式问题，<pre><code>在<details>里是进行了缩进的，
   <code>的innerText也带上了这个多余的缩进；然后代码文本是新起一行，会导致首行和尾行都会空出一行。问题暂时改不了 */
const analysisDetailsCode = (hook, vm) => {
    if (!$docsify.themeLiawn.analysisDetailsCode) return;
    hook.doneEach(() => {
        const code = Docsify.dom.findAll(".markdown-section details pre[data-lang] code");
        code && code.forEach(item => {
            // 使用data-lang="xxx"的原因是，copy按钮是依赖这个属性，我们也一样就依赖它吧
            const lang = item.parentNode.getAttribute('data-lang');
            // 暂时对innerText的问题不做处理，这是<pre><code>中的pre“保留缩进换行”特性导致的问题
            item.innerHTML = Prism.highlight(item.innerText, Prism.languages[lang], lang);
        });
    });
}
export default other;
