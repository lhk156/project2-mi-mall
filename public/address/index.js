// 发一个ajax拿到地址,如果找的到，打印在页面上，没有就显示原页面
$.ajax({
	url: "/address/list",
	type: "get",
	headers: {
		"Authorization": sessionStorage.getItem("token")
	},
	success: function(result) {
		
		if (result.code === 200) {
			if (result.data.length === 0) {
				$(".click-add").css("display", "block");
			} else {
				$(".click-add").css("display", "none");
				result.data.forEach(function(item) {
					$(
						`
						<li class="box" data-id="${item.id}" >
							<div class="nameAndPhone">
								<b>${item.receiveName}</b>
								<b>${item.receivePhone}</b>
							</div>
							<span>
								${item.receiveDetail}
								${item.receiveName}							
								${item.receiveRegion}
								<i class="edit"><img src="img/icon_edit_gray.png" ></i>
							</span>
							<div class="magt">
								<span class="default">设为默认地址</span>
								<span class="delete">删除</span>	
							</div>
							
						</li>
						
					`
					).appendTo("ul.list");



				})
				// 修改
					$(".edit").on("click", function() {
					var id = $(this).parents("li")[0].dataset.id;
					
					window.location.href = `/address/editAddress.html?id=${id}`;

				})

				// 删除收货地址
			
				$(".delete").on("click", function() {
					var id = $(this).parents("li")[0].dataset.id;
					var that = $(this).parents("li")[0];
					layer.open({
					    content: '确定要删除吗？'
					    ,btn: ['删除', '取消']
					    ,skin: 'footer'
					    ,yes: function(index){
					      $.ajax({
					      	url: `/address/remove/${id}`,
					      	type: "get",
					      	headers: {
					      		Authorization: sessionStorage.getItem("token")
					      
					      	},
					      	success: function(result) {
					      		console.log(result)
					      		if (result.code === 200) {
					      			layer.open({
					      				content: '删除成功',
					      				skin: 'msg',
					      				time: 2 //2秒后自动关闭
					      			});
					      			
					      			$(that).remove();
					      		} else {
					      			layer.open({
					      				content: '删除失败',
					      				skin: 'msg',
					      				time: 2 //2秒后自动关闭
					      			});
					      		}
					      	}
					      })
					      
					    }
					  });
					
				})
			
			
			
			
			// 设置默认地址
			
			$(".default").on("click",  function(){
				var id = $(this).parents("li")[0].dataset.id;
				var that = this;
				// console.log(id)
				$.ajax({
					url: `/address/set_default/${id}`,
					type: "get",
					headers: {
						"Authorization" : sessionStorage.getItem("token")
					},
					success: function(result) {
							console.log(result)
							if (result.code === 200) {
								layer.open({
									content: '设置成功',
									skin: 'msg',
									time: 2 //2秒后自动关闭
								});
								$(".default").html("设为默认地址");
								$(that).html("默认地址");
							} else {
								layer.open({
									content: '设置失败',
									skin: 'msg',
									time: 2 //2秒后自动关闭
								});
							}
					}
				})
			})
			
			
			}

		}

	}
})



// 根据登录的用户获得默认地址

$.ajax({
	url: "/address/get_default",
	type: "get",
	headers: {
		"Authorization": sessionStorage.getItem("token")
	},
	success: function(result) {
		console.log(result)
		if( result.data.isDefault === 1 ){
			$(`li[data-id=${result.data.id}]`).find(".default").text("默认地址");
		}else{
			layer.open({
				content: '没有默认地址',
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	}
})


// 新增收货地址,点击保存时触发
$(".save").on("click", function() {
	$.ajax({
		url: "/address/add",
		type: "post",
		headers: {
			"Content-Type": "application/json",
			"Authorization": sessionStorage.getItem("token")
		},
		data: JSON.stringify({
			"receiveName": $(".receiveName").val(),
			"receivePhone": $(".receivePhone").val(),
			"receiveRegion": $(".receiveRegion").val(),
			"receiveDetail": $(".receiveDetail").val()
		}),
		success: function(result) {
			// console.log(result)
			if (result.code === 200) {
				layer.open({
					content: '添加成功',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				setTimeout(function() {
					window.location.href = "/address/index.html"
				}, 2000)

			}
		}
	})

})


// 点击back回到上一页

$(".back").on("click",function(){
	history.go(-1);
})