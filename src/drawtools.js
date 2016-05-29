var DrawTools = {

    circle: function(position, radius, colour) {
        ctx.fillStyle = colour;
        ctx.beginPath();
    	ctx.arc(position.x, position.y, radius, 0, RAD, false);
        ctx.fill();
    },

    ring: function(position, radius, colour, thickness) {
        ctx.strokeStyle = colour;
        ctx.lineWidth = (typeof(thickness) === 'undefined') ? 2 : thickness;
        ctx.beginPath();
    	ctx.arc(position.x, position.y, radius, 0, RAD, false);
        ctx.stroke();
    },

    ringedCircle: function(position, radius, circleColour, ringColour, thickness) {
        this.circle(position, radius, circleColour);
        this.ring(position, radius, ringColour, thickness);
    },

    polygon: function(polygon, colour) {
        ctx.fillStyle = colour;
        ctx.moveTo(polygon[0].x, polygon[0].y);
        for (var i = 1; i < polygon.length; i++) {
            ctx.lineTo(polygon[i].x, polygon[i].y);
        }
        ctx.fill();
    }
};
