$("ul.list-main").on( "click",function(e){
	// 判断点击的是li还是span,如果是span，换成li
	var li = e.target.tagName === "LI" ? e.target : e.target.parentNode;
	// 判断有没有active，如果有说明选中
	if( $(li).hasClass("active") ) return;
	
	$(li).addClass("active");
	$(li).siblings().removeClass("active");
	// 控制右上角图片切换
	$("img.avatar").attr( 'src' , li.dataset.avatar );
	// ajax请求
	// $.ajax({
	// 	url : `/category/list/${li.dataset.id}`,
	// 	type : "get",
	// 	success : function(resule){
	// 		if( resule.code === 200 ){
	// 			$("ul.list-sub").empty().toggleClass("show",resule.data.length > 0);
	// 			$("p.empty").toggleClass( "show",resule.data.length === 0 );
	// 			resule.data.forEach( function(item){
	// 				$( `
	// 					<li>
	// 						<a href="/list/index.html?cid=${item.id}">
	// 							<img src="${item.avatar}"/>
	// 							<span>${item.name}</span>
	// 						</a>
	// 					</li>
	// 				` ).appendTo("ul.list-sub");
	// 			} )
	// 		}
	// 	}
	// })
	
	$.myAjax({
		url : `/category/list/${li.dataset.id}`,
		success: function(data){
			$("ul.list-sub").empty().toggleClass("show",data.length > 0);
			$("p.empty").toggleClass( "show",data.length === 0 );
			data.forEach( function(item){
				$( `
					<li>
						<a href="/list/index.html?cid=${item.id}">
							<img src="${item.avatar}"/>
							<span>${item.name}</span>
						</a>
					</li>
				` ).appendTo("ul.list-sub");
			} )
		}
	})
	
} )

// 发送ajax请求一级分类数据
// $.ajax({
// 	url: "/category/list/0",
// 	type: "get",
// 	success:function(result){
// 		//把回来的数据拼成多个li放在ul.list-main中
// 		console.log(result)
// 		if( result.code === 200 ){
			
// 			result.data.forEach(function(item){
// 				$(`
// 					<li data-id='${item.id}' data-avatar='${item.avatar}'>
// 						<span>${item.name}</span>
// 					</li>					
// 				`).appendTo(".list-main");
// 			})
			
// 			// trigger模拟点击事件的触发
// 			$(".list-main li").eq(0).trigger("click");
			
// 		}
// 	}
// });

$.myAjax({
	url: "/category/list/0",
	success: function(data){
		data.forEach(function(item){
			$(`
				<li data-id='${item.id}' data-avatar='${item.avatar}'>
					<span>${item.name}</span>
				</li>					
			`).appendTo(".list-main");
		})
		
		// trigger模拟点击事件的触发
		$(".list-main li").eq(0).trigger("click");
	}
})

