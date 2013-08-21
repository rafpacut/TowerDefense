var fields = new Array();
var mobs = [];
var towers = [];

function Field(number, x, y)
{
	this.number = number;
	//center coords
	this.x = x;
	this.y = y;
	this.traversable = true;
	this.ngbs = new Array();
	this.distance = 99999;
	this.parentt = null;
	this.towers_in_range = [];

	this.squaredCenterDistance = function( field2 )
	{
		return (x-field2.x)*(x-field2.x)+(y-field2.y)*(y-field2.y);
	}
}

function Mob(x, y, field)
{
	this.x = x;
	this.y = y;
	this.field = field;
	this.field_distx = 0;
	this.field_disty = 0;
}

function Tower( x, y )
{
	this.x = x;
	this.y = y;
	this.field = null;
	this.locked = null;
	this.range = 3;

	this.set_range = function()
	{
		for( j = 0 ; j < fields.length; j++)
		{
			if( this.field.squaredCenterDistance( fields[j] ) <= this.range * 1225 )
			{
				fields[j].towers_in_range.push( this );
			}
		}

	}




}

function init_mobs( spawn_field )
{
	for( var i = 0; i < 1; i++ )
	{
		var mob = new Mob(spawn_field.x, spawn_field.y, spawn_field );
		mobs.push( mob );
	}
}


function init_fields()
{

	var hexHeight,
		hexRadius,
		hexRectangleHeight,
		hexRectangleWidth,
		hexagonAngle = 0.523598776, // 30 degrees in radians
		sideLength = 20,
		boardWidth = 17,
		boardHeight = 19;

	hexHeight = Math.sin(hexagonAngle) * sideLength;
	hexRadius = Math.cos(hexagonAngle) * sideLength;
	hexRectangleHeight = sideLength + 2 * hexHeight;
	hexRectangleWidth = 2 * hexRadius;

	var i,
	    j;

	for(i = 0; i < boardHeight; ++i) 
	{
	    for(j = 0; j < boardWidth; ++j) 
	    {
		    var x = j * hexRectangleWidth + ((i % 2) * hexRadius);
		    var y = i * (sideLength + hexHeight);
		var field = new Field( boardWidth * i + j, Math.round(x), Math.round(y) + 5 );
		fields.push( field );
	    }
	}
	// use squared distance between centers of hexagons to determine neighbourhood
	for( i = 0; i < fields.length; i++)
	{
		for( j = 0 ; j < fields.length; j++)
		{
			if( i != j )
			{
				//1225 is the distance between hexagons' centers of sideLength of 20
				if( fields[i].squaredCenterDistance( fields[j] ) <= 1225 )
				{
					fields[i].ngbs.push( fields[j] );
				}
			}
		}
	}




}


function init()
{
	//populate fields:
	// 12 x 12 fields 50px x 50px
	//for( var i = 0; i < 12; i ++ )
	//{
	//	for( var j = 0; j < 12; j++ )
	//	{
	//		var field = new Field(12 * i + j, i * 50, j * 50);
	//		fields.push( field );
	//	}
	//}
	//for( j = 0; j < fields.length; j++ )
	//{
	//	for( var k = 0; k < fields.length; k++ )
	//	{
	//		if( fields[j] !== fields[k] )
	//		{
        //
	//			if( Math.abs( fields[j].x - fields[k].x ) <= 50 && 
	//			    Math.abs( fields[j].y - fields[k].y ) <= 50 )
	//			{
	//				//sa sasiadami:
	//				fields[j].ngbs.push( fields[k] );
	//			}
	//		}
	//	}
	//}
	init_fields();
	init_mobs( fields[ fields.length - 1 ] );
}



