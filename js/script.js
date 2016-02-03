var aWork = document.getElementById('aWork');
var aHome = document.getElementById('aHome');
var aContact = document.getElementById('aContact');
var timer;

var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable: true,
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false,
    loop: true,
    // 字体向上滚动效果
    onSlideChangeStart: function(swiper){
        $(".message p").css({
            "display":"none",
            "lineHeight":"90px"
        });

        var index = swiper.activeIndex==7 ? 1 : swiper.activeIndex;
            index = swiper.activeIndex==0 ? 6 : index;

        $p = $(".message p:nth-child("+index+")");
        $p.css("display","block");
        $p.animate({
            lineHeight:"35px"
        },1000);

        //使用p.eq()方式
        // var $p = $(".message p");
        // $p.css({
        //     "display":"none",
        //     "lineHeight":"90px"
        // });
        // var index = swiper.activeIndex==7 ? 1 : swiper.activeIndex;
        //     index = swiper.activeIndex==0 ? 6 : index;
        // $p.eq(index-1).css("display","block");
        // $p.eq(index-1).animate({
        //     lineHeight:"35px"
        // },1000);
    }
});

//获取window当前的scrollTop的值
function getCurrentSrollT(){
    return document.documentElement.scrollTop || document.body.scrollTop;
}

//点击移动跳转
function tweenFn(change){
    var start  = getCurrentSrollT();
    var change = change;
    var t = 0;
    var endT = 30;

    clearInterval(timer);
    timer = setInterval(function(){
        t++;
        if(t>endT){
            clearInterval(timer);
            document.onwheel = function(){};//恢复鼠标滚轮
            // $("document").on("onwheel",function(){""});
        }else{
            var top = Tween.Cubic.easeOut(t,start,change,endT);
            document.documentElement.scrollTop = top;
            document.body.scrollTop = top;
            document.onwheel = function(){return false};//自动滚动期间，不允许鼠标滚轮
        }
    }, 30);
}

aWork.onclick = function(){
    tweenFn(content.offsetTop - getCurrentSrollT() - parseInt(getComputedStyle(wrap).paddingTop) + 30);//减掉wrap自身的padding高度
    console.log(content.offsetTop+","+getCurrentSrollT()+","+parseInt(getComputedStyle(wrap).paddingTop))
    // this.style.color = "red";
};
aHome.onclick = function(){
    tweenFn(-getCurrentSrollT());
};
aContact.onclick = function(){
    var docH = document.documentElement.offsetHeight || document.body.offsetHeight;
    tweenFn(docH);
};


switch(window.location.hash){
    case "#work":
        setTimeout(function(){
            aWork.click();
        },500);
    break;
    case "#contact":
        setTimeout(function(){
            aContact.click();
        },500);
    break;
}

//jq
var speed = 200;
$(".content a").hover(function(){
    $(this).find(".opa").stop().animate({
        opacity:0.3
    }, speed);
    $(this).find("ul").stop().animate({
        opacity:1
    }, speed);
    $(this).find("p").css("color", "black");
}, function(){
    $(this).find(".opa").stop().animate({
        opacity:0
    }, speed);
    $(this).find("ul").stop().animate({
        opacity:0
    }, speed);
    $(this).find("p").css("color", "gray");
});



//导航条的颜色
document.onscroll = function(e){
    var e = e || window.event;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    console.log(scrollTop+","+(wrap.offsetHeight - document.documentElement.clientHeight))
    if(scrollTop == 0 || scrollTop < content.offsetTop - parseInt(getComputedStyle(wrap).paddingTop) + 30){
        document.getElementById("aHome").style.color = "red";
    }else{
        document.getElementById("aHome").style.color = "#adadad";
    }

    // if(scrollTop >= content.offsetTop - parseInt(getComputedStyle(wrap).paddingTop) + 30){
       if(scrollTop >= content.offsetTop - parseInt(getComputedStyle(wrap).paddingTop) + 30 
       && scrollTop < wrap.offsetHeight - document.documentElement.clientHeight) {
        document.getElementById("aWork").style.color = "red";
    }else{
        document.getElementById("aWork").style.color = "#adadad";
    }

    if(scrollTop == wrap.offsetHeight - document.documentElement.clientHeight){
        document.getElementById("aContact").style.color = "red";
    }else{
         document.getElementById("aContact").style.color = "#adadad";
    }
};
