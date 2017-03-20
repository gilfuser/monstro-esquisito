var socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);

  socket = io.connect('https://localhost:5000');
  socket.on('mouse', newDrawing);
}

function newDrawing(data) {
  noStroke();
  fill(255, 0, 100);
  ellipse(data.x, data.y, 20, 20);

}

function mouseDragged () {
  console.log('Sending: ' + mouseX + ' , ' + int(mouseY));
  var data = {
    x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data);

    noStroke();
    fill(255);
    ellipse(data.x, data.y, 20, 20);
}

function draw() {
}
