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

		for( var i = 0; i < mobs.length; i ++)
		{
			if( mobs[i].x != mobs[i].field.x && mobs[i].y != mobs[i].field.y )
			{
				mobs[i].x += 0.5;
				mobs[i].y += 0.5;
			}
		}



		//clear
		context.clearRect(0, 0, canvas.width, canvas.height );

		//draw
		for( var i = 0; i < mobs.length; i ++)
		{
			context.fillRect(mobs[i].x, mobs[i].y, 25, 12 );
		}


		requestAnimFrame( function() { animate( canvas, context ); } );
	}
	
	var canvas = document.getElementById('myCanvas');
	canvas.height = 600;
	canvas.width = 600;
	var context = canvas.getContext('2d');
	context.fillRect(550, 550, 25, 12 );

	animate( canvas, context );
}
