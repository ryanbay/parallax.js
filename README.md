parallax.js
===========

目前移动端端涌现了很多视差滚动效果的案例，多应用于企业招聘、活动邀请以及产品宣传中，形式新颖，让人印象深刻。不过细细发现，就能发现虽然细节都有小创新，但是实现原理都是殊途同归的。基于此，为满足快速调用实现提升效率的目的，开发了这个移动端的视察滚动插件。

![Up邀请函](https://raw.githubusercontent.com/hahnzhu/parallax.js/master/assets/gif/invitation.gif)&nbsp;&nbsp;&nbsp;![Tesla](https://raw.githubusercontent.com/hahnzhu/parallax.js/master/assets/gif/tesla.gif)

我把视差滚动效果归于两类，第一类是基于鼠标滚轮的逐帧动画，第二类是分屏动画（即一屏一屏翻阅）。前者动画细节丰富，互动性强，但是容易让用户感觉疲劳失去耐性，后者分屏翻阅可以快速浏览内容，实现起来也相对简单。考虑到移动端屏幕尺寸以及操作媒介（手指）不同，分屏动画是最理想的，插件也仅专注于此。



### 使用

HTML（这里的每个标签和每个类都是必须的）
```
<div class="wrapper">	<!-- 最外层 DIV -->
	<div class="pages">	<!-- 分屏的 wrapper -->
		
		<section>	<!-- 每一屏 -->
		   	// whatever you want.
		</section>
	
		<section>	<!-- 每二屏 -->
			// whatever you want.
		</section>
	
		<section>	<!-- 第三屏 -->
			// whatever you want.
		</section>
	</div>
</div>
```

CSS 引用：
```
<style rel="stylesheet" href="{your path}/parallax.css"></style>
```

JS 引用：
```
<script src="{your path}/zepto.min.js"></script>
<script src="{your path}/parallax.js"></script>
```

### 定制
```
$.fn.parallax.defaults = {
	direction: portrait，horizontal
	
	swipeAnim: 'default', 	// 分屏动画，cover、victoria
	drag:      false,  	// 是否具有拖拽效果
	loading:   false,  	// 是否需要加载页
	indicator: false,  	// 是否需要指示导航
	arrow:     false,  	// 是否需要指引箭头
	music:     false,  	// 是否需要音乐播放
	musicUrl:  '',     	// 音乐链接
	speed:     300ms,  	// 分屏动画时长(drag:true时不生效)
	timingfunc:'ease' 	// 分屏动画过度效果(drag:true时不生效)
}

```






### MIT license

Copyright (c) 2014 turing <[o.u.turing@gmail.com](mailto:o.u.turing@gmail.com)>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
