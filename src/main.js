var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var Walls = [];

Walls.push(new Wall(0, 0, canvas.width, canvas.height, false));
Walls.push(new Wall(50,50,100,200));
Walls.push(new Wall(850,50,50,400));
Walls.push(new Wall(750,50,50,400));
Walls.push(new Wall(250,50,100,50));
Walls.push(new Wall(650,50,100,50));
Walls.push(new Wall(400,50,100,50));
Walls.push(new Wall(750,480,150,50));

wallByGrid(4, 20, 12, 1);
wallByGrid(4, 30, 12, 1);
wallByGrid(4, 21, 1, 9);
wallByGrid(15, 21, 1, 3);
wallByGrid(15, 27, 1, 3);

var vision = new Vision();
var player = new Vec2(180,180);

function update() {

    if (Key.isDown(Key.LSqrBrkt)) vision.incFOV(-2);
    if (Key.isDown(Key.RSqrBrkt)) vision.incFOV(2);

    vision.calc(allWallSegments());
    var colour = (vision.contains(player)) ? 'rgba(255,0,0,0.3)' : 'rgba(255,255,255,0.5)';
    vision.setColour(colour);
}

function draw () {
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw walls
    for(var i = 0; i < Walls.length; i++) { Walls[i].draw(); }

    // Draw vision polygon
    DrawTools.polygon(vision.polygon, vision.colour);
    
    // Draw vision source
    DrawTools.circle(vision.source, 4, 'yellow');

    // Draw player
    DrawTools.circle(player, 4, 'green');
}

function loop() {
    window.requestAnimationFrame(loop);
    update();
    draw();
}

canvas.onmousemove = function(event) {
    vision.heading = vision.source.angleTo(new Vec2(event.clientX, event.clientY));
};

canvas.onclick = function(event) {
    vision.source.set(event.clientX, event.clientY);
};

window.onload = function() {
    loop();
};
