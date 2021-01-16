$("form.register").Validform({
    tiptype:3,
    datatype:{
        username:function(gets,obj){
            var reg = /^\w{3,10}$/;
            if(!reg.test(gets)) return false;
            var result;
            $.ajax({
                async: false,
                url: "/user/check_name/" + gets,
                type: "get",
                success: function(response) {
                   if(response.code === 200){
                        // console.log(response.data);
                        result = response.data === 0 ? true : '用户名已存在' ;
                   }
                },
                error: function(){
                    result = "服务器验证失败";
                }
            });
            return result;
        },
        phone:function(gets){
            var phoneReg = /^1\d{10}$/;
            if(!phoneReg.test(gets)) return false;
            var result;
            $.ajax({
                async: false,
                url: "/user/check_phone/" + gets,
                type: "get",
                success: response => {
                    // console.log(response);
                    if(response.code === 200){
                        result = response.data === 0 ? true : '手机号已存在';
                    }
                },
                error: function(){
                    result = "服务器验证失败";
                }
            })
            return result;
        },

    }
})

$(".btn-register").on("click",function(){
    var name =  $(".userName").val();
    var pwd = $(".passWord").val();
    var phone = $(".phone").val();
    $.myAjax({
        url: "/user/register",
        type: "post",
        data: {
            name,
            pwd,
            phone
        },
        success: function(){
            layer.open({
                content: '注册成功'
                ,skin: 'msg'
                ,time: 1 
            });
            setTimeout(() => {
                window.location.href = '/login/index.html';
            },1000)
        }
    })
})