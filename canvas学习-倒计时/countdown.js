var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60; // 数字距离画布的上边距
var MARGIN_LEFT = 30;
const endTime = new Date();
// 距离当前时间就是一个小时
endTime.setTime(endTime.getTime() + 3600*1000);
var curShowTimeSeconds = 0;

var balls = []; // 声明小球
const colors = [
  "#33B5E5",
  "#0099CC",
  "#AA66CC",
  "#9933CC",
  "#99CC00",
  "#669900",
  "#FFBB33",
  "#FF8800",
  "#FF4444",
  "#CC0000"
];
window.onload = function(){
    WINDOW_WIDTH = document.body.clientWidth;
    // WINDOW_HEIGHT = document.body.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    // 108:数组总共所占的半径+1
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentTimeSeconds();
    setInterval(function(){
        render(context);
        update();
    }, 50);
}
function update(){
    var nextShowTimeSeconds = getCurrentTimeSeconds();
    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;
    if(nextSeconds != curSeconds){
        if(parseInt(curHours/10) !== parseInt(nextHours/10)){
            // 加小球
            addBalls(MARGIN_LEFT+0, MARGIN_TOP, parseInt(curHours/10));
        }
        if (parseInt(curHours % 10) !== parseInt(nextHours % 10)) {
          addBalls(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(curHours / 10));
        }
        if (parseInt(curMinutes / 10) !== parseInt(nextMinutes / 10)) {
          addBalls(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
         if (parseInt(curMinutes % 10) !== parseInt(nextMinutes % 10)) {
           addBalls(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes % 10));
         }
          if (parseInt(curSeconds / 10) !== parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
          }
          if (parseInt(curSeconds % 10) !== parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
          }
        curShowTimeSeconds = nextShowTimeSeconds;
       }
    updateBalls();
    console.info(balls.length);
}
function addBalls(x, y, num){
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if(digit[num][i][j] === 1){
                var aBall = {
                     x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                     y: y + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                     g: 1.5+Math.random(),
                     vx: Math.pow(-1, Math.ceil(Math.random()*1000)) * 4, // +4 或-4 随机的
                     vy: -5,
                     color: colors[Math.floor(Math.random()*colors.length)] // 0 - 10随机数，但不包含10
                };
                balls.push(aBall);
            }            
        }        
    }
    // updateBalls();
}
function updateBalls(){
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;    
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            // 碰撞检测
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75; // 0.75为摩擦系数
        }
    }
    var cnt = 0; // 小技巧 将画布中的小球放到cnt索引下
    // 大于cnt索引的都为画布外的小球
    for (var i = 0; i < balls.length; i++) {
        if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){
            balls[cnt++] = balls[i];
        }
    }
    while(balls.length > Math.min(300, cnt)){ // 最多只留下300个小球
        balls.pop(); // 从数组后面弹出
    }
}
function getCurrentTimeSeconds(){ // 获取当前秒数
    var curTime = new Date();
    console.info(curTime);
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret/1000); // 获得剩余倒计时秒数
    console.info(ret);
    
    return ret >= 0 ? ret : 0;
}
function render(cxt){
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT); // 刷新canvas画布
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600)/60);
    var seconds = curShowTimeSeconds % 60;
    // 每个数字占位15个长度
    // 绘制小时
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt); 
    renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(hours % 10), cxt);
    // 绘制冒号
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    // 绘制分钟
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt); 
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt); 
    // 绘制冒号
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    // 绘制秒数
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt); 
    
    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true); // 逆向绘制小球        
        cxt.closePath();
        cxt.fill();
    }
}
function renderDigit(x, y, num, cxt){ // 显示数字
    cxt.fillStyle = 'rgb(0, 102, 153)';
    for(var i = 0; i < digit[num].length; i++){
        for(var j = 0; j < digit[num][i].length; j++){
            if(digit[num][i][j] == 1){
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
        
}