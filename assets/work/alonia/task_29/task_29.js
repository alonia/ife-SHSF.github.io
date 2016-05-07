(function() {
 var input_data = document.getElementById("input-data");
 var btn_data = document.getElementById("btn-data");
 var p = document.querySelector("p");
 var chineseReg = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
 var lenReg = /^.{4,16}$/;    // 长度验证
 var mes = {
 	 empty_err : '姓名不能为空',
 	 len_err : '请输入长度为4~16位字符',
 	 correct : '格式正确'	 		
 };
  function css(flag) {
  	console.log(flag);
  	 switch (flag) {
  	 	case 0:p.style.color = "red";
				 input_data.setAttribute("style","border: solid 1px red");
				 break;
  	 	case 1:p.style.color = "green";
     			 input_data.setAttribute("style","border: solid 1px green");
     			 break;	
  	 }
     
  }
  function validate () {
  	var chinese_len=input_data.value.trim().replace(chineseReg,"__");
   if (input_data.value.trim() == "") {
     p.innerHTML = mes.empty_err;
     css(0);
   } else if (!lenReg.test(chinese_len)) {
     p.innerHTML = mes.len_err;
     css(0);
   }else{
   	 p.innerHTML = mes.correct;
     css(1);
   }

  }
 btn_data.addEventListener("click", validate , false);
})();