// 首页业务代码
if(!window.localStorage.getItem('token')){
    window.location.href = '/login.html';
}
console.log( 'indexjs的：',window );
// 获取用户登录数据
getInfoUser((res) => {
    console.log( '获取用户登录数据返回的：',res );
    // debugger;
    let {email, id, nickname, user_pic, username } = res.data.data;
    console.log( res.data.data, nickname, user_pic, username );
    if (nickname === ''){
        nickname = username;
    }
    // 绘制用户名
    $('.username').text(nickname);
    $('.avatar').css('display','inline-block');
    // 如果没有上传图片 显示用户名的首字母大写
    if (user_pic === null) {
        const firstLetter = nickname[0].toUpperCase();
        $('.avatar').text(firstLetter);
    } else {
        // 如果有图片
        $('.layui-nav-img').attr('src',user_pic);
    }

})

// 退出
$('#logout').on('click',()=>{
    layer.confirm('真的要退出吗？',{icon:3, title:'退出提示'},()=>{
        // 移除token
        window.localStorage.removeItem('token');
        // 去login
        window.location.href = '../login.html';
    });
})