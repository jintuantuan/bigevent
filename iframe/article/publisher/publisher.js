const ID = window.location.search.substr(4); // "?id=58953"

const handleIDEdit =() => {
    if (ID) {
        // 获取文章详情数据by id
        getArticleDetailById(ID, (res) => {
            // 下拉框的数据
            form.val('edit', res.data.data);
            layui.form.render('select','edit'); // 拉框默认选中的分类=> 如果这个位置 option默认生效
            // select的option的value="cate_id"
            // 默认选中特别第一个option value="" label="请选择分类"
            // option value="1" label="亚洲"
            // option value="2" label="欧美"
            // option value="3" label="日韩"
            // 先有所有的下拉的option=>设置默认option的value值为cate_id

            // 封面图片cropper
            // console.log( res.data.data.cover_img );
            const baseURLByImg= `http://api-breakingnews-web.itheima.net`;
            cropper.replace(baseURLByImg + res.data.data.cover_img); // cover_img =>  不完整 img的src="/uploads/sdadsad.png"
        })
    }
}
handleIDEdit();

// select + option
// 默认选中=>  select的option的value值=cate_id

const loadCateList = () => {
    // 获取文章分类
    getCateList((res) => {
        // console.log( res );
        const dataSelect = res.data.data;
        dataSelect.forEach((item) => {
            let optionStr = `<option value=${item.Id} lay-verify="cate">${item.name}</option>`;
            $('select[name=cate_id]').append(optionStr);
            // 手动更新表单元素
        })
        layui.form.render('select','edit');
        // 执行if里面的代码
        handleIDEdit();
    })
}
loadCateList();

// 富文本编辑器初始化
initEditor();
// 选择图片的插件配置
let cropper;
function initCropper() {
    // 集成裁剪插件
    const image = document.getElementById('image'); // 获取到要被添加裁剪插件的图片
    cropper = new Cropper(image, {
        aspectRatio: 1, // 横纵比例
        preview: $('.img-preview'),
    })
}
initCropper();
// 提示 => cropper的文件上传代码和之前写的头像的处理完全一样
$('.select').on('click',(e) => {
    // input[type=file]标签的样式改不动，所以我们用button[class=select]按钮来让用户点击
    $('#file').click(); // JS代码来主动触发input[type=file]的点击事件 - 选择文件窗口就出来
})

// 选择文件窗口出现-选中文件点击打开，会触发change事件
$('#file').on('change', function(e){
    let url = URL.createObjectURL(this.files[0]); // URL是window内置的对象，createObjectURL就是把blob对象(File的父类)转成url地址(浏览器本地的-跟后台无关)
    cropper.replace(url); // 让cropper重新设置图片url地址以及重新构建cropper
})

// 最后一定是提交表单=>form格式确定 =>看文档接口=>提交时参数说明
$('.layui-form').on('submit',(e)=>{
    e.preventDefault();
    // 处理表单数据
    // 富文本编辑器的数据
    let htmlStr = tinyMCE.activeEditor.getContent();
    // 图片blob
    let canvas = cropper.getCroppedCanvas({
        width: 100,
        height: 100,
    })

    // 后台要的是formData数据类型（内容载体）
    let fd = new FormData($('.layui-form')[0]);
    // 包装成formData格式
    fd.set('content', htmlStr);
    canvas.toBlob(function (blobObj){
        fd.append('cover_img', blobObj);
        // fd.forEach((value,key) => {
        //     console.log( key,value );
        // })

        // 发送请求
        if (ID) {
            // 根据文章id编辑文章 => API
            fd.append('Id',ID);
            postArticleEditById(fd, (res) => {
                setTimeout(() => {
                    window.location.href = '../list/list.html';
                }, 800);
            })
        } else {
            // 发布新文章
            postArticleAdd(fd, (res) => {
                // console.log( res );
                // 进入文章列表
                setTimeout(() => {
                    window.location.href = '../list/list.html'
                }, 800)
            })
        }
    })
})

// 页面通信
// 场景：A.html使用B.html的数据（`暂时`有下面的方案）
// 1.window利用js环境顶层对象
// 2.location利用BOM对象
// 3.localStorage 利用H5新特性 WebStorage中的ls

// 问题
// 有一个真实的img路径：=> 协议 域名 端口 /xxx/

// layui的框架分类 => 经典模块化框架
// 底层机制不是双向绑定机制 => 非经典模块化框架是双向绑定机制
// 非经典模块化框架 => 新框架有双向绑定机制 => 比如vue.js
// 双向绑定机制 => M变化V自动变，V变化M跟着变
// M 数据 dataSelect
// V 视图 用户的操作（比如选择了某option）

// 但是没关系
// 只需执行form.render(type, filter)方法即可