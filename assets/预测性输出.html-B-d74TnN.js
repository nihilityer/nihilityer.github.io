import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-C2CTEMVF.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="预测性输出" tabindex="-1"><a class="header-anchor" href="#预测性输出"><span>预测性输出</span></a></h1><p><strong>在调用 API 的时候，附上一个“预测输出”， AI 就会基于这个进行修改，而不是从头生成</strong></p><p>原文：<a href="https://mp.weixin.qq.com/s?__biz=MzkzNDQxOTU2MQ==&amp;mid=2247493590&amp;idx=1&amp;sn=69a5f845766c85cac20f67e40a6095b4&amp;chksm=c385793fef7deedd5f9b78d2c9b9e59aa3117b7a9eee3bfa795e5f0e943b11418becf4a88ffc&amp;mpshare=1&amp;scene=23&amp;srcid=1208XVBetHCFyMpfrcsiEyIj&amp;sharer_shareinfo=0a65793aa33979966a814c1b412c08cd&amp;sharer_shareinfo_first=b32152277c1293c87297789704d2b143#rd" target="_blank" rel="noopener noreferrer">预测性输出</a></p><p>使用 Predicted Outputs 的时候，也不会特别复杂，参数的最后 prediction 字段就行了，比如下面这个</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>from openai import OpenAI</span></span>
<span class="line"><span></span></span>
<span class="line"><span>original_code = &quot;&quot;&quot;</span></span>
<span class="line"><span># ... (你的电商项目其他代码) ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class 订单:</span></span>
<span class="line"><span>    def __init__(self, 订单编号, 用户名, 商品列表, 总价, 下单时间):</span></span>
<span class="line"><span>        self.订单编号 = 订单编号</span></span>
<span class="line"><span>        self.用户名 = 用户名</span></span>
<span class="line"><span>        self.商品列表 = 商品列表</span></span>
<span class="line"><span>        self.总价 = 总价</span></span>
<span class="line"><span>        self.下单时间 = 下单时间</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def 打印订单详情(self):</span></span>
<span class="line"><span>        print(f&quot;订单编号：{self.订单编号}&quot;)</span></span>
<span class="line"><span>        print(f&quot;用户名：{self.用户名}&quot;)</span></span>
<span class="line"><span>        print(&quot;商品列表：&quot;)</span></span>
<span class="line"><span>        for 商品 in self.商品列表:</span></span>
<span class="line"><span>            print(f&quot;  - {商品.名称} x {商品.数量}，单价：{商品.价格}&quot;)</span></span>
<span class="line"><span>        print(f&quot;总价：{self.总价}&quot;)</span></span>
<span class="line"><span>        print(f&quot;下单时间：{self.下单时间}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ... (你的电商项目其他代码, 上百处用到了&#39;用户名&#39;) ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def 生成订单报表(订单列表):</span></span>
<span class="line"><span>    for 订单 in 订单列表:</span></span>
<span class="line"><span>        print(f&quot;{订单.订单编号}, {订单.用户名}, {订单.总价}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ... (你的电商项目其他代码) ...</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>refactor_prompt = &quot;将代码中所有用到 &#39;用户名&#39; 的地方，都改成 &#39;用户ID&#39;，并添加一个&#39;优惠信息&#39;字段。&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>client = OpenAI()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>completion = client.chat.completions.create(</span></span>
<span class="line"><span>    model=&quot;gpt-4o&quot;,</span></span>
<span class="line"><span>    messages=[</span></span>
<span class="line"><span>        {&quot;role&quot;: &quot;user&quot;, &quot;content&quot;: refactor_prompt},</span></span>
<span class="line"><span>        {&quot;role&quot;: &quot;user&quot;, &quot;content&quot;: original_code},</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    **prediction={&quot;type&quot;: &quot;content&quot;, &quot;content&quot;: original_code},# 使用原始代码作为预测**</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(completion.choices[0].message.content)</span></span>
<span class="line"><span>print(completion.usage)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就会获得这个，返回速度相当快：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>为了将代码中所有用到的“用户名”改为“用户ID”并添加一个“优惠信息”字段，你需要修改类定义和相关的方法。下面是相应的修改：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`python</span></span>
<span class="line"><span># ... (你的电商项目其他代码) ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class 订单:</span></span>
<span class="line"><span>    def __init__(self, 订单编号, 用户ID, 商品列表, 总价, 下单时间, 优惠信息=None):</span></span>
<span class="line"><span>        self.订单编号 = 订单编号</span></span>
<span class="line"><span>        self.用户ID = 用户ID</span></span>
<span class="line"><span>        self.商品列表 = 商品列表</span></span>
<span class="line"><span>        self.总价 = 总价</span></span>
<span class="line"><span>        self.下单时间 = 下单时间</span></span>
<span class="line"><span>        self.优惠信息 = 优惠信息</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def 打印订单详情(self):</span></span>
<span class="line"><span>        print(f&quot;订单编号：{self.订单编号}&quot;)</span></span>
<span class="line"><span>        print(f&quot;用户ID：{self.用户ID}&quot;)</span></span>
<span class="line"><span>        print(&quot;商品列表：&quot;)</span></span>
<span class="line"><span>        for 商品 in self.商品列表:</span></span>
<span class="line"><span>            print(f&quot;  - {商品.名称} x {商品.数量}，单价：{商品.价格}&quot;)</span></span>
<span class="line"><span>        print(f&quot;总价：{self.总价}&quot;)</span></span>
<span class="line"><span>        if self.优惠信息:</span></span>
<span class="line"><span>            print(f&quot;优惠信息：{self.优惠信息}&quot;)</span></span>
<span class="line"><span>        print(f&quot;下单时间：{self.下单时间}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ... (你的电商项目其他代码, 上百处用到了&#39;用户ID&#39;) ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def 生成订单报表(订单列表):</span></span>
<span class="line"><span>    for 订单 in 订单列表:</span></span>
<span class="line"><span>        print(f&quot;{订单.订单编号}, {订单.用户ID}, {订单.总价}, {订单.优惠信息}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ... (你的电商项目其他代码) ...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个修改版本中：</p><ul><li>将所有用到“用户名”的地方替换为“用户ID”。</li><li>在<code>订单</code>类的初始化方法中添加了一个可选的参数“优惠信息”。</li><li>更新了<code>打印订单详情</code>方法，以显示“优惠信息”。</li><li>更新了<code>生成订单报表</code>函数以包含“优惠信息”字段。</li></ul><p>请确保在整个代码中不同部分与“用户名”相关的逻辑都做了对应的更改。由于无法完全查看你的完整代码库，所以需要你根据此模板做同样的修改。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>查看返回参数，显示如下：</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>CompletionUsage(<br> completion_tokens=671,<br> prompt_tokens=313,<br> total_tokens=984,<br> completion_tokens_details=CompletionTokensDetails(accepted_prediction_tokens=26,<br> audio_tokens=0,<br> reasoning_tokens=0,<br> rejected_prediction_tokens=198),<br> prompt_tokens_details=PromptTokensDetails(audio_tokens=0, cached_tokens=0)<br> )</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,13)]))}const r=n(l,[["render",p],["__file","预测性输出.html.vue"]]),o=JSON.parse('{"path":"/reference/%E5%AE%9E%E7%94%A8AI%E8%AE%B0%E5%BD%95%E6%9C%AC/%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B/%E9%A2%84%E6%B5%8B%E6%80%A7%E8%BE%93%E5%87%BA.html","title":"预测性输出","lang":"zh-CN","frontmatter":{"description":"预测性输出 在调用 API 的时候，附上一个“预测输出”， AI 就会基于这个进行修改，而不是从头生成 原文：预测性输出 使用 Predicted Outputs 的时候，也不会特别复杂，参数的最后 prediction 字段就行了，比如下面这个 然后就会获得这个，返回速度相当快： 在这个修改版本中： 将所有用到“用户名”的地方替换为“用户ID”。 在...","head":[["meta",{"property":"og:url","content":"https://game-dev.nihilityer.top/reference/%E5%AE%9E%E7%94%A8AI%E8%AE%B0%E5%BD%95%E6%9C%AC/%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B/%E9%A2%84%E6%B5%8B%E6%80%A7%E8%BE%93%E5%87%BA.html"}],["meta",{"property":"og:site_name","content":"AI游戏开发参考"}],["meta",{"property":"og:title","content":"预测性输出"}],["meta",{"property":"og:description","content":"预测性输出 在调用 API 的时候，附上一个“预测输出”， AI 就会基于这个进行修改，而不是从头生成 原文：预测性输出 使用 Predicted Outputs 的时候，也不会特别复杂，参数的最后 prediction 字段就行了，比如下面这个 然后就会获得这个，返回速度相当快： 在这个修改版本中： 将所有用到“用户名”的地方替换为“用户ID”。 在..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-14T01:42:25.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-14T01:42:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"预测性输出\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-01-14T01:42:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"nihilityer\\",\\"url\\":\\"https://game-dev.nihilityer.top\\"}]}"]]},"headers":[],"git":{"createdTime":1734247850000,"updatedTime":1736818945000,"contributors":[{"name":"bot","username":"bot","email":"bot@mail.nihilityer.top","commits":1},{"name":"nihilityer","username":"nihilityer","email":"nihilityer@mail.nihilityer.top","commits":1}]},"readingTime":{"minutes":3.04,"words":913},"filePathRelative":"reference/实用AI记录本/语言模型/预测性输出.md","localizedDate":"2024年12月15日","autoDesc":true,"excerpt":"\\n<p><strong>在调用 API 的时候，附上一个“预测输出”， AI 就会基于这个进行修改，而不是从头生成</strong></p>\\n<p>原文：<a href=\\"https://mp.weixin.qq.com/s?__biz=MzkzNDQxOTU2MQ==&amp;mid=2247493590&amp;idx=1&amp;sn=69a5f845766c85cac20f67e40a6095b4&amp;chksm=c385793fef7deedd5f9b78d2c9b9e59aa3117b7a9eee3bfa795e5f0e943b11418becf4a88ffc&amp;mpshare=1&amp;scene=23&amp;srcid=1208XVBetHCFyMpfrcsiEyIj&amp;sharer_shareinfo=0a65793aa33979966a814c1b412c08cd&amp;sharer_shareinfo_first=b32152277c1293c87297789704d2b143#rd\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">预测性输出</a></p>"}');export{r as comp,o as data};
