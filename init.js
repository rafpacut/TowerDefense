function Field()
{
	var number;
	var x;
	var y;
	var traversable = true;
	var ngbs = new Array();
}

function mob()
{
	var x;
	var y;
	var speed;
	var hp;
}


function init()
{
	//populate fields:
	// 12 x 12 fields 50px x 50px
	var fields = new Array();
	for( var i = 0; i < 12; i ++ )
	{
		for( var j = 0; j < 12; j++ )
		{
			var field = new Field();
			field.number = 12 * i + j;
			field.x = i * 50;
			field.y = j * 50;
			fields.push( field );
		}
	}
	for( j = 0; j <= fields.length; j++ )
	{

		for( var k = 0; k <= fields.length; k++ )
		{
			if( Math.abs( fields[j].x - fields[k].x ) == 50 || 
			    Math.abs( fields[j].y - fields[k].y ) == 50 )
			{
				//sa sasiadami:
				fields[j].ngbs.push( fields[k] );
			}
		}
	}
	for( j = 0; j <= fields.length; j++ )
	{
		console.log( "field: " + fields[j].number + "has ngbs: ");
		for( var k = 0; k <= fields[j].ngbs.length; k++ )
		{
			console.log(fields[j].ngbs[k].number + " ");
		}
	}




}



