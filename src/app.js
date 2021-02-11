const canvas=document.getElementById('canvas')
const ctx=canvas.getContext('2d');

canvas.width=1510;
canvas.height=710;

let canvasPosition=canvas.getBoundingClientRect();

let gameFrame=0;
let score=0;

ctx.font='50px TimesNewRoman';

const mouse= {
    x:canvas.width/2,
    y:canvas.height/2,
    click:false,
}

canvas.addEventListener("mousedown",function(event){
    mouse.click=true;
    mouse.x=event.x-canvasPosition.left;
    mouse.y=event.y-canvasPosition.top;
});

canvas.addEventListener("mouseup",function(event){
    mouse.click=false;
});

class PlayerFish{
    constructor(){
        this.x=canvas.width/2;
        this.y=canvas.height/2;
        this.radius=50;
        }

    update(){
        const currentX=this.x-mouse.x;
        const currentY=this.y-mouse.y;

        if(mouse.x!=this.x){
            this.x-=currentX/20;
        }

        if(mouse.y!=this.y){
            this.y-=currentY/20;
        }
    }

    draw(){
        if(mouse.click){
            ctx.moveTo(this.x,this.y);
        }
        ctx.fillStyle="green";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}

 const player=new PlayerFish();

let preyFishes=[];

class PreyFish{
    constructor(){
        this.y=Math.random()*canvas.height;
        this.radius=50;
        this.x=-this.radius;
        this.speed=Math.random()*5+1;
        this.counted=false;
        this.distance;
    }

    update(){
        this.x+=this.speed;
    }

    draw(){
        ctx.fillStyle="blue";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}

function createPreyFish(){

    if(gameFrame % 75 == 0){
        preyFishes.push(new PreyFish());
    }

    for(let fish=0;fish<preyFishes.length;fish++){

        if(preyFishes[fish].x>canvas.width+this.radius){
        preyFishes.splice(fish,1);
        }
        
        preyFishes[fish].update();
        preyFishes[fish].draw();

        if(preyFishes[fish].distance < player.radius+preyFishes[fish].radius){
            this.score++;
        }
       
    }
}

let timer=0;
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    createPreyFish();
    player.update();
    player.draw();

    //to show the score
    ctx.fillStyle='orange';
    ctx.fillText("SCORE: "+score,50,70);

    //to show the timer
    ctx.fillStyle='orange';
    ctx.fillText("TIMER: "+timer,1150,70);

    gameFrame++;
    requestAnimationFrame(animate);
}
animate();