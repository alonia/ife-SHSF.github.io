/**
 * SHSF团队构造函数
 * @param  object obj exp:{id:"menu"}
 * @return obejct S
 * @AidanDai
 */
var SHSF = function(obj){
	var element = null;
	var temp = null;
	/**
	 * 不能new，new会使SHSF.prototype.init()成为构造函数
	 * 如果new就阻断了SHSF原型与Object原型之间的直接继承关系
	 */
	//return new S.prototype.init(); //原型链见图1
	return S.prototype.init(obj); // 原型链见图2
}
var S = SHSF;  //简化构造函数指针

/**
 * SHSF团队初始化函数,简单实现选择器
 * @param  object obj exp:{id:"menu"}
 * @return obejct S
 * @AidanDai
 */
S.prototype.init = function(obj){
	try{
		if(Object.keys(obj).length > 1){
			throw new Error("arguments is not valid!");
		}else{
			var propertys = Object.getOwnPropertyNames(obj)
			var property = propertys[0].toLowerCase();
			switch(property){
				case "id":
					this.element = document.getElementById(obj[property]);
					break;
				case "class":
					this.element = document.getElementsByClassName(obj[property]);
					break;
				case "name":
					this.element = document.getElementsByName(obj[property]);
					break;
				case "tagname":
					this.element = document.getElementsByTagName(obj[property]);
					break;
				default:
					;
			}
		}
	}catch(e){
		console.error(e);
	}
	return this;
}

/**
 * 判断是否有某个class
 * @param  string className
 * @return obejct S
 * @AidanDai
 */
S.prototype.hasClass = function(className){
	return this;
}

/**
 * 添加class属性
 * @param  string className
 * @return obejct S
 * @AidanDai
 */
S.prototype.addClass = function(className){
	return this;
}

/**
 * 清除某个class属性
 * @param  string className
 * @return obejct S
 * @AidanDai
 */
S.prototype.delClass = function(className){
	return this;
}

/**
 * 遍历DOM数组节点	
 * @param  object obj exp:{id:"menu"}
 * @return obejct S
 * @AidanDai
 */
S.prototype.each = function(callback, args){
	// try{
		
		// if(String.prototype.indexOf(Object.prototype.toString.apply(this.element), "object")){
		// 	throw new Error("S.each() is only foreach Array!");
		// }else{
			var len = Object.keys(this.element).length;
			for(var i=0;i<len;i++){
				callback.call(this.element[i], this, i, this.element[i], args);
			}
	// 	}
	// }catch(e){
	// 	console.error(e);
	// }
	return this;
}

/**
 * 处理animation兼容性
 * @param  string 待设置的值
 * @return void 0
 * @author zp
 */
function compatibleAnimation (dom, value) {
	dom.style.animation = value;
	dom.style.WebkitAnimation = value;
	dom.style.MozAnimation = value;
	dom.style.OAnimation = value;
}

/**
 * 处理第三页逻辑
 * @param  null
 * @return void 0
 * @author zp
 */
var threeFuns = function () {
	var cache = document.getElementsByClassName("skills"),
		logos = document.getElementsByClassName("member-logo"),
		masks = document.getElementsByClassName("member-mask"),
		infos = document.getElementsByClassName("member-info"),
		prevNameArr = [" wq-", " zp-", " wyt-", " zj-", " jhy-"],
		oldNameArr = [" one-skill", " two-skill", " three-skill", " four-skill", " five-skill"],
		lastNameArr = ["one", "two", "three", "four", "five"];
	for (var i = 0, len = logos.length; i < len; i++) {
		logos[i].onmouseover = function (num) {
			return function () {
				for (var i = num * 5, j = 0; j < 5; i++,j++) {
					cache[i].style.display = "block";
					cache[i].className += prevNameArr[num] + lastNameArr[j];
					if (j === num) {
						infos[j].style.display = "block";
					} else {
						masks[j].style.display = "block";
					}
				}
			}
		}(i);
		logos[i].onmouseout = function (num) {
			return function () {
				for (var i = num * 5, j = 0; j < 5; i++,j++) {
					cache[i].style.display = "none";
					cache[i].className = "skills" + oldNameArr[j];
					if (j === num) {
						infos[j].style.display = "none";
					} else {
						masks[j].style.display = "none";
					}
				}
			}
		}(i);
	}
}();
/*
全局变量
*/
var global = {
	timer: null
};
/**
 * canvas动态画原点
 * @param  x坐标,y坐标,半径,上下文
 * @return void 0
 * @author zp
 */
