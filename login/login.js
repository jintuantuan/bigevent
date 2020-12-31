// 按需显示注册登录/盒子（两个盒子定位重叠在一起，注册在上方默认隐藏）
// 去注册
$('#goto-register').on('click',() => {
    $('#register').stop().show();
})
// 去登录
$('#goto-login').on('click',() => {
    $('#register').stop().hide();
})

console.log( 'loginjs的：',window );
// ES6解构赋值
const { form } = window.layui;
// 自定义验证（按文档）
form.verify({
    username: [/^[a-z0-9]{6,10}$/, '账号名是6到10位由数字, 小写字母组成'],
    password: [/^[\S]{6,10}$/, '密码是6到10位, 不能有空格'],
    repwd:function(value) {// function可以有两个参数 value: 表单的值、item：表单的DOM对象
        return $('.pwd').val() !== value && '两次密码不相同'
    },
});

// 注册按钮点击
$('#register .layui-form').on('submit',(e)=>{
    // 1.阻止默认提交行为
    e.preventDefault();
    // 2.获取表单数据
    const data = {
        username:$('#register input[name=username]').val(),
        password:$('#register input[name=password]').val(),
    }
    const dataStr = handleDataFormatForReq(data);
    postReguser(dataStr, (res)=>{
        // 4.处理响应res
        console.log('注册点击处理响应res：', res );
        $('#register').stop().hide();
    });

})


// 登陆按钮点击
$('#login .layui-form').on('submit',(e) => {
    // 1.阻止默认提交行为
    e.preventDefault();
    // 2.获取表单数据
    const data = {
        username: $('#login input[name=username]').val(),
        password: $('#login input[name=password]').val(),
    }
    const dataStr = handleDataFormatForReq(data);

    postLogin(dataStr,(res)=>{
        console.log( '登陆按钮点击:',res );
        const {token} = res.data;
        // token和正确的用户是绑定关系=>1对1 => 保存起来

        // let token = token;
        // 在不同的页面都可以使用的数据 => 数据存储 => localStorage
        // setItem('key名'，要保存的数据);
        // 数据持久化=>localStorage => 将保存的数据 存到浏览器某个位置 F12->Application->localStorage
        // 特点：永久存储（网页关掉再打开还有这个数据）
        // 只是存起来 => 将来其他页面(比如index.html的index.js)会使用
        window.localStorage.setItem('token',token);

        // 去首页
        // debugger;
        window.location.href = './index.html';
    });
    // 4.处理响应res
})