"use strict"; // 启用严格模式，提高代码的安全性和可维护性

// 更新指针位置的函数
function updateCoords(e) {
    // 获取指针在画布中的位置，支持鼠标事件和触摸事件
    pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left;
    pointerY = (e.clientY || e.touches[0].clientY) - canvasEl.getBoundingClientRect().top;
}

// 设置粒子运动方向的函数
function setParticuleDirection(e) {
    var t = anime.random(0, 360) * Math.PI / 180; // 随机生成一个角度（弧度制）
    var a = anime.random(50, 180); // 粒子运动的距离范围
    var n = [-1, 1][anime.random(0, 1)] * a; // 确定粒子运动的方向和距离
    return {
        x: e.x + n * Math.cos(t), // 计算目标 x 坐标
        y: e.y + n * Math.sin(t)  // 计算目标 y 坐标
    };
}

// 创建粒子对象的函数
function createParticule(e, t) {
    var a = {}; // 定义一个粒子对象
    a.x = e; // 初始 x 坐标
    a.y = t; // 初始 y 坐标
    a.color = colors[anime.random(0, colors.length - 1)]; // 随机选择颜色
    a.radius = anime.random(12, 24); // 随机生成粒子的半径
    a.endPos = setParticuleDirection(a); // 设置粒子的目标位置
    a.draw = function() { // 定义绘制粒子的函数
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0); // 绘制一个圆形
        ctx.fillStyle = a.color; // 设置填充颜色
        ctx.fill(); // 填充圆形
    };
    return a;
}

// 创建圆圈对象的函数
function createCircle(e, t) {
    var a = {}; // 定义一个圆圈对象
    a.x = e; // 初始 x 坐标
    a.y = t; // 初始 y 坐标
    a.color = "#F00"; // 圆圈颜色（红色）
    a.radius = 0.1; // 初始半径
    a.alpha = 0.5; // 初始透明度
    a.lineWidth = 6; // 圆圈线条宽度
    a.draw = function() { // 定义绘制圆圈的函数
        ctx.globalAlpha = a.alpha; // 设置透明度
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0); // 绘制一个圆形
        ctx.lineWidth = a.lineWidth; // 设置线宽
        ctx.strokeStyle = a.color; // 设置描边颜色
        ctx.stroke(); // 描边
        ctx.globalAlpha = 1; // 恢复透明度
    };
    return a;
}

// 渲染粒子的函数
function renderParticule(e) {
    for (var t = 0; t < e.animatables.length; t++) {
        e.animatables[t].target.draw(); // 调用粒子或圆圈的绘制方法
    }
}

// 动画粒子的函数
function animateParticules(e, t) {
    var a = createCircle(e, t); // 创建一个圆圈
    var n = []; // 创建粒子数组
    for (var i = 0; i < numberOfParticules; i++) {
        n.push(createParticule(e, t)); // 创建粒子并加入数组
    }
	//烟花粒子特效
    anime({
		targets: n,
		x: function(e) { return e.endPos.x; },
		y: function(e) { return e.endPos.y; },
		radius: 0.1,
		duration: anime.random(1200, 1800),
		easing: "easeOutExpo",
		update: renderParticule
	});
	//圆形波纹粒子特效
	anime({
		targets: a,
		radius: anime.random(80, 120),
		lineWidth: 0,
		alpha: { value: 0, easing: "linear", duration: anime.random(600, 800) },
		duration: anime.random(1200, 1800),
		easing: "easeOutExpo",
		update: renderParticule
	});
	
}

// 防抖函数，减少频繁调用
function debounce(e, t) {
    var a;
    return function() {
        var n = this;
        var i = arguments;
        clearTimeout(a); // 清除定时器
        a = setTimeout(function() {
            e.apply(n, i); // 延迟执行目标函数
        }, t);
    };
}

// 主程序
var canvasEl = document.querySelector(".fireworks"); // 获取画布元素
if (canvasEl) {
    var ctx = canvasEl.getContext("2d"); // 获取 2D 绘图上下文
    var numberOfParticules = 30; // 粒子数量
    var pointerX = 0; // 指针 x 坐标
    var pointerY = 0; // 指针 y 坐标
    var tap = "mousedown"; // 鼠标按下事件类型
    var colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"]; // 粒子颜色数组

    // 设置画布尺寸的函数（带防抖）
    var setCanvasSize = debounce(function() {
        canvasEl.width = 2 * window.innerWidth; // 设置画布宽度
        canvasEl.height = 2 * window.innerHeight; // 设置画布高度
        canvasEl.style.width = window.innerWidth + "px"; // 设置画布样式宽度
        canvasEl.style.height = window.innerHeight + "px"; // 设置画布样式高度
        canvasEl.getContext("2d").scale(2, 2); // 缩放画布
    }, 500);

    // 渲染函数
    var render = anime({
        duration: 1 / 0, // 无限持续时间
        update: function() {
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height); // 清空画布
        }
    });

    // 事件监听：鼠标按下触发粒子动画
    document.addEventListener(tap, function(e) {
        if (!["sidebar", "toggle-sidebar", "A", "IMG"].includes(e.target.id) && e.target.nodeName !== "A" && e.target.nodeName !== "IMG") {
            render.play(); // 开始渲染
            updateCoords(e); // 更新指针坐标
            animateParticules(pointerX, pointerY); // 动画粒子
        }
    }, false);

    setCanvasSize(); // 初始化画布尺寸
    window.addEventListener("resize", setCanvasSize, false); // 窗口大小变化时调整画布尺寸
}
