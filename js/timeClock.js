let scl = 200;
let rows, cols;
let particleClouds = [];
let colorRanges = [[255, 200, 200, 210, 130, 240], [175, 225, 255, 100, 150, 175], [255, 255, 10, 250, 150, 5], [183,246,254,145,177,220], [225,230,255,10,30,26], [225,230,255,10,30,26], [255, 176,140,0,100,70], [188, 150, 230, 100, 120, 200], [225, 100, 60, 200, 50, 0]];
let selectedColorRange;
let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

let flowField;
let numParticles = 100;
let numPClouds = 30;
let cloudsPerMinute = 60/numPClouds;
let currentCloud;
let lastCheck = 0;
let ellapsedTime = 0;
let minuteTime = 0;
let takeScreenshot = true;
let startTime = 0;
let iterator = 0;
let bandWidth = 20;

let angleMult;
let xoff = 0.5;
let yoff = 0;
let zoff = 0;

function setup() {
    var myCanvas = createCanvas(wWidth, wHeight);
    myCanvas.parent("parent");
  // createCanvas(1000, 1000, WEBGL);
  background(0);
  
  angleMult = radians(1520);
  
  cols = round(width / scl);
  rows = round(height / scl);
  
  flowField = new Array(cols*rows);
  
  for (let i=0; i<numPClouds; i++) {
    // particleClouds[i] = new ParticleCloud(numParticles, random(width), random(height), 60, (height/numPClouds)*i+1);
    particleClouds[i] = new ParticleCloud(
      numParticles, 
      ((width/numPClouds)*(i)+((width/numPClouds)/2)-width/2), 
      0, 
      bandWidth, 
      (height/numPClouds)*(i+1),
      250,
      190,
      239
    );
  }
  
}

function draw() {
  noFill();
  translate(width/2, height/2)
  rotate((PI/30)*minuteTime);
  
//   FORCE FIELD
  angleMult = angleMult + radians(30);
  for (let y=-rows/2; y<rows/2; y++) {
    for (let x=-cols/2; x<cols/2; x++) {
      let index = (x + y * cols);
      let angle = noise(xoff, yoff, zoff) * angleMult;
      
      let v = p5.Vector.fromAngle(angle);
      v.setMag(.1);
      flowField[index] = v;
      
      // xoff += .1;
      yoff += 15;
      zoff += .1;
    }
  }
  
//   GET TIMEf
  ellapsedTime = second();
  minuteTime = minute();
  
  //   ACT ON CLOUD
  currentCloud = round(map(ellapsedTime, 0, 59, 0, numPClouds-1));
  particleClouds[currentCloud].moveParticles(flowField, scl);
  
  
  if(ellapsedTime == 1) {
    takeScreenshot = true;
  }
  if(ellapsedTime == 0 && takeScreenshot) {
    reset();
    // startTime = ellapsedTime;
    // ellapsedTime = ellapsedTime - startTime;
    noStroke();
    fill(0, 180)
    // rect(-width/2,-height/2,width,height);
    selectedColorRange = floor(random(colorRanges.length));
    for(let i = 0; i<numPClouds; i++) {
      rectMode(CENTER);
      rect(((width/numPClouds)*(i)+((width/numPClouds)/2)-width/2)-1, -2.5, bandWidth+4, (height/numPClouds)*(i+1)+8);
      particleClouds[i].colorChangeParticles(colorRanges[selectedColorRange][0], colorRanges[selectedColorRange][1], colorRanges[selectedColorRange][2], colorRanges[selectedColorRange][3], colorRanges[selectedColorRange][4], colorRanges[selectedColorRange][5]);
    }
    iterator = 0;
  }
  
}

function windowResized() {
    background(0);
  
    angleMult = radians(1520);
    
    cols = round(width / scl);
    rows = round(height / scl);
    
    flowField = new Array(cols*rows);
    
    for (let i=0; i<numPClouds; i++) {
      // particleClouds[i] = new ParticleCloud(numParticles, random(width), random(height), 60, (height/numPClouds)*i+1);
      particleClouds[i] = new ParticleCloud(
        numParticles, 
        ((width/numPClouds)*(i)+((width/numPClouds)/2)-width/2), 
        0, 
        bandWidth, 
        (height/numPClouds)*(i+1),
        250,
        190,
        239
      );
    }
    resizeCanvas(windowWidth, windowHeight);
}

function reset() {
  takeScreenshot = false;
}