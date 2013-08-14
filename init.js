var fields = new Array();
var mobs = [];
function Field(number, x, y)
{
//	var number;
//	var x;
//	var y;
//	var traversable = true;
//	var ngbs = new Array();
//	var distance = 999999;
//	var parentt;
	this.number = number;
	this.x = x;
	this.y = y;
	this.traversable = true;
	this.ngbs = new Array();
	this.distance = 99999;
	this.parentt = null;
}

function Mob(x, y, field)
{
	this.x = x;
	this.y = y;
	this.field = field;
}

function init_mobs( spawn_field )
{
	for( var i = 0; i < 1; i++ )
	{
		var mob = new Mob(spawn_field.x, spawn_field.y, spawn_field );
		mobs.push( mob );
	}
}


function init()
{
	//populate fields:
	// 12 x 12 fields 50px x 50px
	for( var i = 0; i < 12; i ++ )
	{
		for( var j = 0; j < 12; j++ )
		{
			var field = new Field(12 * i + j, i * 50, j * 50);
			fields.push( field );
		}
	}
	for( j = 0; j < fields.length; j++ )
	{
		for( var k = 0; k < fields.length; k++ )
		{
			if( fields[j] !== fields[k] )
			{

				if( Math.abs( fields[j].x - fields[k].x ) <= 50 && 
				    Math.abs( fields[j].y - fields[k].y ) <= 50 )
				{
					//sa sasiadami:
					fields[j].ngbs.push( fields[k] );
				}
			}
		}
	}
	init_mobs( fields[ fields.length - 1 ] );
}



