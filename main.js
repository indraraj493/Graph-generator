var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var input = document.getElementById("eqnInput");
var width = canvas.width;
var height = canvas.height;


function draw() {

	if (null==canvas || !canvas.getContext) return;

	var axes={};
	axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
	axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
	axes.scale = 40;                 // 40 pixels from x=0 to x=1
	axes.doNegativeX = true;

	showAxes(ctx,axes);

}

function showAxes(ctx,axes){

 var x0=axes.x0, w=ctx.canvas.width;
 var y0=axes.y0, h=ctx.canvas.height;
 var xmin = axes.doNegativeX ? 0 : x0;
 ctx.beginPath();
 ctx.strokeStyle = "rgb(128,128,128)"; 
 ctx.moveTo(xmin,y0);
 ctx.lineTo(w,y0);  // X axis
 ctx.moveTo(x0,0);
 ctx.lineTo(x0,h);  // Y axis
 ctx.stroke();

}

function plot(){

	ctx.clearRect(0,0,width,height);
	draw();
	ctx.save();
	ctx.translate((width/2),(height/2));

	let scope = {
	    x: -width/2
	}
	const node = math.parse(input.value,scope);
	const code = node.compile();	
	code.eval(scope);

	ctx.beginPath();

	var firstEnter = true;
	var scale = document.getElementById("scaleId").value;

	for(var i=-width/2;i<=width/2;i=i+0.06){
		
		scope.x = i;

		if(firstEnter == true){
			firstEnter = false;
			ctx.moveTo(i*scale,scale*-1*code.eval(scope));
		}
		else{
			ctx.lineTo(scale*i,-1*scale*code.eval(scope));
			ctx.strokeStyle = "#00ED00";
			ctx.lineWidth = 0.1;
			ctx.stroke();
		}

	}
	ctx.restore();

}

draw();
plot();
