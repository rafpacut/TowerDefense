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


function init()
{
	//populate fields:
	// 12 x 12 fields 50px x 50px
	var fields = new Array();
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



}



