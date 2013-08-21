function update()
{
	for( var i = 0; i < mobs.length; i ++)
	{
		if( Math.round(mobs[i].x) != mobs[i].field.x || Math.round(mobs[i].y) != mobs[i].field.y )
		{
			mobs[i].x += mobs[i].field_distx;
			mobs[i].y += mobs[i].field_disty;
		}
		else
		{
			var next_field = path.indexOf( mobs[i].field ) + 1;
			if( next_field < path.length )
			{
				mobs[i].field = path[ next_field ];
				mobs[i].field_distx = ( mobs[i].field.x -  mobs[i].x ) / 100;
				mobs[i].field_disty = ( mobs[i].field.y -  mobs[i].y ) / 100;

			}
		}
	}
}

function draw()
{
	draw_hexboard( canvas, context );

	context.fillStyle = 'yellow';
	context.fill();
	for( var i = 0; i < towers.length; i++)
	{
		drawHexagon( context, towers[i].x, towers[i].y, true );
	}

	for( var i = 0; i < mobs.length; i ++)
	{
		context.fillStyle = 'green';
		context.fill();
		context.fillRect(mobs[i].x, mobs[i].y, 25, 12 );
	}
}


function move()
{
	function animate( canvas, context)
	{
		// update
		window.requestAnimFrame = (function (callback)
				{
				return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame || window.msRequestAnimationFrame || function( callback ) 
					{
						window.setTimeout(callback, 1000 / 60);
					};
				})();

		update();

		context.clearRect(0, 0, canvas.width, canvas.height );

		draw();



		requestAnimFrame( function() { animate( canvas, context ); } );
	}
	context.fillRect(550, 550, 25, 12 );
	animate( canvas, context );
}

var canvas = document.getElementById('myCanvas');
canvas.height = 600;
canvas.width = 600;
var context = canvas.getContext('2d');

canvas.addEventListener("click", function(eventInfo) {
    var x,
	y,
	hexX,
	hexY,
	screenX,
	screenY,
	rect;

    rect = canvas.getBoundingClientRect();

    x = eventInfo.clientX - rect.left;
    y = eventInfo.clientY - rect.top;

    hexY = Math.floor(y / (hexHeight + sideLength));
    hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);

    screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
    screenY = hexY * (hexHeight + sideLength);

    // Check if the mouse's coords are on the board
    if(hexX >= 0 && hexX < boardWidth) {
	if(hexY >= 0 && hexY < boardHeight) 
	{
		var tower = new Tower( screenX, screenY );
		for( var i = 0; i < fields.length; i++)
		{
			if( Math.round(fields[i].x) == Math.round(screenX) && 
				Math.round(fields[i].y) == Math.round(screenY) + 5)
			{
				tower.field = fields[i];
				tower.field.traversable = false;
			}
		}
		prepare_grid();
		shortest_paths(fields, fields[0]);
		path = [];
		path = trace_back( fields[fields.length -1]);
		if( path.length > 1 )
		{
			towers.push( tower );
			tower.set_range();
		}
		else
		{
			tower.field.traversable = true;
			prepare_grid();
			shortest_paths( fields, fields[0] );
			path = [];
			path = trace_back( fields[ fields.length -1]);
		}



	}
    }
});
