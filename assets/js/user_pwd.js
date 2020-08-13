$(function() {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,并且不能出现空格'],
        repwd: function(val) {
            var pwd = $('#npwd').val();
            console.log(pwd);
            if (val !== pwd) {
                return '两次密码不一致'
            }
        }
    })
    $('.layui-form').on('submit', function(e) {
        alert(111)
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败')
                }
                layui.layer.msg('更新密码成功')
            }
        })
    })
})