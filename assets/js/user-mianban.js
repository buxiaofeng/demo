$(function(){

    var layer =layui.layer
    var form =layui.form


    form.verify({
       nickname:[
            /^[\S]{2,6}$/
            ,'用户名必须2到6位，且不能出现空格'
          ] ,
    })

    initUserInfo()

    function initUserInfo(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取失败')
                }
                // $('[name=username]').val(res.data.username)
                form.val('f1',res.data)
            }
        })
    }

    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })

    $('#form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('失败')
                }
                layer.msg('成功')
                window.parent.getUserInfo()
            }
        })
    })

    
})