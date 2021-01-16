// 编辑地址页面
var id = parseInt(window.location.search.slice(4));
console.log(id);
// 拿到id以后传值到页面
$.ajax({
	url: `/address/model/${id}`,
	type: "get",
	headers: {
		"Authorization": sessionStorage.getItem("token")
	},
	success: function(result) {
		console.log(result)		
		$(".receiveName").val(result.data.receiveName);
		$(".receivePhone").val(result.data.receivePhone);
		$(".receiveRegion").val(result.data.receiveRegion);
		$(".receiveDetail").val(result.data.receiveDetail);


	},

})
// 获取光标时内容消失
$(".receiveName").on("focus",function(){
	$(this).val("");
});
$(".receivePhone").on("focus",function(){
	$(this).val("");
});
$(".receiveRegion").on("focus",function(){
	$(this).val("");
});
$(".receiveDetail").on("focus",function(){
	$(this).val("");
});


// 点击保存以后判断
$(".save").on("click", function() {
	
	$.ajax({
		url: "/address/update",
		type: "post",
		headers: {
			"Content-Type": "application/json",
			"Authorization": sessionStorage.getItem("token")
		},
		data: JSON.stringify({
			"id": id,
			"receiveName": $(".receiveName").val(),
			"receivePhone": $(".receivePhone").val(),
			"receiveRegion": $(".receiveRegion").val(),
			"receiveDetail": $(".receiveDetail").val()
		}),
		success: function(result) {
			console.log(result)
			if (result.code === 200) {
				layer.open({
					content: '修改成功',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				setTimeout(function(){
					window.location.href = "/address/index.html";
				},2000)
				
			} else {
				layer.open({
					content: '修改失败',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			}
		}
	})

})

$(".back").on("click",() => {
	history.go(-1);
})