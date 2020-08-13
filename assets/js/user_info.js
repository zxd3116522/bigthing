$(function() {
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败!')

                }
                layui.form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败')
                }
                layui.layer.msg('更新用户信息成功!')
                window.parent.getUserList();
            }
        })
    })
})