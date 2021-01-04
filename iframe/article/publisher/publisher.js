// 业务：两类

// 如果是编辑文章
// 1.xxTitle = "修改文章"
// 2.表单数据要显示
// else {
    // xxTitle = "写文章"
    // 发表文章的逻辑
// }


// 获取文章分类
getCateList((res) => {
    console.log( res );
    const dataSelect = res.data.data;
    dataSelect.forEach(item => {
        let optionStr = `<option value="" lay-verify="cate">${item.name}</option>`;
        $('select[name=cate_id]').append(optionStr);
        // 手动更新表单元素
        layui.form.render('select','edit');
    })
})

// layui的框架分类 => 经典模块化框架
// 底层机制不是双向绑定机制 => 非经典模块化框架是双向绑定机制
// 非经典模块化框架 => 新框架有双向绑定机制 => 比如vue.js
// 双向绑定机制 => M变化V自动变，V变化M跟着变
// M 数据 dataSelect
// V 视图 用户的操作（比如选择了某option）

// 但是没关系
// 只需执行form.render(type, filter)方法即可