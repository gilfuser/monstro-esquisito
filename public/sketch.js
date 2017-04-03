var socket;
var bgColor;
var penColor;
var colors;
var lineThickness;
var lineColor;
var btnBg;
var canv;
var pg;
var myW;
var myH;

function setup() {
  colorMode(HSB);
  canv = createCanvas(windowWidth, windowHeight);
  canv.position(0, 0);
  var draw_here = select('.page-content');
  canv.parent(draw_here);
  canv.style('z-index', '-1');
  bgColor = [random(0,360), random(0,25), random(10,20)];
  lineColor = [random(0,360), random(25,100), random(50,100), 100];
  var bodycolor = select('body');
  bodycolor.style('background-color', color(bgColor[0], bgColor[1], bgColor[2]));
  socket = io.connect();
  socket.on('mouse', newDrawing);
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
  tSlider.parent('tslid');
  thickpoint = createDiv('');
  thickpoint.style("background-color", "white");
  thickpoint.parent('tpoint');/*
  pg = createGraphics(windowWidth, windowHeight);
  pg.parent(draw_here);
  draw_here.style('background-color', color(50, 50, 50, 0.5));*/
  draw_here.style('z-index', 5);
}

function newDrawing(data) {
  lineColor = [hSlider.value(), sSlider.value(), bSlider.value(), map(aSlider.value(), 0, 100, 0, 1)];
  strokeWeight(data.thickness);
  stroke(data.color[0], data.color[1], data.color[2], data.color[3]);
  pg.line(data.px, data.py, data.x, data.y );
}

function mouseDragged() {
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
  lineColor = [hSlider.value(), sSlider.value(), bSlider.value(),
    map(aSlider.value(), 0, 100, 0, 1)];
  strokeWeight(data.thickness);
  stroke(data.color[0], data.color[1], data.color[2], data.color[3]);
  line(pmouseX, pmouseY, mouseX, mouseY);
  brushColor.style("background-color",
  color(data.color[0], data.color[1], data.color[2], data.color[3]));
  thickpoint.style("width", lineThickness + "px");
  thickpoint.style("height", lineThickness + "px");
  thickpoint.style("border-radius", (lineThickness * 0.5) + "px");
}

function draw() {
  brushColor.style.backgroundColor = "hsb("+lineColor[0]+","+lineColor[1]+","+lineColor[2]+")";/*
  if (mouseIsPressed) {
    pg.line(pmouseX, pmouseY, mouseX, mouseY);
    image(pg, 0, 0, width, height);
  }*/

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);/*
  myW = windowWidth;
  myH = windowHeight;
  pg._renderer.resize(width>>1, height);
  console.log(pg.width);*/
}
