// 模块：处理表单的验证规则

const { form } = window.layui;

// 验证
form.verify({
    // login相关的验证规则
    username: [/^[a-z0-9]{6,10}$/, '账号名是6到10位由数字, 小写字母组成'],
    password: [/^[\S]{6,10}$/, '密码是6到10位, 不能有空格'],
    repwd: function (value) {
        return $('.pwd').val() !== value && '两次密码不相同';
    },
    // userInfo表单相关验证规则
    // 验证
    nickname: [
        // 昵称
        /^[\u4E00-\u9FA5]+$/,
        '昵称只能是中文',
    ],
    // reset表单相关验证规则
    // 新密码的input
    diff: function (value) {
        if ($('input[name=oldPwd]').val() === value) {
            return '新旧密码不能相同';
        }
    },
    // 确认密码的输入框
    same: function (value) {
        if ($('input[name=newPwd]').val() !== value) {
            return '两次输入必须一致';
        }
    },

    // 发表文章中的验证规则
    articleTitle:[
        /^[\u4E00-\u9FA5a-zA-Z0-9_-]+$/,
        '标题只能是中英文, 数字下划线中划线组成',
    ],
    // 分类判断
    cate: function(){
        // 限制用户必须选择一个分类
        // 可以写if(){return ''}
        return $('select[name=cate_id]').val().length == 0 && '请选择分类';
    }
});

// ctname: [
//   /^[\u4E00-\u9FA5]+$/,
//   "分类名只能是中文"
// ],
// aliname: [
//   /^[a-z0-9]+$/,
//   "小写英文和数字组成"
// ],