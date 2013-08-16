//hexboard drawing is by ZacktheHuman
    var hexHeight,
        hexRadius,
        hexRectangleHeight,
        hexRectangleWidth,
        hexagonAngle = 0.523598776, // 30 degrees in radians
        sideLength = 20,
        boardWidth = 18,
        boardHeight = 21;

function draw_hexboard(canvas, ctx)
{

    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;


        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#CCCCCC";
        ctx.lineWidth = 1;

        drawBoard(ctx, boardWidth, boardHeight);

        //canvas.addEventListener("click", function(eventInfo) {
        //    var x,
        //        y,
        //        hexX,
        //        hexY,
        //        screenX,
        //        screenY,
        //        rect;
        //
        //    rect = canvas.getBoundingClientRect();
        //
        //    x = eventInfo.clientX - rect.left;
        //    y = eventInfo.clientY - rect.top;
        //
        //    hexY = Math.floor(y / (hexHeight + sideLength));
        //    hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);
        //
        //    screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
        //    screenY = hexY * (hexHeight + sideLength);
        //
        //    ctx.clearRect(0, 0, canvas.width, canvas.height);
        //
        //    drawBoard(ctx, boardWidth, boardHeight);
        //
        //    // Check if the mouse's coords are on the board
        //    if(hexX >= 0 && hexX < boardWidth) {
        //        if(hexY >= 0 && hexY < boardHeight) {
        //            ctx.fillStyle = "#000000";
        //            drawHexagon(ctx, screenX, screenY, true);
        //        }
        //    }
        //});
    }




function drawBoard(canvasContext, width, height)
{
        var i,
            j;

        for(i = 0; i < width; ++i) 
	{
            for(j = 0; j < height; ++j) 
	    {
		    var fill = false;
		    var x = i * hexRectangleWidth + ((j % 2) * hexRadius);
		    var y = j * (sideLength + hexHeight); 
		    for( var k = 0; k < path.length; k++)
		    {
			    if( x == path[k].x && y == path[k].y - 5 )//5 is rounded hexHeight / 2
				    fill = true;
		    }
                drawHexagon( canvasContext, x, y, fill );
            }
        }
}

function drawHexagon(canvasContext, x, y, fill)
{
	var fill = fill || false;

	canvasContext.beginPath();
	canvasContext.moveTo(x + hexRadius, y);
	canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
	canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
	canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
	canvasContext.lineTo(x, y + sideLength + hexHeight);
	canvasContext.lineTo(x, y + hexHeight);
	canvasContext.closePath();

	if(fill)
       	{
	    canvasContext.fill();
	}
       	else
       	{
	    canvasContext.stroke();
	}
}
