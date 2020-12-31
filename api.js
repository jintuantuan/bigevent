// 整个项目请求方法所在的文件
// axios相关 req res => 给外部提供数据

axios.defaults.baseURL = `http://ajax.frontend.itheima.net`;

// const { layer } = window.layui;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log( '请求拦截器------', config ); // headers
    // config.url
    // if(如果拦截到的请求不是登录和注册){
    const AUTH_TOKEN = window.localStorage.getItem('token');
    config.headers['Authorization'] = AUTH_TOKEN;
    // }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('res的响应拦截器进来了-----------',response);
    const { status, message } = response.data;
    layer.msg(message);

    if (status === 0){
      console.log('token没失效 正确的可用res');
    }
    if (status === 1){
      window.localStorage.removeItem('token');
      window.location.href = './login.html'
    }
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


// 注册
const postReguser = (dataStr, cb) => {
  axios
    .post(`/api/reguser`,dataStr)
    .then((res) => {
        cb(res);
    })
}

// 登录
const postLogin = (dataStr, cb) => {
  axios
    .post(`/api/login`,dataStr)
    .then((res) => {
        cb(res);
    })
}


// 获取用户信息
// 该请求的接口文档=> 设置header请求头
// Authorization:token值
const getInfoUser = (cb) => {
  axios.get(`/my/userinfo`).then((res)=>{
    console.log( '获取用户信息请求发起了----' );
    cb(res);
  })
}

/* const getInfoUser = (cb) => {
  axios.get(`/my/userinfo`,{
    headers:{
      Authorization:window.localStorage.getItem('token');
    }
  }).then((res) => {
    console.log( '请求发起了----' );
    cb(res);
  })
} */

// axios => 全局设置 或者 其他设置方法 设置headers

// 持久化


// 网页销毁后 数据依然存在
// 前端：浏览器里面 => WebStorage
// localStorage
// sessionStorage