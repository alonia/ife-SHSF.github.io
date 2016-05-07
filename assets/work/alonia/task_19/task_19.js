var num_list=[];
var div=document.querySelector("div");
var choice=document.getElementById("num-input");
function validate(input){
 var result = parseInt(input.value.replace(/\D/g, ""), 10);

    if(result > 100 || result < 10) {
        input.value = "必须为10-100的整数！";
        return false;
    }
    return result;
  }
function leftin()
{ var number;
   if(number=validate(choice))
   {
  if(num_list.length<60)
      {num_list.unshift(number);//往第一个元素插入改变原数组，并返回数组长度，
     console.log(num_list);
     render();}
     else{
      alert("插入数据");
     }
   }
       /*var reverse_list=num_list.reverse();//反转数组元素
       console.log(reverse_list);*/
      /* var index=num_list.indexOf(number);//获取插入数字的下标
     var span=document.createElement("span");
     span.setAttribute("style","background:red;width:35px;height:35px;display:inline-block;text-align:center;line-height:35px;margin-left:10px;margin-top:10px;");
     span.innerText=num_list[index];
    // div.appendChild(span);
     div.insertBefore(span, div.firstChild);*/
     //当元素没有首节点时，firstChild 返回 null。
     //该元素仍然会被插入到父元素中，位于最后一个节点后面。
     //又由于父元素没有第一个子节点，也没有最后一个子节点。 最终，新元素成为唯一的子元素。
}
function rightin()
{
  var number=document.getElementById("num-input").value.trim();
  if(number=="") {
  alert("请输入数字");
     }else{
      num_list.push(number);//往第末尾插入元素
      console.log(num_list);
     render();
       /*var index=num_list.indexOf(number);//获取插入数字的下标
     var span=document.createElement("span");
     span.setAttribute("style","background:red;width:35px;height:35px;display:inline-block;text-align:center;line-height:35px;margin-left:10px;margin-top:10px;");
     span.innerText=num_list[index];
     div.appendChild(span);//插到末尾节点；  第一种方法 渲染 div */
   }

}
 function leftout()
 {
    num_list.shift();
   div.removeChild(div.children[0]);
 }
 function rightout()
 {
    num_list.pop();
    var last_index=div.childNodes.length;
    div.removeChild(div.childNodes[last_index-1]);

 }
  function delelement(e)
  {
    var value=e.target.innerHTML;
     alert("删除的数字为："+value);
   var  value_index=num_list.indexOf(value);
      div.removeChild(e.target);
      num_list.splice(value_index,1);//从索引位置开始删除一个元素：含第 start 位
  }

  function render() // 第二方法渲染 div
  {
    var content =num_list.map(
      function(v) {
            return "<span style=vertical-align:text-bottom;height:"+v+"px;width:30px;>"+v+"</span>";}//返回一个["<span>1</span>", "<span>2</span>"]的数组
            ).join("");
    //console.log(content);
        div.innerHTML = content;
  }

   /*function render()//第三种方法渲染 div
   {
    div.innerHTML="<span>"+num_list+"</span>"; 这种做法错误只有一个span
   }
*/
  function BubbleSort(){    
   // console.log(num_list);
    /*function run(){//冒泡排序；
    for(var i=0;i<=num_list.length-1;i++){ 
      for(var j=0;j<num_list.length-i;j++){
        var middle=num_list[j];
      if(num_list[j]>num_list[j+1]){
        num_list[j]=num_list[j+1];
        num_list[j+1]=middle;
         console.log(num_list);
         render();
      }   
     }
   }
 }*/
var i = 0,j = 1,temp;
        len = num_list.length;
        timer = null;
    timer = setInterval(run,4);
    function run() {
      if (i < len) {
        if (j < len) {
          if (num_list[i] > num_list[j]) {
            temp = num_list[i];
            num_list[i] = num_list[j];
            num_list[j] = temp;
            render();
          }
          j++;
        } else {
          i++;
          j = i + 1;
        }
      } else{
        clearInterval(timer);
      }
    }
  }
  function initdata(){
    var data=[];
    for(var i=0;i<30;i++){
    data[i]=Math.floor(Math.random()*300); 
    }
    num_list=data;
    render();
  }
  function init()
  {
  var left_in=document.getElementById("left-in");
  var right_in=document.getElementById("right-in");
  var left_out=document.getElementById("left-out");
  var right_out=document.getElementById("right-out");
  var sort=document.getElementById("sort");
  var random=document.getElementById("random");
  left_in.addEventListener("click",leftin);
  right_in.addEventListener("click",rightin);
  left_out.addEventListener("click",leftout);
  right_out.addEventListener("click",rightout);
  div.addEventListener("click",delelement);
  sort.addEventListener("click",BubbleSort);
  random.addEventListener("click",initdata);

   }
   init();