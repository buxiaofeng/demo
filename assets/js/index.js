$(function () {
    var layer =layui.layer
    getUserInfo()

    $('.btnout').on('click',function () {
        layer.confirm('确定退出？', {icon:3,title:'提示'}, function (index) {
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index)
            
        })
        
    })
    

})
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')
        // },
        success: function (res) {
           if(res.status !== 0){
               return layui.layer.msg('获取信息失败')
           }
           reberAvatar(res.data)
        },
        // complete: function(res){
        //  // 使用 res.responseJSON 获取到服务器的响应内容
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //      // 用户没有登录，就来访问 index 页面
        //       // 1. 清空假 token
        //       localStorage.removeItem('token')
        //      // 2. 强制用户跳转到 登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function reberAvatar(user) {
    var name=user.nickname || user.username
    $('#welcome').html('欢迎 ' + name)
    if(user.user_pic){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}