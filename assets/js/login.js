$(function() {
    console.log(window);
    $('#link_reg').on('click', function() {
        $('.login').hide();
        $('.reg').show();
    })
    $('#link_login').on('click', function() {
        $('.login').show();
        $('.reg').hide();
    })
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(val) {
            var pwd = $('.reg [name=password]').val()
            if (val !== pwd) {
                return '两次密码不一致!'
            }
        }
    })
    $('#reg_form').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#reg_form [name=username]').val(),
            password: $('#reg_form [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            layui.layer.msg(res.message);
            setTimeout(() => {
                $('#link_login').click();
            }, 1000);
        })

    })
    $('#login_form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('登录失败')
                }
                // console.log(res.token);
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})