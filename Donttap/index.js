var canvas,
    ctx;
var lastCalledTime;
var fps = 0;

var rectangleSize = 150;
var rectAmount = 3;

var mouseX = 0, mouseY = 0;

var score = 0;
var scoreprSec = 0;

var grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]
var gridNum = 2;

var isDead = false;



window.onload = function(){
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    document.getElementById("Restart").onclick = function(){
        start();
    };
    start();
    resize();
    setInterval(update, 1);
    window.setInterval(function(){
        scoreprSec = score / 2;
        score = 0;
    }, 2000);
}

function start(){
    isDead = false;
    score = 0;
    scoreprSec = 0;
    gridNum = parseInt(document.getElementById("GridSize").value);
    rectangleSize = parseInt(document.getElementById("rectSize").value);
    rectAmount = parseInt(document.getElementById("rectAmount").value);
    grid = new Array(gridNum);

    for (var i = 0; i < grid.length; i++) {
        grid[i] = new Array(gridNum);
        grid[i].fill(0,0,gridNum);
    }
    
    for(var i = 0; i < rectAmount; i++){
        chooseRandomTile();
    }
    

    
}

window.onresize = function(){
    resize();
}

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function update(){
    if(lastCalledTime == null || lastCalledTime < 1) {
        lastCalledTime = performance.now();
        fps = 0;
        
    }
    delta = (performance.now() - lastCalledTime)/1000;
    lastCalledTime = performance.now();
    fps = 1/delta;
    

    

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.fillStyle="#333";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.restore();

    ctx.save();
    for(var y in grid){
        for(var x in grid[y]){
            if(grid[y][x] == 0){
                ctx.fillStyle = "#FFF";
            }
            if(grid[y][x] == 1) {
                ctx.fillStyle = "#000";
            }
            if(grid[y][x] == 2) {
                ctx.fillStyle = "#F00";
            }
            
            
            ctx.fillRect(canvas.width/2 - ((rectangleSize*grid.length)/2) + y*rectangleSize,
                         canvas.height/2 - ((rectangleSize*grid[0].length)/2) + x*rectangleSize,
                         rectangleSize,
                         rectangleSize);
        }
    }
    ctx.restore();
    
    ctx.save();
    ctx.fillStyle="#FFF";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Score pr/sec: " + scoreprSec, canvas.width/2,  40);
    ctx.restore();
    showFPS();
    
}

document.onmousedown = function(e){
    click(e);
}

document.onmousemove = function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}

document.ondblclick = function(e){
    click(e);
}

function click(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
    if(isDead)
        return;
    for(var y in grid){
        for(var x in grid[y]){
            var rectx = canvas.width/2 - ((rectangleSize*grid.length)/2) + y*rectangleSize;
            var recty = canvas.height/2 - ((rectangleSize*grid[0].length)/2) + x*rectangleSize;
            
            if(rectrectCollide({
                x:mouseX,  
                y:mouseY,
                width:1,
                height:1
            },{
                x:rectx,  
                y:recty,
                width:rectangleSize,
                height:rectangleSize
            })){
                if(grid[y][x] == 1){
                    grid[y][x] = 0;
                    chooseRandomTile();
                    score++;
                } else {
                    grid[y][x] = 2;
                    isDead = true;
                }
            }
               
                
            
        }
    }
}

function showFPS(){
    ctx.save();
    ctx.fillStyle="#FFF";
    ctx.font = "20px Arial";
    ctx.fillText("FPS: " + Math.round(fps), 40, 20);
    ctx.restore();
}


function rectrectCollide(rect1,rect2){
    return rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y;
}

function chooseRandomTile(){
    var tx = Math.floor(Math.random()*grid[0].length);
    var ty = Math.floor(Math.random()*grid.length);
    while(grid[ty][tx] == 1){
        tx = Math.floor(Math.random()*grid[0].length);
        ty = Math.floor(Math.random()*grid.length);
    }
    grid[ty][tx] = 1;
}
