
//空数组，存放选中的商品
var goodsSelect = [];
// 空数组，存放选中的商品id
var idsCarry = [];
console.log(idsCarry);
// 增加某条购物记录的购买数量

// 获取当登录用户相应的购物车中的所有商品信息
function allProductMessage(){
    $.myAjax({
        url: "/cart/list",
        type: "post",
        success:function(data){
            console.log(data)
            data.forEach(function(item){
                $(`
                <li class="product-message" data-id="${item.id}">
                    <input type="checkbox" class="onecheck" />
                    <img src="${item.avatar}">
                    <div class="product-messages">
                        <div>${item.name}</div>
                        <div>
                            <span class="price" data-price="${item.price}">${item.price}.00</span>
                            <ul class="product-num">
                                <li class="lessCount">-</li>
                                <li class="count" data-count="${item.count}">${item.count}</li>
                                <li class="addCount">+</li>
                            </ul>
                        </div>
                    </div>
                </li>
                `).appendTo("ul.page-content")
            })


            
            $(".addCount").on("click",$.debounce(function(){
                var id = $(this).parents("li")[0].dataset.id;
                var this1 = $(this).parents(".product-message").find(".onecheck")[0];
                var numAdd = Number($(this).prev("li").html());
                var price = Number($(this).parents(".product-message").find(".price").html());
                numAdd++;
                $(this).prev("li").html(numAdd);
                if(numAdd == 5) return;
                if( this1.checked == true ){
                    var total = Number($(".totalPrice").html());                    
                    total +=  price;
                    $(".totalPrice").html(total)
                }
                $.myAjax({
                    url:`/cart/increase/${id}`,
                    type: "post",
                    success:function(data){
   
                    }
                })
            },1000));

            // 减少某条购物记录的购买数量

            $(".lessCount").on("click",$.debounce(function(){
                var id = $(this).parents("li")[0].dataset.id;
                var this1 = $(this).parents(".product-message").find(".onecheck")[0];
                var numLess = Number($(this).next("li").html());
                var price = Number($(this).parents(".product-message").find(".price").html());
                if(numLess == 1) return;
                numLess--;
                $(this).next("li").html(numLess);
                
                if( this1.checked == true ){
                    var total = $(".totalPrice").html();                    
                    total -=  price;
                    $(".totalPrice").html(total)
                }
                // console.log(id)  
                $.myAjax({
                    url:`/cart/decrease/${id}`,
                    type: "post",
                    success:function(data){
                        
                    }
                })
            },1000));
            
            // 点击全选按钮全选
            
            $(".allcheck").on("click",function(){
                
                if( this.checked == true ){
                    $(".onecheck").prop("checked",true);
                    $(".allcheck").prop("checked",true);
                    goodsSelect = data.concat(); 
                    var arr = [];
                    data.forEach(function(item){
                        arr.push(item.id)
                        idsCarry = arr.concat();
                    })          
                }else{
                    $(".onecheck").prop("checked",false);
                    $(".allcheck").prop("checked",false);
                    goodsSelect = [];
                    idsCarry = [];
                }

                changeTotalPrice();
            })
            
            
            // 计算价格
            function changeTotalPrice() {
                // console.log(goodsSelect);
                var total = 0;
                for (var i = 0; i < goodsSelect.length; i++) {
                    total += Number(goodsSelect[i].price * goodsSelect[i].count);
                }
                $('.totalPrice').html(total);
            }
            //点击单选按钮一定数量全选按钮亮起            
            $(".onecheck").on("click",function(){
                var index = $(this).parents("li").index();
                if( $(this).prop("checked") == true ){
                    goodsSelect.push(data[index]);
                    idsCarry.push(data[index].id);
                }else{
                    var i = goodsSelect.indexOf(data[index]);
                    goodsSelect.splice(i, 1);
                    var j = goodsSelect.indexOf(data[index].id);
                    idsCarry.splice(i,1);                    
                }

                if(goodsSelect.length == data.length){
                    $(".allcheck").prop("checked",true);
                }else{
                    $(".allcheck").prop("checked",false);
                }
                changeTotalPrice();
                
            })

           
            // 点击删除删除商品
            $(".delete").on("click",function(){
                $('ul.page-content li:has(input:checked)').remove();
                $.myAjax({
                    url: "/cart/remove",
                    type: "post",
                    data: {
                        ids: idsCarry,
                    },
                    success: function(){
                        
                    }
                })   
                changeTotalPrice()
                $('.totalPrice').html(0);
            })
            
            //点击结算把东西放到结算页，并且跳转
            $(".settlement").on("click",function(){
                var ids = idsCarry.join("-");
                console.log(ids)
                $.myAjax({
                    url: "/cart/list_ids",
                    type: "post",
                    data:{
                        ids: idsCarry,
                    },
                    success: function(){
                        window.location.href = `/Settlement/index.html?ids=${ids}`;
                        idsCarry = [];
                        goodsSelect = [];
                    }
                })
            })

        }
    
    })
}

// 导火线
allProductMessage();


// 点击返回按钮回到上一页

$(".icon-back").on("click",function(){
    history.go(-1);
})

// 点击设置改变按钮

$(".edit-page").on("click",function(){
    $(".settlement").toggleClass("show");
    $(".edit-page").toggleClass("show");
    $(".carry-page").toggleClass("show");
    $(".delete").toggleClass("show");
    $(".total").css("display","none");
})
// 点击完成改变按钮
$(".carry-page").on("click",function(){
    $(".settlement").toggleClass("show");
    $(".edit-page").toggleClass("show");
    $(".carry-page").toggleClass("show");
    $(".delete").toggleClass("show");
    $(".total").css("display","block");
})
