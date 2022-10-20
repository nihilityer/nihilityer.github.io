import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as i,e as s}from"./app.4b8e95e2.js";const d={},l=s(`<p><em>\u7528\u4E8E\u4E34\u65F6\u6D4B\u8BD5\uFF01</em> vscode\u4F7F\u7528alt+shift+f\u6574\u7406\u4EE3\u7801\u3002 shift+\uFF01\u53EF\u4EE5\u6309\u7167\u6A21\u677F\u751F\u6210\u5185\u5BB9\u3002</p><p>promise\u5C01\u88C5\u5F02\u6B65\u64CD\u4F5C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>function get(url, data) {
    return new Promise((resolve, reject) =&gt; {
        $.ajax({
            url: url,
            data: data,
            success: function (data) {
                resolve(data);
            },
            error: function (err) {
                reject(err)
            }
        })
    })
}

get(&quot;mock/user.json&quot;)
    .then((data) =&gt; {
        console.log(&quot;test&quot;, data)
        return get(\`mock/user_sorse_\${data.id}.json\`);
    })
    .then((data) =&gt; {
        console.log(&quot;test&quot;, data)
        return get(\`mock/user_sorse_\${data.id}.json\`);
    })
    .then((data) =&gt; {
        console.log(&quot;test&quot;, data)
    })
    .catch((err) =&gt; {
        console.log(&quot;err&quot;, err)
    })
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),t=[l];function r(a,c){return n(),i("div",null,t)}const u=e(d,[["render",r],["__file","tools.html.vue"]]);export{u as default};
