parallax.js
===========

![Up邀请函](https://raw.githubusercontent.com/hahnzhu/parallax.js/master/assets/gif/invitation.gif)&nbsp;&nbsp;&nbsp;![Tesla](https://raw.githubusercontent.com/hahnzhu/parallax.js/master/assets/gif/tesla.gif)

目前移动端端涌现了很多视差滚动效果的案例，多应用于企业招聘、活动邀请以及产品宣传中，形式新颖，让人印象深刻。不过细细发现，就能发现虽然细节都有小创新，但是实现原理都是殊途同归的。基于此，为满足快速调用实现提升效率的目的，开发了这个移动端的视察滚动插件。

我把视差滚动效果归于两类，第一类是基于鼠标滚轮的逐帧动画，第二类是分屏动画（即一屏一屏翻阅）。前者动画细节丰富，互动性强，但是容易让用户感觉疲劳失去耐性，后者分屏翻阅可以快速浏览内容，实现起来也相对简单。考虑到移动端屏幕尺寸以及操作媒介（手指）不同，分屏动画是最理想的，插件也仅专注于此。



### 1、使用

HTML（这里的每个标签和每个类都是必须的）
```
<div class="wrapper">
	<div class="pages">
		<!-- 每一屏 -->
		<section>
		   // content.
		</section>
	
		<!-- 每二屏 -->
		<section>
		   // content.
		</section>
	
		<!-- 第三屏 -->
		<section>
		   // content.
		</section>
	</div>
</div>
```

JS 引用：
```
<script src="{your path}/zepto.min.js"></script>
<script src="{your path}/parallax.js"></script>
```
