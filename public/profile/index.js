// 判断有没有登录，登录之后显示用户名
if (sessionStorage.getItem("token") == null) {
	$(".log").text("请登录");
	$(".log").on('click', function() {
		window.location.href = "/login/index.html";
	})

} else {
	var userName = sessionStorage.getItem("name");
	$(".log").text(userName);
}
//判断有没有登录，登录之后可以管理地址
if (sessionStorage.getItem("token") !== null) {
	$(".address").on('click', function() {
		window.location.href = "/address/index.html";
	})
}
// 点击退出

$(".quit").on("click",function(){
	sessionStorage.clear();	
	history.go(0);
})
// 判断有没有token，没有就没有退出按钮
if (sessionStorage.getItem("token") == null) {
	$(".quit").css("display","none");
}else{
	$(".quit").css("display","block");
}
