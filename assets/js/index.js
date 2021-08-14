$(function () {
    // getUserInfo获取用户基本信息
    var layer = layui.layer
    getUserInfo()
    $('#btnlgout').on('click', function () {
        //提示退出
        layer.confirm('确定退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //1.清除本地token
            localStorage.removeItem('token')
            //2.跳转到登录页
            location.href = '/login.html'
            //3.关闭confim询问框
            layer.close(index);
        });
    })
})


//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用 renderAvatar渲染头像
            renderAvatar(res.data)
        },
    
    })
}
//调用 readerAvater渲染头像
// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}