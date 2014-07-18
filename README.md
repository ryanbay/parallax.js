parallax.js
===========

目前移动端端涌现了很多视差滚动效果的案例，多应用于企业招聘、活动邀请以及产品宣传中，形式新颖，让人印象深刻。不过细细发现，就能发现虽然细节都有小创新，但是实现原理都是殊途同归的。基于此，为满足快速调用实现提升效率的目的，开发了这个移动端的视察滚动插件。

![Up邀请函](https://raw.githubusercontent.com/hahnzhu/parallax.js/master/assets/gif/invitation.gif)&nbsp;&nbsp;&nbsp;![Tesla](https://raw.githubusercontent.com/hahnzhu/parallax.js/master/assets/gif/tesla.gif)

我把视差滚动效果归于两类，第一类是基于鼠标滚轮的逐帧动画，第二类是分屏动画（即一屏一屏翻阅）。前者动画细节丰富，互动性强，但是容易让用户感觉疲劳失去耐性，后者分屏翻阅可以快速浏览内容，实现起来也相对简单。考虑到移动端屏幕尺寸以及操作媒介（手指）不同，分屏动画是最理想的，此插件也仅专注于此。



### 使用

HTML（这里的每个标签和每个类都是必须的）
```
<div class="wrapper">
	<div class="pages">	<!-- 分屏的 wrapper -->
		
		<section>	<!-- 第一屏 -->
		   	// whatever you want.
		</section>
	
		<section>	<!-- 第二屏 -->
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
<script>
  $('.pages').parallax();
</script>
```

### 定制
```
<script>
// 可通过以下方式进行定制(以下都是默认配置)
$.fn.parallax.defaults = {
	direction: 'vertical',	// 滚动方向，horizontal
	swipeAnim: 'default',	// 分屏动画，cover、victoria
	drag:      true,	// 是否具有拖拽效果
	loading:   false,	// 是否需要加载页
	indicator: false,	// 是否需要指示导航
	arrow:     false	// 是否需要指引箭头

}
// 注意上述写法会替换原来的 defaults 对象，最好写全，或者这么写：
// $.fn.parallax.defaults.speed = 5000;

$('.pages').parallax();

</script>

Or

<script>
$('.pages').parallax({
	direction: 'vertical',
	swipeAnim: 'default',
	drag:      true,
	loading:   false,
	indicator: false,
	arrow:     false
});

</script>
```

### 接口

```
<div class="wrapper">

	// 初始化后添加设置或默认的 direction、swipeAnim 以及
	// 一个动态的方向类 forward(向前翻) backward(向后翻)
	<div class="pages  vertical/horizontal  default/cover/victoria  forward/backward(翻页的过程才会添加)">
		
		// 为 page 添加 data-id
		<section data-id="1">
			...
		</section>
		
		// 当前 page 会自动添加 current 类
		<section data-id="2" class="current">
			...
		</section>
	</div>
</div>
		
```

## Log

* v 0.1
	* 提供三种翻页动画
	* 提供横竖屏翻页操作
	* 解决 iOS 和 Android 的兼容问题



## License

Parallax.js is released under the [the MIT license](LICENSE).
