// 用户信息的js文件

// 获取用户信息
// api.js  => getInfoUser

const getInfoUserByCus = () => {
    getInfoUser((res) => {
        let {email, id, nickname, username} = res.data.data;
        $('.layui-form input[name=username]').val(username);
        $('.layui-form input[name=nickname]').val(nickname);
        $('.layui-form input[name=email]').val(email);
        $('.layui-form input[name=id]').val(id);
    });
}
getInfoUserByCus();

// 表单提交
$('.layui-form').on('submit',(e) => {
    e.preventDefault();

    // 获取表单数据
    const data = {
        nickname: $('.layui-form input[name=nickname]').val(),
        email: $('.layui-form input[name=email]').val(),
        id: $('.layui-form input[name=id]').val(),
    };

    // 发送ajax请求
    postUpdateUserInfo(handleDataFormatForReq(data), (res) => {
        // 修改成功后，调用index.html里面的index.js的getInfoUser方法
        // 获取当前页面对应window的上一层页面的window，调用index.js中挂好的方法
        parent.window.getUserInfo();
    })
})

// 重置按钮
$('.my-reset').on('click',(e)=>{
    // 给表单赋值-》表单$ + 值
    getInfoUserByCus();
})