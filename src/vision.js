var Ray = { a: new Vec2(), b: new Vec2() };

function Vision(fov) {
    this.fov = (typeof(fov) === 'undefined') ? 60 : this.fov;
    this.polygon = [];
    this.heading = 0;
    this.source = new Vec2();
}

Vision.prototype = {

    uniquePoints: function(segments) {
        var a = [];
        for (var i = 0; i < segments.length; i++) { a.push(segments[i].a, segments[i].b); }
        // TODO: Make a unique Array ( i.e. a Set)
        return a;
    },

    calc: function(wallSegments) {
        var uniquePoints = this.uniquePoints(wallSegments);

        var fovMin = Tools.normaliseRadian(this.heading - (this.fov/2));
        var fovMax = Tools.normaliseRadian(this.heading + (this.fov/2));

        
    }
};
