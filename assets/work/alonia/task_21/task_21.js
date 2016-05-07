var tag_textarea = document.getElementById("tag-textarea");
var tag_list = document.getElementById("tag-list");
var arraydata = [];

function deldata(datas) {
 datas = datas.replace(/删除：/,'');
 console.log(datas);
 var value_index = arraydata.indexOf(datas);
  arraydata.splice(value_index,1);
  render();
}
function render() {
  var str = "";
  for(var i in arraydata) {  
      str += "<span>"+arraydata[i]+"</span>";
  }
  tag_list.innerHTML = str;
}
function validate(str) { //对数组去重
  var ret = [];
  for (var i = 0; i < arraydata.length; i++) {
    var item = arraydata[i];
    if (ret.indexOf(item) === -1) {
      ret.push(item);
    }
  }
  return ret;
     
}
function init() {
 tag_textarea.addEventListener("keyup", function(e) {
  var  data = tag_textarea.value.trim();
   if (/[,，;；、\s\n]+/.test(data) || event.keyCode == 13) {
         arraydata.push(data);
         arraydata = validate(arraydata);
         if (arraydata.length>10) {
            arraydata.shift();
         }
         render();
         tag_textarea.value = "";
     
 }
},false);
  tag_list.addEventListener("mouseover", function(e) {  
    if (e.target.nodeName == "SPAN") {
       event.target.innerText = '删除：' + event.target.innerText;
        event.target.style.background="lightgray";
        event.target.style.cursor="pointer";
   }
 },false);

  tag_list.addEventListener("mouseout", function(e) {  
    if (e.target.nodeName == "SPAN") {
       event.target.innerText = event.target.innerText.replace(/删除：/,'');
       event.target.style.background="";
   }
 }, false);
  tag_list.addEventListener("click", function(e) {
    console.log(e.target.innerText);
   alert("确定"+e.target.innerText);
   deldata(e.target.innerText);
  },false);
}
init();