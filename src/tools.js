var RAD = 2 * Math.PI;

var Tools = {

    degreesToRadians: function(deg) {
        return deg * (Math.PI / 180);
    },

    normaliseRadian: function(rad) {
        var result = isNaN(rad) ? 0 : rad;
        result %= RAD;
        if (result < 0) {
            result += RAD;
        }
        return result;
    },

    radianBetween: function(rad, start, end) {
        rad = (RAD + (rad % RAD)) % RAD;
        start = (RAD + start) % RAD;
        end = (RAD + end) % RAD;
        if (start < end) return start <= rad && rad <= end;
        return start <= rad || rad <= end;
    },

    calcIntersection: function(ray, segment) {
        var r_px = ray.a.x;
        var r_py = ray.a.y;
        var r_dx = ray.b.x - ray.a.x;
        var r_dy = ray.b.y - ray.a.y;

        var s_px = segment.a.x;
        var s_py = segment.a.y;
        var s_dx = segment.b.x - segment.a.x;
        var s_dy = segment.b.y - segment.a.y;

        var r_mag = Math.sqrt(r_dx * r_dx + r_dy * r_dy);
        var s_mag = Math.sqrt(s_dx * s_dx + s_dy * s_dy);
        if (r_dx / r_mag == s_dx / s_mag && r_dy / r_mag == s_dy / s_mag) {
            return null;
        }

        var T2 = (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) / (s_dx * r_dy -
            s_dy * r_dx);
        var T1 = (s_px + s_dx * T2 - r_px) / r_dx;

        if (T1 < 0) return null;
        if (T2 < 0 || T2 > 1) return null;

        return {
            x: r_px + r_dx * T1,
            y: r_py + r_dy * T1,
            param: T1
        };
    },

    rotateArray: function(array, times) {
        while (times--) {
            var temp = array.shift();
            array.push(temp);
        }
    },

    findInArrayWithAttr: function(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
    },

    // TODO: Make this nor fucking horrible
    pointInPolygon: function(myPolygon,point) {
    var px = point.x;
    var py = point.y;
	var x;
	var y;
	var x1;
	var y1;
	var crossings=0;
	var verts=myPolygon.length;

//---Iterate through each line ---
	for ( var i = 0; i < verts; i++ )
	{
		var vertx=myPolygon[i].x;
		var verty=myPolygon[i].y;
		if(i<verts-1)
		{
			var vertxNext=myPolygon[i+1].x;
			var vertyNext=myPolygon[i+1].y;
		}
		else
		{
			var vertxNext=myPolygon[0].x;
			var vertyNext=myPolygon[0].y;
		}

	/* This is done to ensure that we get the same result when
	   the line goes from left to right and right to left */
		if ( vertx < vertxNext){
			x1 = vertx;
			x2 = vertxNext;
		} else {
			x1 = vertxNext;
			x2 = vertx;
		}

		/* First check if the ray is possible to cross the line */
		if ( px > x1 && px <= x2 && ( py < verty || py <= vertyNext ) ) {
	   	var eps = 0.000000001;

		/* Calculate the equation of the line */
		var dx = vertxNext - vertx;
		var dy = vertyNext - verty;
		var k;

		if ( Math.abs(dx) < eps ){
			k = Infinity;
		} else {
			k = dy/dx;
		}

			var m = verty - k * vertx;

			/* Find if the ray crosses the line */
			y2 = k * px + m;
			if ( py <= y2 ){
				crossings++;
			}
		}
	}
	//---odd number of crossings: point inside polygon--
	var crossFlag=(crossings/2)+"";
	if(crossFlag.indexOf(".")!=-1)
    	return true;
	else
    	return false;
}

};


//
//
//
//
// // *****************************************************
// function deg2rad(deg) {
//     return deg * (Math.PI / 180);
// }
//
// function rad2deg(rad) {
//     return rad * (180 / Math.PI);
// }
//
// function radNormalize(rad) {
//     var result = isNaN(rad) ? 0 : rad;
//     result %= RAD;
//     if (result < 0) {
//         result += RAD;
//     }
//     return result;
// }
//
// function degNormalize(deg) {
//     var result = isNaN(deg) ? 0 : deg;
//     result %= 360;
//     if (result < 0) {
//         result += 360;
//     }
//     return result;
// }
//
// function radBetween(rad, start, end) {
//     rad = (RAD + (rad % RAD)) % RAD;
//     start = (RAD + start) % RAD;
//     end = (RAD + end) % RAD;
//     if (start < end) return start <= rad && rad <= end;
//     return start <= rad || rad <= end;
// }
//
// function getIntersection(ray, segment) {
//
//     var r_px = ray.a.x;
//     var r_py = ray.a.y;
//     var r_dx = ray.b.x - ray.a.x;
//     var r_dy = ray.b.y - ray.a.y;
//
//     var s_px = segment.a.x;
//     var s_py = segment.a.y;
//     var s_dx = segment.b.x - segment.a.x;
//     var s_dy = segment.b.y - segment.a.y;
//
//     var r_mag = Math.sqrt(r_dx * r_dx + r_dy * r_dy);
//     var s_mag = Math.sqrt(s_dx * s_dx + s_dy * s_dy);
//     if (r_dx / r_mag == s_dx / s_mag && r_dy / r_mag == s_dy / s_mag) {
//         return null;
//     }
//
//     var T2 = (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) / (s_dx * r_dy -
//         s_dy * r_dx);
//     var T1 = (s_px + s_dx * T2 - r_px) / r_dx;
//
//     if (T1 < 0) return null;
//     if (T2 < 0 || T2 > 1) return null;
//
//     return {
//         x: r_px + r_dx * T1,
//         y: r_py + r_dy * T1,
//         param: T1
//     };
// }
//
// function pointInVision(poly, point){
//     for(var i=0; i < poly.length; i++){
//         if(i == poly.length - 1) continue;
//         t1 = Center;
//         t2 = poly[i];
//         t3 = poly[i+1];
//         if(pointInTriangle(point, t1, t2, t3)) return true;
//     }
//     return false;
// }
//
// function pointInTriangle(p, t1, t2, t3){
//     var d = ((t2.y-t3.y)*(t1.x-t3.x) + (t3.x-t2.x)*(t1.y-t3.y));
//
//     var a = ((t2.y-t3.y)*(p.x-t3.x) + (t3.x-t2.x)*(p.y-t3.y)) / d;
//     var b = ((t3.y-t1.y)*(p.x-t3.x) + (t1.x-t3.x)*(p.y-t3.y)) / d;
//     var c = 1 - a - b;
//
//     return 0 <= a && a <= 1 && 0 <= b && b <= 1 && 0 <= c && c <= 1;
// }
