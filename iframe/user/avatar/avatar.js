// 更换头像的模块

getInfoUser((res) => {
    const { user_pic } = res.data.data;
    if (user_pic) $('#image').attr('src', user_pic);
    // img的src设置完毕后，处理cropper
    handleCropper();
})

const handleCropper = () => {
    // 1.插件配置
    let cropper = new Cropper($('#image')[0],{
        aspectRatio: 1, // 裁剪图层的纵横比例
        preview: $('.img-preview'), // 多看文档里每个属性的意思，一般都会有，实在没有自己写个插件
    })

    // 2.上传按钮
    $('.select').on('click',(e) => {
        $('#file').click();
    })
    $('#file').on('change',(e)=>{
        let file = e.target.files[0];
        let url = URL.createObjectURL(file);
        // 3.回显图片 => img#image
        cropper.replace(url);
    })

    // 4.确定按钮=> 4.1发送请求  4.2更新页面
    $('.sure').on('click', (e) => {
        // 格式转换
        let canvas = cropper.getCroppedCanvas({
            // 利用cropper的方法，把剪裁区域输出到一个canvas标签上 // width和height是canvas标签的大小
            width:100,
            height:100,
        })
        // canvas图像 -> base64字符串
        let base64Str = canvas.toDataURL('image/jpeg');
        // 因为base64Str有一些特殊的符号，前端要进行URL编码，再传给后台(node+express)会进行URL解码
        base64Str = encodeURIComponent(base64Str);
        // 拼参数
        let data = 'avatar=' + base64Str;
        postAvatar(data, (res) => {
            // 更新页面
            window.parent.getUserInfo();
        })
    })
}

// 小技巧
// 函数里面用img=>来源
// 1.外部声明
// 2.形参
// 2.1默认形参
// 2.2自己传

// 小知识（了解）
// blob => JS的一种数据类型 => 进制数据
// file => 文件对象 => 图片 => 底层的数据就是blob
// eg：file很大 => 1G => 请求一次 => 中断 => 请求超时
// 解决：file => 文件分片 每一片很小blob
// 10字节 请求10次 => 8次 Tag失败

// 1.URL.createObjectURL(blob|file) => file=>url
// 2.canvas => html5的新标签 画布
//   <canvas id="canvas" width="500px" height="500px"></canvas>
// js操作
// 2.1根据画布生成画笔
// 2.2确定起点
// ===> 通过属性设置线宽 颜色 实线虚线 ......
// 2.3确定终点
// 2.4连线
// ===> 关闭当前绘画环境

// 3.base64 => 数据格式 => 高清图片
// img的src值 可以是
// 图片的路径（本地 网址）
// base64格式字符串