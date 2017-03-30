var socket;

var bgColor;
var penColor;
var colors;
var lineThickness;
var lineColor;
var btnBg;
var canv;

function setup() {
  canv = createCanvas(windowWidth, windowHeight);
  canv.parent('canvas');
  colorMode(HSB);

  bgColor = [random(0,360), random(0,25), random(10,20)];
  background(bgColor[0], bgColor[1], bgColor[2]);
  lineColor = [random(0,360), random(25,100), random(50,100), 100];
  //lineThickness = 100;

  socket = io.connect();
  socket.on('mouse', newDrawing);
  socket.on('background', changeBGcolor);


  brushColor = createDiv('#');
  brushColor.style("background-color", color(lineColor[0],lineColor[1], lineColor[2], lineColor[3] ));
  brushColor.style("color", color(0, 0 ));
  brushColor.parent('brushcolor');
  phue = createP('hue/tom');
  phue.parent('tom');
  hSlider = createSlider(0.0, 360.0, lineColor[0], 0);
  hSlider.parent('tom');
  psat = createP('saturation');
  psat.parent('sat');
  sSlider = createSlider(0.0, 100.0, lineColor[1], 0);
  sSlider.parent('sat');
  pbri = createP('brilho');
  pbri.parent('bri');
  bSlider = createSlider(0.0, 100.0, lineColor[2], 0);
  bSlider.parent('bri');
  ptransp = createP('transp.');
  ptransp.parent('alp');
  aSlider = createSlider(0.0, 100.0, lineColor[3], 0);
  aSlider.parent('alp');
  pthick = createP('thickness');
  pthick.parent('thickness');
  tSlider = createSlider(1, 40, 1, 0);
  tSlider.parent('thickness');
  // TO DO: Make a sample of the thickness
  /*
  sample = ellipse(0, 0, 20);
  sample.parent('thickness');
  */
  /*
  btnBg = createButton("bg-color");
  btnBg.mouseClicked(changeBGcolor);
  btnBg.parent('thickness');
  */
}
function newDrawing(data) {
  lineColor = [hSlider.value(), sSlider.value(), bSlider.value(), map(aSlider.value(), 0, 100, 0, 1)];
  strokeWeight(data.thickness);
  stroke(data.color[0], data.color[1], data.color[2], data.color[3]);
  line(data.px, data.py, data.x, data.y );
}

function touchStarted() {
// do some stuff
}

function touchMoved() {
  //update and send all data
  var data = {
    px: pmouseX,
    py: pmouseY,
    x: mouseX,
    y: mouseY,
    color: lineColor,
    thickness: lineThickness,
  }
  socket.emit('mouse', data);

  lineThickness = tSlider.value();
  lineColor = [hSlider.value(), sSlider.value(), bSlider.value(), map(aSlider.value(), 0, 100, 0, 1)];
  strokeWeight(data.thickness);
  stroke(data.color[0], data.color[1], data.color[2], data.color[3]);
  line(data.px, data.py, data.x, data.y );
  brushColor.style("background-color", color(data.color[0], data.color[1], data.color[2], data.color[3]));

  // TO DO! OTHER TOOLS
  //  noStroke();
  //  fill(255);
  //  ellipse(data.x, data.y, punktR, punktR);

  //return false;
}

function changeBGcolor() {
  var data = { color: lineColor };
  //  console.log("bg has changed: " + data.color[0] );
  bgColor = color(data.color[0], data.color[1], data.color[2], data.color[3]);
  background(bgColor);
  socket.emit('background', data);
}

function windowResized() {
  canv.resizeCanvas(windowWidth, windowHeight);

}

function draw() {
  //colorMode(RGB);
  brushColor.style.backgroundColor = "hsb("+lineColor[0]+","+lineColor[1]+","+lineColor[2]+")";

  //   colorMode(HSB);

}
/*

*/
