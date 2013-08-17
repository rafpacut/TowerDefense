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
		    //coloring the path
		    for( var k = 0; k < path.length; k++)
		    {
			    if( Math.round(x) == path[k].x && Math.round(y) == path[k].y - 5 )//5 is rounded hexHeight / 2
				    fill = true;
		    }
		    //----
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
