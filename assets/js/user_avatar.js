$(function() {
    $('#btnLoad').on('click', function() {
            $('#btnLoad1').click()
        })
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
    $('#btnLoad1').on('change', function(e) {
        console.log(e);
        var fileList = e.target.files;
        console.log(fileList);
        if (fileList.length === 0) {
            layui.layer.msg('请选择图片上传');
        }
        var file = fileList[0];
        var newImgURL = URL.createObjectURL(file);
        // console.log(newImgURL);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $('.layui-btn-danger').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更换头像失败!')
                }
                layui.layer.msg('更换头像成功');
                window.parent.getUserList();
            }
        })
    })
})