# config与data的数据结构-对话记录

配置就是配置 别和数据类混到一起 

配置只有你需要的时候才会去加载获取 

如果是配置的话你通过 cvs/json/xml 之类的配置好 然后通过自己写的工具程程一份专用的读取代码 然后在需要的时候加载他并缓存起来 

例如这种 所有需要参数都直接生成出来：

![96ba7a08bb11f885f2b4aea301e78aed_720.png](config%E4%B8%8Edata%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-%E5%AF%B9%E8%AF%9D%E8%AE%B0%E5%BD%95/96ba7a08bb11f885f2b4aea301e78aed_720.png)

然后通过这种统一的配置管理类来管理加载/卸载：

![bc4e3c1c7522a4af866f63cb81da9d51_720.png](config%E4%B8%8Edata%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-%E5%AF%B9%E8%AF%9D%E8%AE%B0%E5%BD%95/bc4e3c1c7522a4af866f63cb81da9d51_720.png)

然后每个配置生成的调用类都实现统一的 get 方法来获取你所需要的配置 

保证需要什么加载什么  减少不必要的缓存 

就例如这种我需要这个 id 的配置 直接通过对应的 id 获取在获取的同时直接缓存起来 下次在用就不用再去找：

![474548274af61d2240d58afa50ee8f6b.png](config%E4%B8%8Edata%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-%E5%AF%B9%E8%AF%9D%E8%AE%B0%E5%BD%95/474548274af61d2240d58afa50ee8f6b.png)

你的意思是应该吧配置读取并且放入缓存中？

你需要的才缓存 不是缓存所有 

然后下次使用就去缓存里面找是吧

对 ，不必每次都加载文件 

例如你读取了 id1001 的配置下次再找配置要的时候就直接给 不用继续读

你如果配置不多全部加载也无所谓    这个主要是为了节省初始化的时间 

还有就是 太多同时加载的类会占用很多内存 该省还是省