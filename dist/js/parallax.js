if (typeof Zepto === 'undefined') { throw new Error('Parallax.js\'s JavaScript requires Zepto') }

!function($) {

    'use strict';

    var startPos,           // 开始触摸点(X/Y坐标)
        endPos,             // 结束触摸点(X/Y坐标)
        stage,              // 用于标识 onStart/onMove/onEnd 流程的第几阶段，解决 onEnd 重复调用
        offset,             // 偏移距离

        curPage = 0,        // page 当前页
        pageCount,          // page 数量
        pageWidth,          // page 宽度
        pageHeight,         // page 高度

        $pages,             // page 外部 wrapper
        $pageArr,           // page 列表

        options,            // 最终配置项

        touchDown = false,  // 手指已按下 (取消 transition 过度)
        movePrevent = true; // 阻止滑动 (动画过程中)



    // 定义实例方法 (jQuery Object Methods)
    // ==============================

    $.fn.parallax = function(opts) {
        options = $.extend({}, $.fn.parallax.defaults, opts);

        return this.each(function() {
            $pages = $(this);
            $pageArr = $pages.find('section');

            init();
        })
    }


    // 定义配置选项
    // ==============================

    $.fn.parallax.defaults = {

        direction: 'portrait',  // 滚动方向, "horizontal/portrait"
        swipeAnim: 'default',   // 滚动动画，"default/cover/victoria"
        drag: false,            // 是否有拖拽效果
        loading: false,         // 是否需要加载页
        indicator: false,       // 是否要有指示导航
        arrow: false,           // 是否要有箭头
        music: false,           // 是否需要音乐
        musicUrl: '',           // 音乐链接（网络/本地）
        // speed: 300,             // 设置动画速度(ms)
        // timingfunc: 'ease'      // 设置动画过度效果(仅限于非drag动画)

    };


    function init() {

        pageCount   = $pageArr.length;           // 获取 page 数量
        pageWidth   = $(window).width();         // 获取手机屏幕宽度
        pageHeight  = $(window).height();        // 获取手机屏幕高度

        for(var i=0; i<pageCount; i++){          // 批量添加 data-id
            $($pageArr[i]).attr('data-id', i+1);
        }

        if (!options.loading) {
            $($pageArr[curPage]).addClass('current');
        }

        $pages
            .addClass(options.direction)         // 添加 direction 类
            .addClass(options.swipeAnim);        // 添加 swipeAnim 类

        $pageArr.css({                           // 初始化 page 宽高
            'width': pageWidth + 'px',
            'height': pageHeight + 'px'
        });

        // 设置 page wrapper 宽高
        options.direction == 'horizontal' ?
            $pages.css('width', pageWidth * $pageArr.length) :
            $pages.css('height', pageHeight * $pageArr.length);

        // 重置 page 的宽高
        if (options.swipeAnim == 'cover' || options.swipeAnim == 'victoria') {
            $pages.css({
                'width': pageWidth,
                'height': pageHeight
            });
            $pageArr[0].style.display = 'block';     // 不能通过 css 来定义，不然在Android和iOS下会有小 bug
        }

        if (options.indicator || options.music || options.loading) {
            $('.wrapper').append('<div class="helper"></div>');
            if (options.loading) {
                $('.helper').append('<div class="h-loading"><ul class="spinner"><li></li><li></li><li></li><li></li></ul></div>');
            }
        } else {
            movePrevent = false;
        }
    }



    function onStart(e) {

        if(movePrevent == true){
            event.preventDefault();
            return false;
        }
        touchDown = true;

        options.direction == 'horizontal' ? startPos = e.pageX : startPos = e.pageY;

        // 阻止过度动画
        if (options.swipeAnim == 'default') {
            $pages.addClass('drag');
        }
        if ((options.swipeAnim == 'cover' && options.drag) ||
            (options.swipeAnim == 'victoria' && options.drag)) {
            $pageArr.addClass('drag');
        }

        offset = $pages.css("-webkit-transform")
                        .replace("matrix(", "")
                        .replace(")", "")
                        .split(",");

        options.direction == 'horizontal' ?
            offset = parseInt(offset[4]) :
            offset = parseInt(offset[5]);

        stage = 1;
    }


    function onMove(e) {

        if(movePrevent == true || touchDown == false){
            event.preventDefault();
            return false;
        }
        event.preventDefault();
        options.direction == 'horizontal' ? endPos = e.pageX : endPos = e.pageY;

        addDirecClass();    // 添加方向类

        if(options.swipeAnim == 'default') {
            if (options.drag) {
                dragToMove();
            }
        } else if (options.swipeAnim == 'cover') {
            if (options.drag) {
                dragToMove();
            }
        } else if (options.swipeAnim == 'victoria') {
            if (options.drag) {
                dragToMove();
            }
        }
        stage = 2;
    }



    function onEnd(e) {

        if(movePrevent == true || stage != 2){
            event.preventDefault();
            return false;
        }
        touchDown = false;
        options.direction == 'horizontal' ? endPos = e.pageX : endPos = e.pageY;

        if (options.swipeAnim == 'default') {
            $pages.removeClass('drag');

            if (Math.abs(endPos - startPos) <= 50) {
                animatePage(curPage);
            } else {
                if(!isHeadOrTail()) {
                    if(endPos >= startPos) {
                        animatePage(curPage - 1);
                    } else {
                        animatePage(curPage + 1);
                    }
                }
            }
        }
        else if (options.swipeAnim == 'cover'){
            if (options.drag) {
                $pageArr.removeClass('drag');
                if(!isHeadOrTail()) {
                    if(Math.abs(endPos - startPos) <= 50) {
                        if(endPos >= startPos) {
                            options.direction == 'horizontal' ?
                            $($pageArr[curPage-1]).css({'-webkit-transform': 'translate3d(-100%, 0, 0)'}) :
                            $($pageArr[curPage-1]).css({'-webkit-transform': 'translate3d(0, -100%, 0)'})
                        } else {
                            options.direction == 'horizontal' ?
                            $($pageArr[curPage+1]).css({'-webkit-transform': 'translate3d(100%, 0, 0)'}) :
                            $($pageArr[curPage+1]).css({'-webkit-transform': 'translate3d(0, 100%, 0)'})
                        }
                    } else {
                        if(endPos >= startPos) {
                            animatePage(curPage-1, 'backward');
                        } else {
                            animatePage(curPage+1, 'forward')
                        }
                    }
                }
            }
            else {
                if(!isHeadOrTail()) {
                    if(Math.abs(endPos - startPos) >= 50) {
                        if(endPos >= startPos) {
                            animatePage(curPage-1, 'backward');
                        } else {
                            animatePage(curPage+1, 'forward');
                        }
                    }
                }
            }
        }
        else if (options.swipeAnim == 'victoria') {
            if (options.drag) {
                $pageArr.removeClass('drag');
                if(!isHeadOrTail()) {
                    if(Math.abs(endPos - startPos) <= 50) {
                        if(endPos >= startPos) {
                            $($pageArr[curPage]).css({'-webkit-transform': 'translate3d(0, 0, 0) scale(1)'});
                            options.direction == 'horizontal' ?
                                $($pageArr[curPage-1]).css({'-webkit-transform': 'translate3d(-100%, 0, 0)'}) :
                                $($pageArr[curPage-1]).css({'-webkit-transform': 'translate3d(0, -100%, 0)'})
                        } else {
                            $($pageArr[curPage]).css({'-webkit-transform': 'translate3d(0, 0, 0) scale(1)'});
                            options.direction == 'horizontal' ?
                                $($pageArr[curPage+1]).css({'-webkit-transform': 'translate3d(100%, 0, 0)'}) :
                                $($pageArr[curPage+1]).css({'-webkit-transform': 'translate3d(0, 100%, 0)'})
                        }
                    } else {
                        if(endPos >= startPos) {
                            animatePage(curPage-1, 'backward');
                        } else {
                            animatePage(curPage+1, 'forward')
                        }
                    }
                }
            } else {
                if(!isHeadOrTail()) {
                    if(Math.abs(endPos - startPos) >= 50) {
                        if(endPos >= startPos) {
                            animatePage(curPage-1, 'backward');
                        } else {
                            animatePage(curPage+1, 'forward');
                        }
                    }
                }
            }
        }
        $($pageArr.removeClass('current').get(curPage)).addClass('current');
        if (options.indicator) {
            $($('.h-indicator ul li').removeClass('current').get(curPage)).addClass('current');
        }
        stage = 3;
    }



    function dragToMove() {

        if (options.swipeAnim == 'default') {
            var temp = offset + endPos - startPos;
            if(!isHeadOrTail()) {
                options.direction == 'horizontal' ?
                    $pages.css("-webkit-transform", "matrix(1, 0, 0, 1, " + temp + ", 0)") :
                    $pages.css("-webkit-transform", "matrix(1, 0, 0, 1, 0, " + temp + ")");
            }
        }
        else if (options.swipeAnim == 'cover') {
            var temp = endPos - startPos;
            if (!isHeadOrTail()) {
                if (options.direction == 'horizontal') {
                    if(endPos >= startPos) {
                        $($pageArr).css({'z-index': 0});
                        $($pageArr[curPage-1]).css({'z-index': 2}).show();
                        $pageArr[curPage-1].style.webkitTransform = 'translate3d('+(temp-pageWidth) +'px, 0 ,0)';
                    } else {
                        $($pageArr).css({'z-index': 0});
                        $($pageArr[curPage+1]).css({'z-index': 2}).show();
                        $pageArr[curPage+1].style.webkitTransform = 'translate3d('+(pageWidth+temp) +'px, 0, 0)';
                    }
                } else {
                    if(endPos >= startPos) {
                        $($pageArr).css({'z-index': 0});
                        $($pageArr[curPage-1]).css({'z-index': 2}).show();
                        $pageArr[curPage-1].style.webkitTransform = 'translate3d(0,'+ (temp-pageHeight) +'px ,0)';
                    } else {
                        $($pageArr).css({'z-index': 0});
                        $($pageArr[curPage+1]).css({'z-index': 2}).show();
                        $pageArr[curPage+1].style.webkitTransform = 'translate3d(0,'+ (pageHeight+temp) +'px ,0)';
                    }
                }
            }
        }
        else if (options.swipeAnim == 'victoria') {
            var temp = endPos - startPos;
            if (!isHeadOrTail()) {
                if (options.direction == 'horizontal') {
                    if(endPos >= startPos) {
                        $($pageArr).css({'z-index': 0});
                        $($pageArr[curPage-1]).css({'z-index': 2}).show();
                        $pageArr[curPage].style.webkitTransform = 'translate3d('+temp/10+'px,0,0) scale('+(1-Math.abs(temp/(pageWidth/20))/100)+')';
                        $pageArr[curPage-1].style.webkitTransform = 'translate3d('+ (temp-pageWidth) +'px,0,0)';
                    } else {
                        $($pageArr).css({'z-index': 0});
                        $($pageArr[curPage+1]).css({'z-index': 2}).show();
                        $pageArr[curPage].style.webkitTransform = 'translate3d('+temp/10+'px,0,0) scale('+(1-Math.abs(temp/(pageWidth/20))/100)+')';
                        $pageArr[curPage+1].style.webkitTransform = 'translate3d('+ (pageWidth+temp) +'px,0,0)';
                    }
                } else {
                    if(endPos >= startPos) {
                        $($pageArr).css({'z-index': 0});
                        $($pageArr[curPage-1]).css({'z-index': 2}).show();
                        $pageArr[curPage].style.webkitTransform = 'translate3d(0,'+temp/10+'px,0) scale('+(1-Math.abs(temp/(pageHeight/20))/100)+')';
                        $pageArr[curPage-1].style.webkitTransform = 'translate3d(0,'+ (temp-pageHeight) +'px ,0)';
                    } else {
                        $($pageArr).css({'z-index': 0});
                        $($pageArr[curPage+1]).css({'z-index': 2}).show();
                        $pageArr[curPage].style.webkitTransform = 'translate3d(0,'+temp/10+'px,0) scale('+(1-Math.abs(temp/(pageHeight/20))/100)+')';
                        $pageArr[curPage+1].style.webkitTransform = 'translate3d(0,'+ (pageHeight+temp) +'px ,0)';
                    }
                }
            }
        }
    }



    function animatePage(newPage, action) {
        curPage = newPage;

        if (options.swipeAnim == 'default') {
            var newOffset = 0;
            if(options.direction == 'horizontal') {
                newOffset = newPage * (-pageWidth);  // 距离左边的距离
                $pages.css({'-webkit-transform': 'matrix(1, 0, 0, 1, ' + newOffset + ', 0)'});
            } else {
                newOffset = newPage * (-pageHeight); // 距离顶部的距离
                $pages.css({'-webkit-transform': 'matrix(1, 0, 0, 1, 0, ' + newOffset + ')'});
            }
        }
        else if (options.swipeAnim == 'cover') {
            if (options.drag) {
                if (action == 'forward') {
                    $($pageArr[curPage-1]).addClass('back'); // 纯粹为了在动画结束后隐藏，不涉及 CSS 中定义的动画
                    $pageArr[curPage].style.webkitTransform = 'translate3d(0, 0, 0)';
                }
                else {
                    $($pageArr[curPage+1]).addClass('back'); // 纯粹为了在动画结束后隐藏，不涉及 CSS 中定义的动画
                    $pageArr[curPage].style.webkitTransform = 'translate3d(0, 0, 0)';
                }
            } else {
                if (action == 'forward') {
                    $pages.addClass('animate');
                    $($pageArr[curPage-1]).addClass('back');
                    $($pageArr[curPage]).addClass('front').show();
                    console.log(1);
                }
                else {
                    $pages.addClass('animate');
                    $($pageArr[curPage+1]).addClass('back');
                    $($pageArr[curPage]).addClass('front').show();
                    console.log(2);
                }
            }
        }
        else if (options.swipeAnim == 'victoria') {
            if (options.drag) {
                if (action == 'forward') {
                    $($pageArr[curPage-1]).addClass('back'); // 纯粹为了在动画结束后隐藏，不涉及 CSS 中定义的动画

                    options.direction == 'horizontal' ?
                    $pageArr[curPage-1].style.webkitTransform = 'translate3d(-60px, 0, 0) scale(0.8)' :
                    $pageArr[curPage-1].style.webkitTransform = 'translate3d(0, -60px, 0) scale(0.8)';

                    $pageArr[curPage].style.webkitTransform = 'translate3d(0, 0, 0)';
                }
                else {
                    $($pageArr[curPage+1]).addClass('back'); // 纯粹为了在动画结束后隐藏，不涉及 CSS 中定义的动画

                    options.direction == 'horizontal' ?
                    $pageArr[curPage+1].style.webkitTransform = 'translate3d(60px, 0, 0) scale(0.8)' :
                    $pageArr[curPage+1].style.webkitTransform = 'translate3d(0, 60px, 0) scale(0.8)';

                    $pageArr[curPage].style.webkitTransform = 'translate3d(0, 0, 0)';
                }
            } else {
                if (action == 'forward') {
                    $pages.addClass('animate');
                    $($pageArr[curPage-1]).addClass('back');
                    $($pageArr[curPage]).addClass('front').show();
                }
                else {
                    $pages.addClass('animate');
                    $($pageArr[curPage+1]).addClass('back');
                    $($pageArr[curPage]).addClass('front').show();
                }
            }
        }
        movePrevent = true;         // 动画过程中不可移动
        setTimeout(function() {
            movePrevent = false;    // speed ms之后又可以移动了
        }, options.speed);
    }




    // 添加 forward / backward 状态类
    // ==============================

    function addDirecClass() {
        if(options.direction == 'horizontal'){
            if (endPos >= startPos) {
                $pages.removeClass('forward').addClass('backward');
            } else if (endPos < startPos) {
                $pages.removeClass('backward').addClass('forward');
            }
        } else {
            if (endPos >= startPos) {
                $pages.removeClass('forward').addClass('backward');
            } else if (endPos < startPos) {
                $pages.removeClass('backward').addClass('forward');
            }
        }
    }




    // 在第一页向前翻和末页前后翻都不允许
    // ==============================

    function isHeadOrTail() {
        if (options.direction == 'horizontal') {
            if ((endPos >= startPos && curPage == 0) ||
                (endPos <= startPos && curPage == pageCount-1)) {
                return true;
            }
        } else if ((endPos >= startPos && curPage == 0) ||
                (endPos <= startPos && curPage == pageCount-1)) {
            return true;
        }
        return false;
    }



    // 页面（仅DOM的加载和解析）完成
    // ==============================

    $(document)
        .on('touchstart', function (e) {
            onStart(e.changedTouches[0]);
        })
        .on('touchmove', function (e) {
            onMove(e.changedTouches[0]);
        })
        .on('touchend', function (e) {
            onEnd(e.changedTouches[0]);
        })
        .on('touchend', '.h-music', function() {
            var $this = $(this);

            if ($this.hasClass('close')) {
                $this.removeClass('close');
            } else {
                $this.addClass('close');
            }
        })
        .on("orientationchange", function() {
            if (options.swipeAnim == 'default') {
                init();
            }
        })
        .on("webkitAnimationEnd webkitTransitionEnd", function(){
            setTimeout(function() {
                $(".back").hide().removeClass("back");
                $(".front").show().removeClass("front");
                // $pages.removeClass('forward backward animate');
                $pages.removeClass('animate');

                // 动画结束后再添加 current 类
                // $($pageArr.removeClass('current').get(curPage)).addClass('current');
                // if (options.indicator) {
                //     $($('.h-indicator ul li').removeClass('current').get(curPage)).addClass('current');
                // }
            }, 10);
        });



    // 页面（含资源）加载完成
    // ==============================

    $(window).on("load", function() {

        if (options.loading) {
            setTimeout(function() {
                $(".h-loading").remove();
            }, 2000)
            movePrevent = false;
            $($pageArr[curPage]).addClass('current');
        }

        if (options.indicator) {
            movePrevent = false;

            $('.helper').append('<div class="h-indicator"></div>');
            var lists = '<ul>';
            for (var i=1; i<=pageCount; i++) {
                if (i==1) {
                    lists += '<li class="current">'+i+'</li>'
                } else {
                    lists += '<li>'+i+'</li>'
                }
            }
            lists += '</ul>'
            $('.h-indicator').append(lists);
        }

        if (options.arrow) {
            $pageArr.append('<span class="h-arrow"></span>');
            $($pageArr[pageCount-1]).find('.h-arrow').remove();
        }

        if (options.music) {
            movePrevent = false;
            if(options.musicUrl == '') {
                throw new Error('music url is needed.');
            }
            $('.helper').append('<div class="h-music"><span class="h-music-inner"></span></div>');
        }
    });


}(Zepto)