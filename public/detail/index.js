// 根据传过来的值拿到id
var id = window.location.search.slice(4);
var count = 1;
$.myAjax({
    url: `/product/model/${id}`,
    success: function(data){        
        var arr = [];
        var str = data.bannerImgs;
        arr = str.split(",");
        arr.forEach(function(item){
            $(`
                <div class="swiper-slide">
                    <img src="${item}">
                </div>
            `).appendTo(".swiper-wrapper")
        });
    }
})
// 设置一个延时器等待ajax加载完毕
// 轮播图
setTimeout(function(){
    var mySwiper = new Swiper ('.swiper-container', {
        autoplay: {
            disableOnInteraction:false,
            delay: 3000,
            stopOnLastSlide: false,
        } , 
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        }
    }) 
    
},500)


// 商品信息

$.myAjax({
    url: `/product/model/${id}`,
    success: function(data){
        getCount();
        console.log(data.avatar)
        $(`
            <li>
                <span>￥${data.price}</span>
                <i class="iconfont icon-favorites" style = "font-size : 7vw;"></i>
            </li>
            <li>
                <span><i class="iconfont icon-xiaomi"></i>自营</span>
                <b>${data.name}</b>
            </li>
            <li>${data.brief}</li>
        `).appendTo("ul.product-message");


        $(`
        
            <div class="pic">
                <img src="${data.avatar}">
                <div>
                    <span>￥${data.price}</span>
                    <span>已选<i class="count">${count}</i>件</span>
                </div>
                
            </div>
            
            <div class="product-num">
                <span>数量</span>
                <ul class="btn-num">
                    <li>-</li>
                    <li class="count">${count}</li>
                    <li>+</li>
                <ul>
            </div>
            <ul class="btn-buy">
                <li class="addToCart">加入购物车</li>
                <li>立即购买</li>
            </ul>
        `).appendTo(".alearBox");
    }
})



// 下面的其他图片
$.myAjax({
    url: `/product/model/${id}`,
    success: function(data){
        var arr = [];
        var str = data.otherImgs;
        arr = str.split(",");
        arr.forEach(function(item){
            $(`                
                <img src="${item}">                
            `).appendTo("ul.photo")
        });
    }
})


// 点击已选出现卡片

$(document).on("click","ul.type li",function(){
    if($(this).index() == 1){
        $(".alearWindow").animate({height:"100%"},700)
        $(".alearBox").animate({height:"70%"},500)
    };
})

$(".alearWindow").on("click",function(){
    $(this).animate({height: "0%"},100)
    $(".alearBox").animate({height:"0%"},100)
})

// 点击加减号加减数量

setTimeout(function(){
    $(".btn-num").on("click","li",function(){
        if($(this).index() == 0){
            var num = Number($(".count").html());
            num -= 1;
            count--;
            if(num < 1){
                num = 1;
            }else{
                $(".count").html(num);
            }    
                       
        }
        if($(this).index() == 2){
            
            var num = Number($(".count").html());
            num += 1;
            count++;
            if(num > 5){
                num = 5;
            }else{
                $(".count").html(num);
            }    
                       
        }
    })
},100)


// 滚动一定高度显示字体

$(".page-content").scroll(function(){
    if($(this).scrollTop() >= 30){
        $(".hidden-page").fadeIn(2000,function(){});
    }else{
        $(".hidden-page").fadeOut(2000,function(){});
    }
})


// 点击添加到购物车发一个ajax

setTimeout(function(){
    $(".addToCart").on("click",function(){
        addCart();
        getCount();
        history.go(0);
    })
},500)

function addCart(){
    $.myAjax({
        url: "/cart/add",
        type: "post",
        data:{
            pid: id,
            count: count
        },
        success: function(data){    
            // console.log(data)
            alert("添加成功")
        }
    })
}

function getCount(){
    $.myAjax({
        url: "/cart/total",
        success: function(data){    
            console.log(data)
            if(data == 0){
                return;
            }else{
                $(".product-count").css("display","block")
                $(".product-count").html(data)
            }           
        }
    })
}

