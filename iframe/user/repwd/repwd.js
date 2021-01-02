// form标签 - 绑定submit事件
$('.layui-form').on('submit',(e)=>{
    e.preventDefault();
    let obj = {
        oldPwd: $('.layui-form input[name=oldPwd]').val(),
        newPwd: $('.layui-form input[name=newPwd]').val(),
    }

    // 发送请求
    postResetPwd(handleDataFormatForReq(obj), (res) => {
        // console.log( res );
        // 重置成功
        // 移除token
        window.localStorage.removeItem('token');
        // 让父页面回到login.html
        window.parent.location.href = '/login.html';
    })
})
// iframe使用过程中产生的父子页面的通信问题（传值）