/**
 * 获取DOM节点元素
 * @param  object obj exp:{id:"menu"}
 * @return array exp:ul
 */
function getE(obj){
	return elements;
}
/**
 * 添加class属性
 * @param object element DOM节点元素
 * @return boolean true/flase
 */
function addClass(element){
	return result;
}
/**
 * 判断是否有class
 * @param object element DOM节点元素
 * @param string strClass class
 * @return Boolean [description]
 */
function hasClass(element, strClass){
	return result;
}
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
			prev.fun(160, 175, 100, context);
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
						context.drawImage(img, 100, 100, 120, 150);
					}
					fn(showImg, 4, [59, 61, 61], 160, 175, 100);
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
 * 进入一屏幕时的操作函数
 * @param  null
 * @return obj
 * @author zp
 */
var scrollFuns = (function () {
	return {
		"page8": seventhPage["in"]
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
		8: function () {
			seventhPage["out"]();
		}
	};
}();
 