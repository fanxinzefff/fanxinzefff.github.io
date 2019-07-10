var wrap = document.getElementById("wrap");

var scroingEle = document.getElementById("scroing");

var countDown = document.getElementById("countDown");

var wolfs = document.getElementById("wolfs");

var menu = document.getElementById("menu");

var startEle = document.getElementById("start");

var gameover = document.getElementById("gameover");

function random(a, b) {
	return Math.floor(Math.random() * (b - a + 1) + a);
}


//时间倒计时计时器
function timer() {
	var countWidth = countDown.offsetWidth;
	var timee = setInterval(function() {
		countWidth -= 0.5;
		countDown.style.width = countWidth + "px";
		if (countWidth <= 0) {
			gameover.style.display = "block";
			clearInterval(timee);
			clearInterval(createWolfTimer);
		}
	}, 100);
}

var createWolfTimer; //存储创建狼的定时器
//灰太狼随机出现的位置,使用数组来存储对应关系的数据 -- 出现的位置
//随机出现以下9个位置
var arrPosi = [{
	l: "98px",
	t: "115px"
}, {
	l: "17px",
	t: "160px"
}, {
	l: "15px",
	t: "220px"
}, {
	l: "30px",
	t: "293px"
}, {
	l: "122px",
	t: "273px"
}, {
	l: "207px",
	t: "295px"
}, {
	l: "200px",
	t: "211px"
}, {
	l: "187px",
	t: "141px"
}, {
	l: "100px",
	t: "185px"
}];

startEle.onclick = function() {
	menu.style.display = "none";
	timer();
	var x = -5; //防止两次出现在同一个位置
	createWolfTimer = setInterval(function() {
		var wolf = document.createElement("img");
		//随机出现灰太狼还是小灰灰
		wolf.type = random(1, 100) > 80 ? "x" : "h";

		wolf.index = 0;
		wolf.src = "img/" + wolf.type + wolf.index + ".png";

		//狼出现的下标
		var p = random(0, arrPosi.length - 1);

		while (x == p) { //若与前一次位置相同，重新生成位置信息
			p = random(0, arrPosi.length - 1);
		}

		wolf.style.left = arrPosi[p].l;
		wolf.style.top = arrPosi[p].t;

		wolfs.appendChild(wolf);

		wolf.upTimer = setInterval(function() {
			wolf.index++;
			if (wolf.index > 4) {
				clearInterval(wolf.upTimer);
				//启动狼下降的定时器
				wolf.downFn();
			}
			wolf.src = "img/" + wolf.type + wolf.index + ".png";
		}, 150);

		wolf.downFn = function() {
			wolf.downTimer = setInterval(function() {
				wolf.index--;
				if (wolf.index == 0) {
					clearInterval(wolf.downTimer);
					//移除狼所在的节点
					wolfs.removeChild(wolf);
				}
				wolf.src = "img/" + wolf.type + wolf.index + ".png";
			}, 150)
		}
		x = p;
		var score = 0;
		wolf.onclick = function() {
			//清除狼上、下的定时器
			clearInterval(wolf.upTimer);
			clearInterval(wolf.downTimer);

			wolf.index = 6;
			var wolfClick = setInterval(function() {
				wolf.index++;
				wolf.src = "img/" + wolf.type + wolf.index + ".png";
				if (wolf.index == 9) {
					wolfs.removeChild(wolf);
				}
			}, 250);
			if (wolf.type == "h") {
				scroingEle.innerHTML = parseInt(scroingEle.innerHTML)+10;
			} else {
				scroingEle.innerHTML = parseInt(scroingEle.innerHTML)-10;
			}


		}



	}, 1000)
}
