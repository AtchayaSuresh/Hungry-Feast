const canvas=document.getElementById('canvas')
const ctx=canvas.getContext('2d');

canvas.width=1500;
canvas.height=600;

let canvasPosition=canvas.getBoundingClientRect();

const mouse= {
    x:canvas.width/2,
    y:canvas.height/2,
    click:false,
}

canvas.addEventListener("mousedown",function(event){
    mouse.click=true;
    mouse.x=event.x-canvasPosition.left;
    mouse.y-event.y-canvasPosition.right;
});

canvas.addEventListener("mouseup",function(event){
    mouse.click=false;
});

class playerFish{
    constructor(){
        this.x=canvas.width;
        this.y=canvas.height/2;
        this.radius=50;
        this.frame=0;
        this.frameX=0;
        this.frameY=0;
        this.angle=0;
    }

    update(){
        const currentX=this.x-mouse.x;
        const currentY=this.y-mouse.y;

        if(mouse.x!=this.x){
            this.x-=currentX/30;
        }

        if(mouse.y!=this.y){
            this.y-=currentY/30;
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

const player=new playerFish();

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.update();
    player.draw();
    requestAnimationFrame(animate);
}
animate();