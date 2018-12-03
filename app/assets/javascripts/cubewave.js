var angle = 0;
var w = 24;
var ya;
var yaxDist;
var xa;
var za;

function setup() {
  canvas = createCanvas(400, 400, WEBGL);
  canvas.parent("body-div");
  ya = atan(1/sqrt(2));
  yaxDist = dist(0, 0, 200, 200);
  xa = -QUARTER_PI
  za = 0;

  wSliderP = createP();
  wSliderP.parent("body-div");
  wSlider = createSlider(10, 100, 24, 2);
  wSlider.parent("body-div");

  aSliderP = createP();
  aSliderP.parent("body-div");
  aSlider = createSlider(-PI, PI, xa, 0.01);
  aSlider.parent("body-div");

  yaSliderP = createP();
  yaSliderP.parent("body-div");
  yaSlider = createSlider(-PI, PI, ya, 0.01);
  yaSlider.parent("body-div");

  zSliderP = createP();
  zSliderP.parent("body-div");
  zSlider = createSlider(-PI, PI, za, 0.01);
  zSlider.parent("body-div");
}

function draw() {
  background(xa*second() % 255,ya*second() % 255,za*second() % 255);
  ortho(-400, 400, -400, 400, 0, 1000);
  rotateY(ya);
  rotateX(xa);
  rotateZ(za);

  wSliderP.html("Width of cubes: " + w);
  w = wSlider.value();

  aSliderP.html("Angle of X rotation: " + xa.toFixed(2));
  xa = aSlider.value();

  yaSliderP.html("Angle of Y rotation: " + ya.toFixed(2));
  ya = yaSlider.value();

  zSliderP.html("Angle of Z rotation: " + za.toFixed(2));
  za = zSlider.value();


  for(var z = 0; z < height; z+=w) {
    for(var x = 0; x < width; x+=w) {
      push();
      var d = dist(x, z, width/2, height/2);
      var offset = map(d, 0, yaxDist, -PI, PI);
      var a = angle + offset;
      var h = floor(map(sin(a), -1, 1, 100, 300));
      translate(x - width/2, 0, z - height/2);
      normalMaterial();
      box(w-2, h, w-2);
      pop();
    }
  }

  angle -= 0.1;

}

