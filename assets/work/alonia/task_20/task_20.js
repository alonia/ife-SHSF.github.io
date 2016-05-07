var num_list=[];
var div=document.querySelector("div");
function leftin()
{
 var number=document.getElementById("num-textarea").value.trim();
  if(number=="") 
  {
  alert("请输入数字");
     }else
     {                      //split 返回一个数组
       var mwords=number.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);//正则匹配不是数字汉字字母的
       //console.log(num_list);
       num_list=num_list.concat(mwords);//将传入的数组或非数组值与原数组合并,组成一个新的数组并返回.
      //num_list.unshift(number);//往第一个元素插入改变原数组，并返回数组长度，
     console.log(num_list);
     render();
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
}
  function delelement(e)
  {
    var value=e.target.innerHTML;
     alert("删除的数字为："+value);
   var  value_index=num_list.indexOf(value);
      div.removeChild(e.target);
      num_list.splice(value_index,1);//从索引位置开始删除一个元素：含第 start 位
  }

  function render(x) // 第二方法渲染 div
  {
    var content =num_list.map(
      function(v) {
             if(x!=null){
             v=v.replace(RegExp(x,'gi'),"<i style=color:green;>"+x+"</i>");
             }
            return "<span>" + v + "</span>";
            }//返回一个["<span>1</span>", "<span>2</span>"]的数组
            ).join("");
   // console.log(content);
        div.innerHTML = content;
  }

   /*function render()//第三种方法渲染 div
   {
    div.innerHTML="<span>"+num_list+"</span>"; 这种做法错误只有一个span
   }
*/
function match()
  {
    var search_input=document.getElementById("search-input").value.trim();
    console.log(search_input);
    if(search_input==""){
      alert("请输入查询条件");
    }else if(num_list==""){
      alert("请插入数据");
    }else{
      /*var x=[];
       for(var i in num_list)
       {
         x.push(num_list[i].replace(RegExp(search_input,'gi'),"<i style=color:green;>"+search_input+"</i>"));
       }
       /*num_list=x;
       console.log(num_list);*/
        render(search_input);
    }
   

  }
  function init()
  {
  var left_in=document.getElementById("left-in");
  var search_btn=document.getElementById("search-btn");
  left_in.addEventListener("click",leftin);
  div.addEventListener("click",delelement);
 search_btn.addEventListener("click",match);
   }
   init();