// 整个项目请求方法所在的文件
// axios相关 req res => 给外部提供数据

axios.defaults.baseURL = `http://ajax.frontend.itheima.net`;

// const { layer } = window.layui;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log( '请求拦截器------', config ); // headers
    console.log( config.url );
    // url如果以/api开头 不需要设置，反之/my开头需要headers
    if(!config.url.startsWith('/api')){
      const AUTH_TOKEN = window.localStorage.getItem('token');
      config.headers['Authorization'] = AUTH_TOKEN;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
// then之前
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

// 修改用户信息
const postUpdateUserInfo = (data, cb) => {
  axios.post(`/my/userinfo`, data).then((res) => {
    cb(res);
  })
}

// 重置密码
const postResetPwd = (data, cb) => {
  axios.post(`my/updatepwd`, data).then((res) => {
    cb(res);
  })
}

// 更换头像
// "avatar=base64格式的字符串"
const postAvatar = (data, cb) => {
  axios.post(`/my/update/avatar`, data).then((res) => {
    cb(res);
  })
}

// 文章分类列表
const getCateList = (cb) => {
  axios.get(`/my/article/cates`).then((res) => {
    cb(res);
  })
}

// 新增文章分类
const postCateAdd = (data, cb) => {
  axios.post(`/my/article/addcates`, data).then((res) => {
    cb(res);
  })
}

// 删除文章分类
// Id => 文章1的id =>
const getCateDeleById = (Id, cb) => {
  // 接口文档中url的参数：id =>
  axios.get(`/my/article/deletecate/${Id}`).then((res) => {
    cb(res);
  })
}

// 编辑文章分类
const postCateEdit = (data, cb) => {
  axios.post(`/my/article/updatecate`, data).then((res) => {
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
// 后端mysql
// 后端文件读取
// 前端模拟后端能力 indexDB => 事务
// node => fs + 数据中间层


// 网页销毁后 数据依然存在
// 前端：浏览器里面 => WebStorage
// localStorage
// sessionStorage

// 字符串新增的API
// startsWith()
// endsWith()
// includes()