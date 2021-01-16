
var id = window.location.search.slice(5).split("-");
// 根据传过来的值拿到购物记录的数组
var idsCarry = []
id.forEach(function(item){
    idsCarry.push(parseInt(item));
});
// 默认地址id
var addressId;

// 点击返回上一页
$(".icon-back").on("click",function(){
    history.go(-1);
})

// 默认地址
$.myAjax({
    url: "/address/get_default",
    success:function(data){
        $(`
            <li class="defaultId" date-id=${data.id}>
                <div class="defaultBox">
                    <div>
                        <span>${data.receiveName}</span>
                        <span>${data.receivePhone}</span>
                    </div>
                    <div>
                        <span>${data.receiveRegion}</span>
                        <span>${data.receiveDetail}</span>
                    </div>
                </div>
                <i class="iconfont icon-goto"></i>   
            </li>
        `).appendTo(".defaultAddress");
        addressId = $(".defaultId")[0].dataset.id;
        // 点击li出现所有页面
        $(".defaultAddress li").on("click",function(){
            $(".blackBC").animate({"height":"100%"},700);
            $(".allAddress").animate({"height":"70%"},500);
        })
        // 点击黑色背景关闭页面
        $(".blackBC").on("click",function(){
            $(".blackBC").animate({"height":"0"},50);
            $(".allAddress").animate({"height":"0"},50);
        })

    }

})

// 所有地址
$.myAjax({
    url: "/address/list",
    success:function(data){
        data.forEach(function(item){
            $(`
            <li class="box" data-id="${item.id}"> 
                <input type="radio" name="address" class="btn-radio">
                <div class="userBox">         
                    <div>
                        <span>${item.receiveName}</span>
                        <span>${item.receivePhone}</span>
                    </div>
                    <div>
                        <span>${item.receiveRegion}</span>
                        <span>${item.receiveDetail}</span>
                    </div>
                </div>
                <i class="edit"><img src="img/icon_edit_gray.png" ></i>  
            </li>
        `).appendTo(".allAddressLi");
        })
       // 点击选哪个地址就传那个地址

        $(".btn-radio").on("click",function(){
            $(".defaultBox").empty();
            var selected = $(this).next(".userBox").html();
            $(".defaultBox").html(selected);            
            $(".blackBC").animate({"height":"0"},50);
            $(".allAddress").animate({"height":"0"},50);
            addressId = $(this).parents("li")[0].dataset.id;
            // console.log(addressId);
        })

        // 点击修改去修改页面
        $(".edit").on("click",function(){
            var id = $(this).parents("li")[0].dataset.id
            window.location.href = `/address/editAddress.html?id=${id}`
        })


    }
})

// 渲染商品
var total = 0;
$.myAjax({
    url: "/cart/list_ids",
    type: "post",
    data: {
        "ids": idsCarry,
    },
    success:function(data){
        data.forEach(function(item){
            $(`
            <li class="product-message" data-id="${item.id}">
                <img src="${item.avatar}">
                <div class="product-messages">
                    <div>${item.name}</div>
                    <div class="priceBox">
                        <span class="price" data-price="${item.price}">${item.price}.00</span>
                        <span>X${item.count}</span>
                    </div>
                </div>
            </li>
            `).appendTo("ul.page-content")
            // 总价
            total += `${item.count}` * `${item.price}`;
            
            
        })
        $(".totalPrice").html(total)


        // 点击提交订单去购买页面
        $(".submit").on("click",function(){
            $.myAjax({
                url: "/order/confirm",
                type: "post",
                data:{
                    "ids": idsCarry,
                    "account": total,
                    addressId,
                },
                success:function(data){
                    window.location.href = `/pay/index.html?${data}`;
                }
            })
        })
        

        
    }
})



// 点击添加新地址去新地址页面

$(".addAddress").on("click",function(){
    window.location.href = "/address/addAddress.html"
});



