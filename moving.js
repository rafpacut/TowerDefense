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



		//clear
		context.clearRect(0, 0, canvas.width, canvas.height );

		//draw
		//for( var i = 0; i < fields.length; i++ )
		//{
		//	context.beginPath();
		//	context.rect(fields[i].x, fields[i].y, 50, 50);
		//	context.lineWidth = 2;
		//	context.strokeStyle = 'black';
		//	context.stroke();
		//}
		draw_hexboard( canvas, context );

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
