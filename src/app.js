const ocean=document.getElementById('underwater')
const oceanSpace=ocean.getContext('2d');

ocean.width=1510;
ocean.height=710;

let oceanPosition=ocean.getBoundingClientRect();

let gameFrame=0;
let score=0;
let seconds=60;
if(sessionStorage.getItem("highScore")==null)
sessionStorage.setItem("highScore", 0);

oceanSpace.font='50px TimesNewRoman';

const mouse= {
    x:ocean.width/2,
    y:ocean.height/2,
    click:false,
}

ocean.addEventListener("mousedown",function(event){
    mouse.click=true;
    mouse.x=event.x-oceanPosition.left;
    mouse.y=event.y-oceanPosition.top;
});

ocean.addEventListener("mouseup",function(event){
    mouse.click=false;
});

const playerFishLeft=new Image();
playerFishLeft.src='images/playerFishLeft.png';
const playerFishRight=new Image();
playerFishRight.src='images/playerFishRight.png';

const preyFish=new Image();
preyFish.src='images/preyFish.png';


class PlayerFish{
    constructor(){
        this.x=ocean.width/2;
        this.y=ocean.height/2;
        this.radius=50;
        this.angle=0;
    }

    update(){
        const currentX=this.x-mouse.x;
        const currentY=this.y-mouse.y;

        //update angle of the fish
        this.angle=Math.atan2(currentY,currentX);

        if(mouse.x!=this.x){
            this.x-=currentX/20;
        }

        if(mouse.y!=this.y){
            this.y-=currentY/20;
        }
    }

    draw(){
        if(mouse.click){
            oceanSpace.moveTo(this.x,this.y);
        }

        //to make the fish turn towards the prey
        oceanSpace.save();
        oceanSpace.translate(this.x,this.y);
        oceanSpace.rotate(this.angle);

        if(this.x>=mouse.x)
        oceanSpace.drawImage(playerFishLeft,-80,-80);
        else
        oceanSpace.drawImage(playerFishRight,-80,-80);

        //restore previous ocean settings
        oceanSpace.restore();
    }
}

const player=new PlayerFish();

let preyFishes=[];

class PreyFish{
    constructor(){
        this.y=Math.random()*ocean.height;
        this.radius=70;
        this.x=-this.radius;
        this.speed=Math.random()*5+1;
        this.counted=false;
        this.distance;
    }

    update(){
        this.x+=this.speed;
        let currentX=this.x-player.x;
        let currentY=this.y-player.y;
        this.distance=Math.sqrt(currentX*currentX + currentY*currentY);
        
    }

    draw(){
        oceanSpace.drawImage(preyFish,this.x-80,this.y-70);
    }
}

function createPreyFish(){

    if(gameFrame % 75 == 0){
        preyFishes.push(new PreyFish());
    }

    for(let fish=0;fish<preyFishes.length;fish++){

        let preyFish=preyFishes[fish];
        preyFish.update();
        preyFish.draw();
        
        if(preyFish.x>ocean.width+this.radius){
            preyFishes.splice(fish,1);
            fish--;
            }
        else if(preyFish.counted==false && preyFish.distance < player.radius + preyFish.radius){
            score++;
            preyFish.counted=true;
            preyFishes.splice(fish,1);
            fish--;
        }
       
    }
    
}

let timer = setInterval(function(){
    if(seconds==0){
        if(score>sessionStorage.getItem("highScore"))
        sessionStorage.setItem("highScore",score);
        
        document.getElementById("gameSummary").style.display = "block";
        document.getElementById("gameScore").innerHTML = "YOUR SCORE: "+ score;
        document.getElementById("highScore").innerHTML = "HIGH SCORE: "+sessionStorage.getItem("highScore");
    }
    seconds--;
}, 1000);

function animate(){
    oceanSpace.clearRect(0,0,ocean.width,ocean.height);
    createPreyFish();
    player.update();
    player.draw();
    //timer();

    //to show the score
    oceanSpace.fillStyle='white';
    oceanSpace.fillText("SCORE: "+score,50,70);

    //to show the timer
    oceanSpace.fillStyle='white';
    oceanSpace.fillText("TIMER: "+seconds,1200,70);

    //to show High Score
    oceanSpace.fillStyle='white';
    oceanSpace.fillText("HIGH SCORE: "+sessionStorage.getItem("highScore"),560,70);

    console.log(sessionStorage.getItem("highScore")+score);
    if(seconds==0)
    return;

    gameFrame++;
    requestAnimationFrame(animate);
}
animate();