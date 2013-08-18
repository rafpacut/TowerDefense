function prepare_grid()
{
	for(var k = 0; k < fields.length; k++)
	{
		fields[k].distance = 999999;
		fields[k].parentt = null;
	}
}

function find_minimal( Q )
{
	var minimal = Q[0];
	for( var i = 0; i < Q.length; i++ )
	{
		if( minimal.distance > Q[i] && minimal != Q[i] )
		{
			minimal = Q[i];
		}
	}
	return minimal;
}




function shortest_paths( graph, source )
{
	var Q = new Array();
	source.distance = 0;	
	Q = graph.slice();
	while( Q.length > 0 )
	{
		var actual = find_minimal( Q );
		var index = Q.indexOf( actual );
		Q.splice( index,1 );
		for( var i = 0; i < actual.ngbs.length; i ++ )
		{
			if( actual.ngbs[i].traversable )
			{
				if( actual.distance + 1 < actual.ngbs[i].distance )
				{
					actual.ngbs[i].distance = actual.distance + 1;
					actual.ngbs[i].parentt = actual;
				}
			}
		}
	}
}

function trace_back( target )
{
	var path = [];
	var actual = target;
	path.push( actual );
	while( actual.parentt != null )
	{
		actual = actual.parentt;
		path.push( actual );
	}
	return path;
}

