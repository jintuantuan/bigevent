// 按需显示注册登录/盒子（两个盒子定位重叠在一起，注册在上方默认隐藏）
// 去注册
$('#goto-register').on('click',() => {
    $('#register').stop().show();
})
// 去登录
$('#goto-login').on('click',() => {
    $('#register').stop().hide();
})
// function stop(){
//     return this;
// }


// 引入jq => 可以用$ => window.$ =>
// window.form => window
console.log( window );
// let form = window.layui.form
// ES6解构赋值
const { form,layer } = window.layui;
// 自定义验证（按文档）
form.verify({
    username: [/^[a-z0-9]{6,10}$/, '账号名是6到10位由数字, 小写字母组成'],
    password: [/^[\S]{6,10}$/, '密码是6到10位, 不能有空格'],
    repwd:function(value) {
        // function可以有两个参数 value: 表单的值、item：表单的DOM对象
        // if($('.pwd').val() !== value ){
        //     return '两次密码不相同';
        // }else{

        // }

        // A&&B =>
        // => A成立 继续执行B
        // => A不成立 不执行B(短路现象)
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
    // console.log( data );

    // !!!重要提示
    // 已知：{username: "111111", password: "111111"}  obj
    // 后台要求："username=11111&password=122121212"   string
    const dataStr = handleDataFormatForReq(data);
    // debugger  // 打断点


    // 3.发送（看了文档之后的）ajax请求req => $.ajax  xhr  axios
    // post data2
    // axios.js 引入
    // axios.post(url,data).then(function(res){});
    // axios.post(url,data).then(res=>{}).catch((err)=>{});

    // const fn1 = () => {}
    // const fn2 = (res) => {}
    // fn1(fn2)

    // fn1((res) => {})
    // then((res) => {}) => A函数的实参是B函数 => 回调函数 => 高阶函数
    // 下面的代码 => A函数的return是B函数 => 闭包 => 高阶函数
    // const fn3 = () => {
    //     return fn1;
    // }

    axios
        .post(`http://ajax.frontend.itheima.net/api/reguser`,dataStr)
        .then((res) => {
            console.log( res );
            // const status = res.data.status;
            // const message = res.data.message;
            const { status, message } = res.data;
            // const {data:{status,message}} = res;
            console.log( message );
            if (status === 0){
                // 提示框
                // alert(message);
                layer.msg(message);

                // 显示登陆的盒子
                window.location.href = './login.html'; // 刷新
                $('#register').stop().hide();
            }
        })
    // 4.处理响应res
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

    axios
        .post(`http://ajax.frontend.itheima.net/api/login`,dataStr)
        .then((res) => {
            const { status, message } = res.data;
            console.log( status, message );
            if (status === 0){
                layer.msg(message);
                // 去首页
                window.location.href = './index.html';
            }
        })
    // 4.处理响应res
})
// 1.const和let => 用的频率多的是const
// const per = {name:'zs'};
// per.name = 'li';
// console.log( per ); // {name: "li"}

// 2.解构赋值 => 从数组or对象中按照固定语法快速取值
// （同级的可以用逗号隔开。取值时作为属性名是取不到值的，例如：const {dog:{size}} = per;此时直接打印dog报错）
// let per = {name:'zs',dog:{size:'18'}};
// console.log( per.name ); // zs
// console.log( per['name'] ); // zs
// const {name} = per;
// console.log( name ); // zs

// const {dog:{size}} = per;
// const {dog} = per; // 没有这一句直接打印dog报错
// console.log( size ); // 18
// console.log( dog ); // {size: "18"}


// form.verify({
//     username: function(value,item){ // value:表单的值、item:表单的DOM对象
//         if(/^\d+\d+\d$/.test(value)){
//             return '用户名不能全为数字';
//         }
//         // 如果不想自动弹出默认提示框，可以直接返回true，这时可以通过其他方式提示（v2.5.7 新增）
//         if (value === 'xxx'){
//             alert('用户名不能为敏感词');
//             return true;
//         }
//     }

//     // 既支持上述函数式的方式，也支持下面数组的形式
//     // 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
//     ,pass: [
//         /^[\s]{6,12}$/
//         ,'密码必须6到12位，且不能出现空格'
//     ]
// });

// 手动js打断点，作用和f12打断点效果一样

// TODO => cb回调函数 => A函数的实参是B函数