class ParticleCloud {
  
    constructor(NumParticles, PosX, PosY, limX, limY, colorULimitR, colorULimitG, colorULimitB) {
      
      this.position = createVector(PosX, PosY);
      // this.position = createVector(PosX, PosY, PosZ);
      this.particles = [];
      
      this.limX1 = PosX-limX/2;
      this.limX2 = PosX+limX/2;
      this.limY1 = PosY-limY/2;
      this.limY2 = PosY+limY/2;
      this.moves = true;
      
      this.strokeWeight = 2;
      
      for (let i=0; i<NumParticles; i++) {
        // this.particles[i] = new Particle(random(PosX-limX/4,PosX+limX/4), random(PosY-limY/4,PosY+limY/4), this.strokeWeight);
        this.particles[i] = new Particle(this.position.x, this.position.y, this.strokeWeight, colorULimitR, colorULimitG, colorULimitB);
      }
    }
    
    moveParticles(flowField, scl) {
      
      if (this.moves){
        
          for (let i = 0; i<this.particles.length; i++) {
          this.particles[i].follow(flowField, scl);
          this.particles[i].edges(this.limX1, this.limX2, this.limY1, this.limY2);
          this.particles[i].show();
          this.particles[i].update();
        }
        
      }
      
    }
    
    stayParticles() {
      
      this.moves = false;
      
    }
    
    colorChangeParticles(newULimitR, newULimitG, newULimitB, newLLimitR, newLLimitG, newLLimitB) {
      
      for (let i = 0; i<this.particles.length; i++) {
          this.particles[i].colorULimitR = newULimitR;
          this.particles[i].colorULimitG = newULimitG;
          this.particles[i].colorULimitB = newULimitB;
          this.particles[i].colorLLimitR = newLLimitR;
          this.particles[i].colorLLimitG = newLLimitG;
          this.particles[i].colorLLimitB = newLLimitB;
        }
      
    }
  
  
  }