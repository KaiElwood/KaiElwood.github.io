class Particle {
  
    constructor(PosX, PosY, strokeWeight, colorULimitR, colorULimitG, colorULimitB) {
      
      this.position = createVector(PosX, PosY);
      // this.position = createVector(PosX, PosY, PosZ);
      
      this.velocity = p5.Vector.random2D();
      
      this.acceleration = createVector(0,0);
      
      this.maxSpeed = 1;
      
      this.strokeWeight = strokeWeight;
      
      this.colorA = 255;
      this.colorAChange = -1;
      this.colorChange = 2;
      
      this.colorULimitR = colorULimitR;
      this.colorULimitG = colorULimitG;
      this.colorULimitB = colorULimitB;
      this.colorLLimitR = 50;
      this.colorLLimitG = 50;
      this.colorLLimitB = 50;
      
      this.prevPos = this.position.copy();
      
      this.colorNoise0 = random(10);
      this.colorRed = this.colorNoise0*25;
      
      this.colorNoise1 = random(10);
      this.colorGreen = this.colorNoise1*25;
      
      this.colorNoise2 = random(10);
      this.colorBlue = this.colorNoise2*25;
    }
    
  //   updates the velocity and position of each particle
    update() {
      this.velocity.add(this.acceleration);
      
      this.velocity.limit(this.maxSpeed);
      
      this.position.add(this.velocity);
      
      this.acceleration.mult(0);
      
    }
    
    
    follow(vectors, scl) {
      var x = floor(this.position.x/scl);
      var y = floor(this.position.y/scl);
      // var z = floor(this.position.z/scl);
      
      var i = x + y*cols;
      var force = vectors[i];
      this.applyForce(force);
    }
    
    applyForce(force) {
      this.acceleration.add(force);
    }
    
    // changeColor() {
    //   this.colorA += this.colorAChange;
    //   if(this.colorA < 1) {
    //     this.colorA = 255;
    //   }
    // }
    
    changeColor() {
      this.colorRed = (this.colorRed > this.colorULimitR) ? this.colorLLimitR : this.colorRed + noise(this.colorChange)*this.colorChange;
      this.colorGreen = (this.colorGreen > this.colorULimitG) ? this.colorLLimitG : this.colorGreen + noise(this.colorChange)*this.colorChange;
      this.colorBlue = (this.colorBlue > this.colorULimitB) ? this.colorLLimitB : this.colorBlue + noise(this.colorChange)*this.colorChange;
    }
    
    updatePrev() {
      this.prevPos.x = this.position.x;
      this.prevPos.y = this.position.y;
    }
    
    edges(limitX1, limitX2, limitY1, limitY2) {
      if(this.position.x > limitX2) {
        this.position.x = limitX1;
        this.updatePrev();
      }
      if(this.position.x < limitX1) {
        this.position.x = limitX2;
        this.updatePrev();
      }
      if(this.position.y > limitY2) {
        this.position.y = limitY1;
        this.updatePrev();
      }
      if(this.position.y < limitY1) {
        this.position.y = limitY2;
        this.updatePrev();
      }
    }
    
    show() {
      this.changeColor();
      
      stroke(this.colorRed, this.colorGreen, this.colorBlue);
      // stroke(this.colorA, this.colorRed, this.colorGreen, this.colorBlue);
      
  //     can switch up stroke weighting
      strokeWeight(this.strokeWeight);
      
  //     could also add in a third dimension here
      line(this.position.x, this.position.y, this.prevPos.x, this.prevPos.y);
      
      this.updatePrev();
    }
    
  }