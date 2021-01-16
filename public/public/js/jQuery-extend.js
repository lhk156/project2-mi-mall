$.extend({
	myAjax: function(userOptions) {
		// 构造默认配置
		var defaultOptions = {
			type: "get",
			headers: {
				"Content-Type": "application/json",
				"Authorization": sessionStorage.getItem("token")
			},
		};
		// 合并默认配置和用户配置
		var options = Object.assign({}, defaultOptions, userOptions);
		if (options.data) options.data = JSON.stringify(options.data);
		options.success = function(result) {
			if (result.code === 200) {
				userOptions.success(result.data);
			} else {
				alert(result.msg)
			}
		}
		$.ajax(options)

	},
	// 防抖，在wait时间内只能点击一次，点击多次不生效
	debounce:function (func,wait){
		var lock = false;
		return function(args){
			if(lock) return;
			lock = true;
			setTimeout(function(){ lock=false },wait);
			func.call( this, args)
		};
	}


})

