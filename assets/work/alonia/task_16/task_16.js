/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * 
 aqiData = {
     "北京": 90,
    "上海": 40
  };
  console.log(aqiData.length);
  for (var i in aqiData)
  {console.log(i);}for  in 以任意序迭代一个对象的可枚举属性 不能有for循环 因为是键值对下标不为整数

*/
 

var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData()
{
    var city=document.getElementById("aqi-city-input").value.trim();
    var aqi=document.getElementById("aqi-value-input").value.trim();
    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/))
    {
      alert("城市名不合法");
      return false;
    }
    else if(!aqi.match(/^\d+$/))
    {
      alert("请输入有效数字");
      return false;
    }
    else 
    {
    aqiData[city]=aqi;//对象字面量形式 把对象当做关联数组动态增加属性；属性使用了同样的名称时，后面的属性会覆盖前面的属性。es2015(es6)移除了
     } 
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var table=document.getElementById("aqi-table");
  table.innerHTML="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
   for(var j in aqiData)//遍历字面量对象；j 为键 aqiData[j]为值
   {
      table.innerHTML+="<tr><td>"+j+"</td><td>"+aqiData[j]+"</td><td><button>删除</button></td></tr>";
     // console.log(table);
   }
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}


/* 点击各个删除按钮的时候的处理逻辑
 获取哪个城市数据被删，删除数据，更新表格显示*/
 
function delBtnHandle(delbtn) 
{
	var tr=delbtn.parentNode.parentNode;
   var city=tr.childNodes[0].innerHTML;
   delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var mybutton=document.getElementById("add-btn");
    mybutton.addEventListener("click",addBtnHandle);
   
   var table=document.getElementById("aqi-table");
  // console.log(table);
     table.addEventListener("click",function(e){//给table绑定了事件，没有给所有删除按钮绑定事件
      /* console.log(table);
        console.log(delbtn[0]);*/
     console.log(e.target);
      if (e.target.nodeName ==="BUTTON")
      //nodeName 返回当前节点的字符串 （.nodeName === "HTML"html中为大写 xml中看原来创建标签的大小写）
      {
           delBtnHandle(e.target);
      }
     });

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();