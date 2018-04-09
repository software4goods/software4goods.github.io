var textInput = document.getElementById('funcIN');
var answerText = document.getElementById('answer');
var execute = document.getElementById('exe');
var E = Math.E,
	LN2 = Math.LN2,
	LN10 = Math.LN10,
	LOG2E = Math.LOG2E,
	LOG10E = Math.LOG10E,
	PI = Math.PI,
	pi = 3.14,
	SQRT1_2 = Math.SQRT1_2,
	SQRT2 = Math.SQRT2,
	abs = Math.abs,
	acos = Math.acos,
	acosh = Math.acosh,
	asin = Math.asin,
	asinh = Math.asinh,
	atan = Math.atan,
	atan2 = Math.atan2,
	atanh = Math.atanh,
	cbrt = Math.cbrt,
	ceil = Math.ceil,
	clz32 = Math.clz32,
	cos = Math.cos,
	cosh = Math.cosh,
	exp = Math.exp,
	expm1 = Math.expm1,
	floor = Math.floor,
	fround = Math.fround,
	hypot = Math.hypot,
	imul = Math.imul,
	log = Math.log,
	max = Math.max,
	min = Math.min,
	pow = Math.pow,
	random = Math.random,
	round = Math.round,
	sign = Math.sign,
	sin = Math.sin,
	sinh = Math.sinh,
	sqrt = Math.sqrt,
	tan = Math.tan,
	tanh = Math.tanh,
	trunc = Math.trunc,
	clear = console.clear,
	clog = console.log,
	__log = [];
var isLogging = false;
var loggingElement = 0;

function eq(side1, side2){
	if(side1 == side2){
		return true;
	} else {
		return false;
	}
}

function areatriangle(l,h){
	return((l*h)/2);
}

function arearectangle(l,b){
	return(l*b)
}

function areacircle(){
	var args = arguments;
	if(args.length == 1){
		var r = args[0];
		return(pi*(r*r));
	} else if(args.length == 2){
		var a = args[0],b = args[1];
		return(pi*(a*b));
	}
}
function areatrapeze(a,b,h){
	return(((a+b)*h)/2);
}
function volumsphere(r){
	return((4/3)*pi*pow(r,3));
}

function volumcube(l,b,h){
	return(l*b*h);
}
function esegg(){
	return "Eyy you found a easteregg";
}
execute.onclick = function(){
	runInput();
}
document.onkeydown = function(e){
	if(e.keyCode == 13){ // enter
		runInput();
	}
	if(e.keyCode == 38){ // up
		if(!isLogging){
			isLogging = true
			loggingElement = __log.length-1;
		}
	}
	if(e.keyCode == 40){ // down
		if(!isLogging){
			isLogging = true
			loggingElement = __log.length-1;
		}
	}
}

function runInput(){
	if(funcIN.value == ""){
		setAnswer(0);
		return;
	}
	__log[__log.length] = funcIN;
	setAnswer(eval(funcIN.value.toLowerCase()));
	funcIN.value = "";
	//clear();
}

function setAnswer(input){
	answerText.innerHTML = input;
}

function ncr(n,r){
	return math.combinations(n, r);
}


function fact(num){
	var endNum = num;
	for(var i = num-1; i > 0; i--){
		console.log(i);
		endNum *= i;
	}
	
	return endNum;
}
