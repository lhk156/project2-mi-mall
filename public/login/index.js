// 用户名密码登录和手机验证码登录模式切换
$("button.btn-toggle").on("click",function(){
	$(".login-pwd, .login-phone").toggleClass("show");
})
// 手机号验证码登录
$("button.btn-login-phone").on("click",function(){
	alert("手机号验证码暂未开放，请使用用户名密码登录");
})

// 用户名密码登录
$("button.btn-login-pwd").on('click',function(){
	$.ajax({
		url: "/user/login_pwd",
		type: "post",
		// headers设置请求头
		headers: {
			"Content-Type": "application/json"
		},
		// 怎样把用户输入的用户名和密码发给服务器
		data: JSON.stringify({
			// trim去除前后无效空格
			name: $('input.name').val().trim(),
			pwd: $('input.pwd').val()
		}),
		success: function(result){
			// 回来的是啥
			if(result.code === 200){
				sessionStorage.setItem("token",result.data);
				sessionStorage.setItem("name",$('input.name').val().trim())
				window.location.replace("/profile/index.html");
			}else{
				alert(result.msg)
			}
		}
	})
})