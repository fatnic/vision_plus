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

function update() {
    vision.calc(allWallSegments());
}

function draw () {
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw walls
    for(var i = 0; i < Walls.length; i++) { Walls[i].draw(); }

    // Draw vision source
    DrawTools.circle(vision.source, 4, 'yellow');
}

function loop() {
    window.requestAnimationFrame(draw);
    update();
    draw();
}

window.onload = function() {
    vision.source.set(canvas.width/2, canvas.height/2);
    loop();
};