var canvas,
    ctx;
var lastCalledTime;
var fps = 0;

var rectangleSize = 150;

var mouseX = 0, mouseY = 0;

var grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

var isDead = false;



window.onload = function(){
    start();
}

function start(){
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    isDead = false;
    grid = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    chooseRandomTile();
    chooseRandomTile();
    chooseRandomTile();

    resize();
    requestAnimationFrame(update);
}

window.onresize = function(){
    resize();
}

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function update(time){
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
    
    ctx.fillRect(mouseX,mouseY,10,10)
    showFPS();
    requestAnimationFrame(update);
    
    
}

document.onmousemove = function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}

document.onclick = function(e){
    
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
    ctx.fillText("FPS: " + Math.round(fps), 40, 30);
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
