// 增删改查

// 列表渲染
// api -> 模板 -> 发送请求-动态创建内容

const loadList = () => {
  getCateList((res) => {
    console.log( res ); // 后台所有数据
    // 定时器=>一执行 先clear定时器
    // 创建页面 => 创建之前，先清空
    // 输入框 => dom.value = ''
    $('.layui-table tbody').empty();
    const listData = res.data.data;
    listData.forEach((item) => {
      // item.Id
      // item.alias
      // item.is_delete
      // item.name
      let list_str = `<tr>
        <td>${item.name}</td>
        <td>${item.alias}</td>
        <td>
          <button myid="${item.Id}" data-name="${item.name}" data-alias="${item.alias}" type="button" class="layui-btn layui-btn-xs edit">编辑</button>
          <button myid="${item.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
        </td>
      </tr>`;
      $('.layui-table tbody').append(list_str);
    })
  })
}
loadList();

// 添加类型的-弹出层上的表单标签
var add_str = `
  <form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="add_form">
    <div class="layui-form-item">
      <label class="layui-form-label">类别名称</label>
      <div class="layui-input-block">
        <input type="text" name="name" required lay-verify="required|ctname" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">类别别名</label>
      <div class="layui-input-block">
        <input type="text" name="alias" required lay-verify="required|aliname" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
      </div>
    </div>
  </form>`;
// 添加按钮->click->打开对话框->表单->俩按钮->添加分类
$('.add').on('click', (e) => {
  let index = layer.open({
    type:1,
    content:add_str, // 弹层里面显示内容
    title: '新增分类',
    area: ['500px', '300px'],
    // 和$.ajax的success一样
    success(){
      console.log( 'success......' );
      // 获取表单数据
      $('.add-form').on('submit', (e) => {
        e.preventDefault();
        // const data = {
        //   name: $('.add-form input[name=name]').val(),
        //   alias: $('.add-form input[name=alias]').val()
        // }
        // const data2 = handleDataFormatForReq (data);

        // serialize() => JQ表单提供的方法
        // 得到：username=abc&pwd=123
        const data = $('.add-form').serialize();
        // 发送请求
        postCateAdd(data, (res) => {
          layer.close(index);
          // 更新list
          loadList();
        })
      })  
    }
  })
})

// 删除
// WARNING => edit和delete两btn是动态创建的（DOM操作的结果）=> 不能直接注册事件
// 解决：利用基于事件冒泡产生的事件委托现象 => 给该元素的父元素注册事件
// WebAPIs 事件三要素 => 冒泡和捕获
$('.layui-table tbody').on('click', '.delete', (e) => {
  // console.dir( e.target );
  // 确认框
  layer.confirm('is not?', { icon: 3, title: '提示' }, function (index){
    // 移除自己
    // 发送请求
    // JQ的元素.attr('myid')
    const Id = e.target.getAttribute('myid');
    // console.log( Id );
    // 真删除数据
    getCateDeleById(Id, (res) => {
      // console.log( res );
      // 更新视图
      // 干掉自己 => 假更新视图
      $(e.target).parents('tr').remove();
      // loadList();
    })
    layer.close(index);
  })
})

// 编辑的视图模板（如果不用``,也可以使用art-template(if {{ $value }} each)） render()
//  form.val('edit',{})
var edit_str = `
  <form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="edit_form" lay-filter="edit">
    <div class="layui-form-item">
      <label class="layui-form-label">类别名称</label>
      <div class="layui-input-block">
        <input type="text" name="name" required lay-verify="required|ctname" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">类别别名</label>
      <div class="layui-input-block">
        <input type="text" name="alias" required lay-verify="required|aliname" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <input type="hidden" name="Id">
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit >确认修改</button>
      </div>
    </div>
  </form>`;
// 事件委托 - 编辑按钮 - 点击事件
$('.layui-table tbody').on('click', '.edit', function (e){
  let name = e.target.getAttribute('data-name');
  let alias = e.target.getAttribute('data-alias');
  let Id = e.target.getAttribute('myid');
  let index = layer.open({
    type:1,
    content: edit_str,
    title: '编辑分类',
    area: ['500px','300px'],
    success: function (){
      // 给表单赋值（写法1）
      // $('.add-form input[name=name]').val(nameDOM)
      // $('.add-form input[name=alias]').val(aliasDOM)
      // $('.add-form input[name=Id]').val(IdDOM)
      // 优化（写法2）from.val('form的lay-filter的值'，可选{属性：值}) => 可赋值可取值
      FormData.val('edit', {
        name: name,
        // ES6对象新语法 => 如果key和value的名字一样 => 可以简化为下面写法
        alias,
        Id,
      })
      // 编辑的请求
      $('.layui-form').on('submit', (e)=>{
        e.preventDefault();
        // const data = $('.layui-form');
        // form.val('edit') => 获取表单数据
        // 表单数据格式处理 &
        const data = $('.layui-form').serialize();
        postCateEdit(data, (res)=>{
          // console.log( res );
          layer.close(index);
          // 更新list
          loadList();
        })
      })
    }
  })
})

// 复习
// 固有属性 id class
{/* <div id="main"></div> */}
// divDOM.getAttribute('id);
// divDOM.style
// divDOM.id

// 自定义属性
{/* <div abc="100"></div> */}
// divDOM.getAttribute('abc');
// divDOM.getAttribute('abc1');

// H5的新特性 => dataset => js代码：快速管理自定义属性
// dataset使用步骤
// 1.设置属性值
//  <div  data-name="abc"></div>
//  <div  data-age="abc"></div>
//  <div  data-size="abc"></div>
// 2.通过divDOM.dataset对象快速获取
// {name1:值1,name2:值2}

// 小扩展1
// 1.chrome的devtools(F12)->console选项的页面=>支持JQ语法
// 2.所有方法 __proto__  （想不起来可以在里面找）

// 小拓展2
// 删除按钮 => 删除了一个 => 更新了整个(根据所有数据动态创建了全列表)DOM的列表
// 但是存在无意义的DOM操作 => 页面性能最重要切入点 就是减少dom操作
// DOM节点对象.style.width = ? => 800多个属性  forDOM节点对象=>className dataset属性
// DOM节点对象.style.height =?
// DOM节点对象.style.left =?
// DOM节点对象.style.top =?
// DOM节点对象.className = "active"