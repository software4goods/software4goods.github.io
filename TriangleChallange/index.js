
function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    return result;
} 

function lineToAngle(x1, y1, length, angle) {

    angle *= Math.PI / 180;

    var x2 = x1 + length * Math.cos(angle),
        y2 = y1 + length * Math.sin(angle);

    return {x: x2, y: y2};
}
var Pos = function(x,y) {
    this.x = x;
    this.y = y;
}
function calculateTriangle(startX,startY,length,angle1,angle2){
    
    var posA = new Pos(startX,startY);
    var bTmpPos = lineToAngle(posA.x,posA.y,length,0);
    var posB = new Pos(bTmpPos.x,bTmpPos.y);
    var ang1 = angle1, ang2 = 180-angle2;
    
    var lineEndB = lineToAngle(posA.x,posA.y,10000,ang1);
    var lineEndC = lineToAngle(posB.x,posB.y,10000,ang2);

    var result = checkLineIntersection(posA.x,posA.y,lineEndB.x,lineEndB.y,posB.x,posB.y,lineEndC.x,lineEndC.y);
    if(!result.onLine1 || !result.onLine2){
        textSize(32);
        text('The triangle is invalid', width/2 - 50, height/2 - 100);
        return [new Pos(0,0),new Pos(0,0),new Pos(0,0)];
    }

    var posC = new Pos(result.x,result.y);

    return [posA,posB,posC];

}

var boii1 = 0;

var trianglePositions;
var rSlider, gSlider, bSlider;
var slidersInit = false;
function setup(){
    resize();
    textSize(15);

    // create sliders
    rSlider = createSlider(0, 1000, 100);
    rSlider.position(20, 20);
    gSlider = createSlider(1, 360, 70);
    gSlider.position(20, 50);
    bSlider = createSlider(1, 360, 70);
    bSlider.position(20, 80);
    slidersInit = true;

    trianglePositions = calculateTriangle(width/2 - rSlider.value()/2, height/2, 200, 70, -70);
}

function draw(){
    background(51);
    stroke("#FFF");
    trianglePositions = calculateTriangle(width/2 - 300, height/2 + boii1, 200, 70, 70);
    if(slidersInit){
        textSize(15);
        fill("#FFF");
        text("Base line length: " + rSlider.value(), rSlider.x * 2 + rSlider.width, 35);
        text("Angle point(A): " + gSlider.value() , gSlider.x * 2 + gSlider.width, 65);
        text("Angle point(B): " + bSlider.value(), bSlider.x * 2 + bSlider.width, 95);
        trianglePositions = calculateTriangle(width/2 - rSlider.value()/2, height/2 + 100, parseInt(rSlider.value()), parseInt(-gSlider.value()), parseInt(-bSlider.value()));
    }

    triangle(trianglePositions[0].x,trianglePositions[0].y,trianglePositions[1].x,trianglePositions[1].y,trianglePositions[2].x,trianglePositions[2].y);
    text("A", trianglePositions[0].x-20, trianglePositions[0].y + 20);
    text("B", trianglePositions[1].x+20, trianglePositions[1].y + 20);
    
    
}

function windowResized() {
    resize();
}

function resize(){
    resizeCanvas(windowWidth, windowHeight);
}
