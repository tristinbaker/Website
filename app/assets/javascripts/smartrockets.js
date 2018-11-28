var population;
var lifespan = 400;
var lifeP;
var count = 0;
var target;
var maxforce = 0.2;
var minDist = 9999;
var generation = 0;
var tbl;

var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

function setup() {
  canvas = createCanvas(400, 300);
  canvas.parent("body-div");
  tbl  = document.createElement('table');
  lifeP = createP();
  lifeP.parent("body-div");

  population = new Population();
  target = createVector(width/2, 50);
	distFromObstToTarget = dist(rx, ry + rh, target.x, target.y);
  tableCreate();
}

function draw() {
  background(0);
  maxfit = population.run();
  lifeP.html('Days left: ' + (lifespan - count));

  count++;
  if(count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
		generation++;
		minDist = 9999;
    insertRow(generation, maxfit.toFixed(2));
  }

  fill(255);
  rect(rx, ry, rw, rh);

  ellipse(target.x, target.y, 16, 16);
}

function Population() {
  this.rockets = [];
  this.popsize = 25;
  this.matingPool = [];
  this.maxfit = 0;

  for(var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function() {
    this.maxfit = 0;
    for(var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if(this.rockets[i].fitness > this.maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }

    for(var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= this.maxfit;
    }

    this.matingPool = [];
    for(var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    }

    this.selection = function() {
      var newRockets = [];
      for(var i = 0; i < this.rockets.length; i++) {
        var parentA = random(this.matingPool).dna;
        var parentB = random(this.matingPool).dna;
        var child = parentA.crossover(parentB);
        child.mutation();
        newRockets[i] = new Rocket(child);
      }
      this.rockets = newRockets;
    }
  }


  this.run = function() {
    for(var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
    minDist = 9999;
    this.rockets[firstPlaceRocket].color = color(100, 100, 255, 150);
    this.rockets[firstPlaceRocket].show();
    return this.maxfit;
  }
}

function DNA(genes) {
  if(genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for(var i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(maxforce);
    }
  }

  this.crossover = function(partner) {
    var newgenes = [];
    var mid = floor(random(this.genes.length));
    for(var i = 0; i < this.genes.length; i++) {
      if(i > mid)  {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }

  this.mutation = function() {
    for(var i = 0; i < this.genes.length; i++) {
      if(random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }
}

function Rocket(dna) {
  this.pos = createVector(width/2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  this.crashed = false;
  this.distance = 10000;
  this.color = color(255, 150);

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.calcFitness = function () {
    this.calcDistance();

    this.fitness = map(this.distance, 0, width, width, 0);
    if(this.completed) {
      this.fitness *= 10;
    } 
    if(this.crashed) {
      this.fitness /= 10;
    }
  }

  this.calcDistance = function() {
    if(this.pos.y >= (ry + rh)) {
      lhs = dist(this.pos.x, this.pos.y, rx, ry + rh);
      rhs = dist(this.pos.x, this.pos.y, rx + rw, ry + rh);
      this.distance = distFromObstToTarget + min(lhs, rhs);
    } else {
      this.distance = dist(this.pos.x, this.pos.y, target.x, target.y);
    }

    this.distance = this.distance.toFixed(2);
  }

  this.update = function() {

    this.calcDistance();
    this.color = color(255, 150);

    if(minDist > this.distance) {
      minDist = this.distance;
      firstPlaceRocket = index;
    }

    if(this.distance < 10) {
      this.completed = true; 
      this.pos = target.copy();
    }

    if(this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
      this.crashed = true;
    }

    if(this.pos.x > width || this.pos.x < 0) {
      this.crashed = true;
    }
    if(this.pos.y > height || this.pos.y < 0) {
      this.crashed = true;
    }

		if(this.crashed) {
      this.color = color(255, 150);
    }

    this.applyForce(this.dna.genes[count]);
    if(!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }

  this.show = function() {
    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }
}

function tableCreate(){
  tbl.style.width  = '200px';
  tbl.style.border = '1px solid black';
  var header = tbl.createTHead();
  var row = header.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHTML = "Generation"
  cell = row.insertCell(1);
  cell.innerHTML = "Most Fit"
  document.getElementById("body-div").appendChild(tbl);
}

function insertRow(test, test1) {
  var tr = tbl.insertRow();
  var td = tr.insertCell();
  td.appendChild(document.createTextNode(test));
  td.style.border = '1px solid grey';
  td = tr.insertCell();
  td.appendChild(document.createTextNode(test1));
  td.style.border = '1px solid grey';
  document.getElementById("body-div").appendChild(tbl);
}

