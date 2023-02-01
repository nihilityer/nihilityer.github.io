import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as s,e as a}from"./app.05bf4238.js";const i={},t=a(`<h2 id="spark-submit\u4F7F\u7528\u7EC6\u8282" tabindex="-1"><a class="header-anchor" href="#spark-submit\u4F7F\u7528\u7EC6\u8282" aria-hidden="true">#</a> Spark-Submit\u4F7F\u7528\u7EC6\u8282</h2><p>\u4F7F\u7528spark-submit\u7684\u547D\u4EE4\uFF1A</p><p>\u6570\u636E\u52A0\u8F7D\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>spark-submit <span class="token punctuation">\\</span>
--deploy-mode client <span class="token punctuation">\\</span>
--driver-memory 2g <span class="token punctuation">\\</span>
--executor-memory 1g <span class="token punctuation">\\</span>
--executor-cores <span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--queue</span> thequeue <span class="token punctuation">\\</span>
<span class="token parameter variable">--class</span> me.nihilityer.dataLoad.DataLoadArrangement <span class="token punctuation">\\</span>
DataLoadModule.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7528\u6237\u63A8\u8350</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>spark-submit <span class="token punctuation">\\</span>
--deploy-mode client <span class="token punctuation">\\</span>
--driver-memory 2g <span class="token punctuation">\\</span>
--executor-memory 1g <span class="token punctuation">\\</span>
--executor-cores <span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--queue</span> thequeue <span class="token punctuation">\\</span>
<span class="token parameter variable">--class</span> me.nihilityer.recommend.MlALSRecommend <span class="token punctuation">\\</span>
ALS_RecommendModule.jar user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u97F3\u4E50\u76F8\u5173\u63A8\u8350</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>spark-submit <span class="token punctuation">\\</span>
--deploy-mode client <span class="token punctuation">\\</span>
--driver-memory 2g <span class="token punctuation">\\</span>
--executor-memory 1g <span class="token punctuation">\\</span>
--executor-cores <span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--queue</span> thequeue <span class="token punctuation">\\</span>
<span class="token parameter variable">--class</span> me.nihilityer.recommend.MlALSRecommend <span class="token punctuation">\\</span>
ALS_RecommendModule.jar music
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),l=[t];function c(r,u){return e(),s("div",null,l)}const d=n(i,[["render",c],["__file","28.html.vue"]]);export{d as default};
