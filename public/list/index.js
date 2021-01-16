
// 点击排列方式图标更换排列方式
$(".change").on("click", $.debounce(function(){
	$(".change").find("span").toggleClass("icon-listview icon-cascades");
	
	if($(".change").find("span").hasClass("icon-cascades")){
		$(".page-box-code").removeClass("show");
		$(".page-box").addClass("show");
	}else  if($(".change").find("span").hasClass("icon-listview")){
		$(".page-box").removeClass("show");
		$(".page-box-code").addClass("show");
	}
}))




// 根据传过来的id选择对应的商品进行渲染
var sort = "asc";
var name = "";
var category = "price";
var beginNum = 0;
var isLogin = true;
var id = window.location.search.slice(5);
mothod();
// console.log(id)
function mothod(){
	$.myAjax({
		url: "/product/list/",
		type: "post",	
		data: {
			"name":name,
			"cid": id,
			"orderCol": category,
			"orderDir": sort ,
			"begin": beginNum,
			"pageSize": 6
		},
		success: function(data) {
			if(data.length < 6) {
				isLogin = false;
			}
			data.forEach(function(item) {
				// console.log(item.id)
					$(
						`<li>
							<a href = "/detail/index.html?id=${item.id}">						
								<img src="${item.avatar}" alt="">
							</a>
							<div class="box">
								<p>${item.name}</p>
								<p>${item.brief}</p>
								<p>
									￥${item.price}							
								</p>
								<p>${item.rate}条评论</p>						
							</div>
						
						</li>`
					).appendTo('ul.page-main')
			})
		}		
	})
}
// 排序问题
$(".product-sort").on("click", $.debounce(function(){
	$("ul.page-main").empty();
	sort == "asc"?sort = "desc" :sort = "asc";
	sort == "desc"?$(".product-sort").html("降序"):$(".product-sort").html("升序")
	isLogin = true;
	beginNum = 0;
	mothod();
},1000))
	

// 点击价格之后发送ajax
$(".product-price").on("click", $.debounce(function(){
	$(".product-price").addClass("click");
	$(".product-price").siblings().removeClass("click");
	$("ul.page-main").empty();
	category = "price";
	isLogin = true;
	beginNum = 0;
	mothod();
	
},1000))

// 点击销量之后发送ajax

$(".product-sale").on("click", $.debounce(function(){
	$(".product-sale").addClass("click");
	$(".product-sale").siblings().removeClass("click");
	$("ul.page-main").empty();
	beginNum = 0;
	isLogin = true;
	category = "sale";
	mothod();
},1000))

// 点击评论之后触发ajax

$(".product-rate").on("click", $.debounce(function(){
	$(".product-rate").addClass("click");
	$(".product-rate").siblings().removeClass("click");
	$("ul.page-main").empty();
	beginNum = 0;
	isLogin = true;
	category = "rate";
	mothod();
	
},1000))

// 滚到一定距离接着拿数据(列表)
$(".page-box").scroll(function() {
	if( isLogin == false ) return;
	var littleHeight = $(this).outerHeight(true);
	var bigHeight = $("ul.page-main").outerHeight(true);
	var height = bigHeight-littleHeight;
	// console.log($(this).scrollTop());
	if( $(this).scrollTop() >= height){
		beginNum += 6;		
		mothod();		
	}
})
// 滚到一定距离接着拿数据(卡片)
$(".page-box-code").scroll(function() {
	if( isLogin == false ) return;
	var littleHeight = $(this).outerHeight(true);
	var bigHeight = $("ul.page-main").outerHeight(true);
	var height = bigHeight-littleHeight;
	// console.log(height);
	if( $(this).scrollTop() >= height ){
		beginNum += 6;		
		mothod();		
	}
})

// 搜索，内容改变失去光标时判断搜索条件

$(".name").on("change", $.debounce(function(){
	name = $(".name").val();
	$(".page-main").empty();
	isLogin = true;
	beginNum = 0;
	mothod();
},1000))