var prev = function () {
	var	obj = {
			start: -87,
			fun: function (x, y, r, context) {
				var nowDeg = obj.start  / 180 * Math.PI,
					x = x + r * Math.cos(nowDeg),
					y = y + r * Math.sin(nowDeg);
				context.beginPath();
				context.strokeStyle = "rgb(" + [59, 61, 61].join(",") + ")";
				context.arc(x, y, 2, 0 / 180 * Math.PI, 360 / 180 * Math.PI);
				context.fill();
			}
		};
	return obj;
}();

/**
 * canvas动态画圆
 * @param  其余操作函数,lineWidth,lineColor(rbg数组),x坐标,y坐标,半径
 * @return void 0
 * @author zp
 */
function canvasRound (context, fn, prev) {
	var deg = 0,
		start = -90;
	prev = prev || {start: 270};
	function draw (fn, width, color, x, y, r) {
		context.beginPath();
		context.lineWidth = width;
		context.strokeStyle = "rgb(" + color.join(",") + ")";
		context.arc(x, y, r, -90 / 180 * Math.PI, start / 180 * Math.PI);
		fn();
		context.stroke();
	}
	global.timer = setInterval(function () {
		if (start === 270) {
			clearInterval(global.timer);
			global.timer = null;
			return void 0;
		}
		context.clearRect(0, 0, 500, 500);
		if (prev && prev.start <= 270) {
			prev.start += 1;
			prev.fun(150, 150, 100, context);
		}
		start += 1;
		fn(context, draw);
	}, 7);
}

/**
 * 操作尾页js
 * @param  null
 * @return void 0
 * @author zp
 */
var seventhPage = (function () {
	var canvas = document.getElementById("logo-canvas"),
		context = canvas.getContext("2d");
	return {
		in: function () {
			var loadImg = function (context, fn) {
				var img = new Image();
				img.src = "/ife-SHSF.github.io/assets/images/logo.png";
				if (img.complete) {
					function showImg () {
						context.drawImage(img, 90, 75, 120, 150);
					}
					fn(showImg, 4, [59, 61, 61], 150, 150, 100);
				}
				img.onerror = function () {
					alert("logo加载失败");
				};
			};
			canvasRound(context, loadImg, prev);
		},
	  out: function () {
	  	clearInterval(global.timer);
	  	global.timer = null;
	  	setTimeout(function () {
	  		context.clearRect(0, 0, 500, 500);
	  	}, 200);
	  	prev.start = -87;
	  	prev.fun(160, 175, 100, context);
	  }
	};
})();

/**
 * 操作队名,固定定时时间为0.75,moveShow为运动的函数名
 * @param  null
 * @return obj
 * @author zp
 */
var cancelNameFun = function () {
	var teamNames = document.getElementsByClassName("team-name"),
		dots = document.getElementsByClassName("balck-dot"),
		funArr = [];   /*切换该屏幕后,将样式重置函数数组*/
	for (var i = 0, len = teamNames.length; i < len; i++) {
		teamNames[i].onmouseover = (function (num) {
			funArr.push(function () {
				setTimeout(function () {
					compatibleAnimation(dots[num], "");
					dots[num].style.left = "24px";
				}, 200);
			});
			return function () {
				compatibleAnimation(dots[num], "moveShow 0.75s");
				setTimeout(function () {
					dots[num].style.left = "96px";
				}, 750);
			};
		})(i);
		teamNames[i].onmouseout = function () {};
	}
	return funArr;
}();
/**
 * 进入一屏幕时的操作函数
 * @param  null
 * @return obj
 * @author zp
 */
var scrollFuns = (function () {
	return {
		"page4": seventhPage["in"]
	};
})();

/**
 * 离开一屏幕时的操作函数
 * @param  null
 * @return obj
 * @author zp
 */
var leaveFuns = function () {
	return {
		4: function () {
			seventhPage["out"]();
			cancelNameFun.forEach(function (val) {
				val();
			});
		}
	};
}();
 