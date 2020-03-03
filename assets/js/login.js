$(function(){
    var form =layui.form;
    var layer = layui.layer;

    $('#login-zc').on('click', function(){
        $('.dl').hide();
        $('.zc').show();
    });
    $('#login-dl').on('click', function(){
        $('.zc').hide();
        $('.dl').show();
    })
        
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          samePwd:function (value) {
              var pwd=$('.zc [name=password]').val();
              if(value !== pwd){
                  return "两次密码不一致"
              }
          }
          
    })

    $('#form-zc').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/api/reguser',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);

                }
                layer.msg('注册成功，请登录')
                $('#login-dl').click()
            }

        })
    })

    $('#from-dl').on('submit',function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
                
            }
            
        })
        
    })
})