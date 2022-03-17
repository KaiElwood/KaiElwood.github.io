// canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const mouse  = {x : 0, y : 0}
const pMouse = {x:0, y:0};
function mouseEvents(e){
	mouse.x = e.pageX;
	mouse.y = e.pageY;
    // console.log(mouse)
}

document.addEventListener("mousemove", mouseEvents);

// defining additional functions to add to the Math function library
Math.TAU = Math.PI * 2;
Math.rand = (min, max) => Math.random() * (max - min) + min;
// adding capability to make vector object
const Vec = (x, y) => ({x,y});
const mousePos = Vec(0,0);
const particleSystems = [];
var repeller, numDraws = 0, width, height;

setTimeout(setup, 0);

function setup() {
    width = canvas.width = innerWidth;
    height = canvas.height = innerHeight;

    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    particleSystems.push(Particles({origin : Vec(width / 5, height / 2), min: Vec(-4,-4), max: Vec(0, 4)}, "#00F",  [repeller, rightAttractor]));

    // I guess this sets up the animation capabilities that p5 has
    requestAnimationFrame(draw);
}

function draw(){
    if (width !== window.innerWidth || height !== window.innerHeight) { // check for resize
        console.log("Resizing")
        setTimeout(setup, 0); 
        return;
    }



    pMouse = mouse;
    requestAnimationFrame(draw);
}

function Particle() {}
Particle.prototype = { // Use prototype when creating many instances
    init(emitter) {
        this.x = emitter.origin.x;
        this.y = emitter.origin.y;
        this.life = 255;
        this.mass = 5;
        this.vx = Math.rand(emitter.min.x, emitter.max.x); 
        this.vy = Math.rand(emitter.min.y, emitter.max.y); 
        this.ay = this.ax = 0;
    },
    display() {
        const size = (this.life / 255) * 4; 
        if (size < 2) { // draw faster rect when too small to discern
            ctx.rect(this.x - size / 2, this.y - size / 2, size, size)
        } else {
            ctx.moveTo(this.x + size, this.y);
            ctx.arc(this.x, this.y, size, 0, Math.TAU);
        }
    },
    update() { // return true if dead
        this.x += (this.vx += this.ax);
        this.y += (this.vy += this.ay);
        this.ay = this.ax = 0;
        return (this.life -= 1.5) <= 0;
    },
}
