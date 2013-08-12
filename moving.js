function move()
{

	window.requestAnimFrame = (function (callback)
			{
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame || window.msRequestAnimationFrame || function( callback ) 
				{
					window.setTimeout(callback, 1000 / 60);
				};
			})();

	var moves = new Array( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
	var moves2 = new Array( 1, 5, 2, 6 );

	var x = 100;
	var y = 100;
	var dx = 0;
	var dy = 0;
	var width = 25;
	var height = 12;
	var it = 0;
	var distance = 30; // distance per move
	var speed = 0.5;

	function animate( it, canvas, context )
	{
		switch( moves[it] )
		{
			case 1: 
					dx -= speed; break;
			case 2:
					dx -= speed;
					dy -= speed;break;
			case 3:
					dy -= speed;break;
			case 4:
					dx += speed;
					dy -= speed;break;
			case 5:
					dx += speed;break;
			case 6:
					dx += speed;
					dy += speed; break;
			case 7:
					dy += speed; break;
			case 8:
					dx -= speed;
					dy += speed;break;
			case 9:
					break;
		}
		if( it < 8 && Math.abs( dx ) > distance || Math.abs ( dy ) > distance )
		{
			it += 1;

			x += dx;
			dx = 0;
			y += dy;
			dy = 0;
		}

		context.clearRect(0, 0, canvas.width, canvas.height );

		context.fillRect(x + dx, y + dy, width, height );

		if( x + dx + width < canvas.width && y + dy + height < canvas.height && x + dx > 0 && y + dy > 0 )
			requestAnimFrame( function() { animate( it, canvas, context ); } );
		
	}

	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	animate( it, canvas, context );
}
