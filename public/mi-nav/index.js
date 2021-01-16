// 根据当前窗口的父窗口的location.href值。判断应该是哪一个菜单处于激活

var reg = /.+\/(.+?)\/index.html$/;

var pageName = window.parent.location.href.match(reg)[1];
// console.log(pageName)
$(`li[data-page = ${pageName}]`).addClass("active");

$("li").on( "click",function(){	
	window.parent.location.href = `/${this.dataset.page}/index.html`;
} )
