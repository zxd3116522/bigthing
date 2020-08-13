$(function() {
    getUserList();
    $('#btnLoginOut').on('click', function() {
        layui.layer.confirm('是否退出登录', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getUserList() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)

        },

    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}