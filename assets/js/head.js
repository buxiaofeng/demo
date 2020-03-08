
 $(function(){
    var layer =layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
   
    // 1.2 配置选项
    const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
    }
  
    // 1.3 创建裁剪区域
    $image.cropper(options)
 
   $('#choseimg').on('click',function(e){
       $('#file').click()
   })
   $('#file').on('change',function(e){
     var files =e.target.files
     if(files.length === 0){
         return layer.msg('请选择图片')
     }
     var newImgURL =URL.createObjectURL(files[0])
     $image
     .cropper('destroy')      // 销毁旧的裁剪区域
     .attr('src', newImgURL)  // 重新设置图片路径
     .cropper(options)        // 重新初始化裁剪区域
   })
 
   
   $('#upload').on('click', function () {
    // 1. 将用户选择的区域，转成一个头像图片
    
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    // 2. 上传头像到服务器
    $.post('/my/update/avatar', { avatar: dataURL }, function (res) {
      if (res.status !== 0) {
        return layer.msg('更换头像失败！')
      }
      layer.msg('更换头像成功！')
      // 调用父页面中的方法，重新渲染头像
      window.parent.getUserInfo()
    })
  })

 
 })  