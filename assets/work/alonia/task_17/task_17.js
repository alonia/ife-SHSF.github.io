// 数据格式演示
/*var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }

};
遍历aqiSourceData*/
// 以下两个函数用于随机模拟生成测试数据
var select=document.getElementById("city-select");
 var div=document.getElementById("aqi-chart-wrap");
 var fieldset=document.getElementById("form-gra-time");
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}
/**
 * 渲染图表
 */
function renderChart() 
{
    var str="";
  for (var i in chartData)//遍历全局变量
  {  // console.log(i);
   // console.log(chartData[i]);
 // console.log(aqiSourceData.北京);
 str+="<span title="+i+"aqi:"+chartData[i]+" style=height:"+chartData[i]+"px;background:"+getbgcolor()+"; ></span>";
  //+style=height:"+chartData[i]+"px;background:"+getbgcolor()+";
  }
   var title="<h3 style=text-align:center;>2016年1-3月城市空气质量指数 </h3>";
   div.innerHTML=title+str;
   
}
function getbgcolor()
{
 // var random=Math.random();
//随机产生颜色先利用random产生随机数再转换为10进制 再转换为16进制字符串；
 var bgcolor="#"+Math.floor(Math.random() * 0xFFFFFF).toString(16);
 //调用了Number对象的toString方法（此方法覆盖了object的toString）
  return bgcolor;
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
  // 确定是否选项发生了变化 
  // 设置对应数据
  if(e.target.nodeName==="INPUT"){ //当选中input框时
     if(pageState.nowGraTime==e.target.value){//把input的value赋给pagaState
       // console.log(e.target);
       return;
     }else{
     pageState.nowGraTime=e.target.value;
    // console.log(pageState.nowGraTime);
     }
    
   }
  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}

/**
 * select发生变化时的处理函数
 */  
function citySelectChange() {
  // 确定是否选项发生了变化 
 pageState.nowSelectCity=this.value;//修改了全局变量的值;
  // 设置对应数据
 initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm(){
      fieldset.addEventListener("click",graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
   var option="";
   for(var i in aqiSourceData)
   {
      option+="<option>"+i+"</option>";
   }
   select.innerHTML=option;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
   select.addEventListener("change",citySelectChange);

}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
   var nowCityData=aqiSourceData[pageState.nowSelectCity];
   /*for(var i in nowCityData)
   {
     //console.log(nowCityData[i]);//空气质量指数
    // console.log(i);//日期
     chartData[i]=nowCityData[i];
   }*/
  if(pageState.nowGraTime=="day"){ 
       chartData=nowCityData;//这里修改了全局变量chartData
      }else if(pageState.nowGraTime=="week"){
         
      }else if(pageState.nowGraTime=="month"){
        /*chartData={  这里的数据格式
          一月:23,
          二月:45,
          三月:56
        }*/
        console.log(chartData);

      }



}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();//修改了pageState.nowGraTime
  initCitySelector();//修改了pageState.nowSelectCity
  initAqiChartData();//修改了全局变量chartData
   renderChart();
}

init();
/*小结：
 *  把当前城市的数据放到pageState中 遍历此城市得到日期和aqi;
 *
 *
 *
 *
 *
 *
 */
