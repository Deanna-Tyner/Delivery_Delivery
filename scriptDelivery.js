var myGamePiece;
var flyingEnemy = [];
var walkingEnemy = [];
var lives;
var livesRemain = 3;
var jumpPowerUp = [];
var sheildPowerUp = [];
var storedPowerUp = [];
var cooldown = 0;
var invincCooldown = 0;
var endOfLevel = null;



function startBaseGame() {


    document.getElementById("bGame").style.display = "none";
    document.getElementById("endless").style.display = "none";
    document.getElementById("head").style.display = "none";
        
    document.getElementById("cred").style.display = "none";       
    document.getElementById("main").style.display = "block";

    document.getElementById("menu").style.display = "none";
    document.getElementById("credButton").style.display = "none";
    myGamePiece = new component(100, 150, "Molly-Stand.png", 0, 450, "image");
    background = new animateBackground(900, 500, 'DeliveryDelivery-Background.png', 0, 0, "back");

    lives = new livesCounter ("30px", "Consolas", "black", 280, 40, "text");
 
    setTimeout(() => {endOfLevel = new end(700, 700, "End-House.png", 850, -200, "image");}, 150000)

    myGameArea.start();



   
}

function startEndlessMode() {

    
    document.getElementById("bGame").style.display = "none";
    document.getElementById("endless").style.display = "none";
    document.getElementById("head").style.display = "none";
        
    document.getElementById("cred").style.display = "none";       
    document.getElementById("main").style.display = "block";

    document.getElementById("menu").style.display = "none";
    document.getElementById("credButton").style.display = "none";
    myGamePiece = new component(100, 150, "Molly-Stand.png", 0, 450, "image");
    background = new animateBackground(900, 500, 'DeliveryDelivery-Background.png', 0, 0, "back");

    lives = new livesCounter ("30px", "Consolas", "black", 280, 40, "text");


    myGameArea.start();


}

var myGameArea = {
    canvas : document.getElementById("canvas"),
    start : function() {
        this.canvas.width = 750;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNum = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
            myGamePiece.image.src = "Molly-Stand.png";
        })
    }, 
    stop : function() {
        clearInterval(this.interval);
    },  
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function animateBackground(width, height, color, x, y, type)
{
    this.type = type;
    if (type == "image" || type == "back") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image" || type == "back") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        if (type == "back") {
            ctx.drawImage(this.image, 
                this.x + this.width, 
                this.y,
                this.width, this.height);
        }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "back") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    }

}



function end(width, height, color, x, y, type)
{
    this.type = type;
    if (type == "image" || type == "back") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.hit = false; 

    this.update = function(){
        ctx = myGameArea.context;
        if (type == "image" || type == "back") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        if (type == "back") {
            ctx.drawImage(this.image, 
                this.x + this.width, 
                this.y,
                this.width, this.height);
        }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

    }

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "back") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
        }



}

function final()
{

    if(endOfLevel)
    {

     endOfLevel.speedX = -1;  
     endOfLevel.newPos(); 
     endOfLevel.update();
     

    if(collision(myGamePiece, endOfLevel) == true)
    {
        console.log("end is here");
        myGameArea.stop();
        return;
    }       
    }

}

function enemy(width, height, color, x, y)
{
 
    this.image = new Image();
    this.image.src = color;
    
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.levelEnd = false;

    this.update = function(){
        ctx = myGameArea.context;
     
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
  
   

    }

        this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "back") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
        }
}



function powerUp(width, height, color, x, y, powerType, type)
{
    this.powerType = powerType;
    this.type = type;
            if (type == "image" || type == "back") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;  
    this.powerUpActive = true;
    this.visible = true;

    this.update = function(){
          ctx = myGameArea.context;
        if (type == "image" || type == "back") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        if (type == "background") {
            ctx.drawImage(this.image, 
                this.x + this.width, 
                this.y,
                this.width, this.height);
        }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

    }

    this.powerInStorage = function(){

        if(storedPowerUp.length == 0)
        {
            storedPowerUp.push(powerType);
            this.active = false;
            console.log(this.powerType + " has been stored");
            //console.log(storedPowerUp.length);
        }

    }

    this.newPos = function() {
        
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "back") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
        }


}




function component(width, height, color, x, y, type) {
    this.type = type;
        if (type == "image" || type == "back") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;  
    this.gravity = 0.2;
    this.gravitySpeed = 0;
    this.jumping = false;
    this.shrink = false;
    this.update = function() {
         ctx = myGameArea.context;
        if (type == "image" || type == "back") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        if (type == "background") {
            ctx.drawImage(this.image, 
                this.x + this.width, 
                this.y,
                this.width, this.height);
        }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;

        this.hitBottom();        
    }

    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
            this.jumping = false;
            this.speedX *= 0.9;
            }

    }

}



function livesCounter(width, height, color, x, y, type)
{
    
    this.width = width;
    this.height = height;  
    this.x = x;
    this.y = y;

    this.update = function()
    {
        ctx = myGameArea.context;
 
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);

    }
    

}



function lifeLost(invincible)
{

    //var invincible = false;

    if(livesRemain > 0 && invincible == false)
    {
        livesRemain--;
        cooldown = 80;
    }
    else if(invincible == true)
    {
        cooldown = 500;
    }
    
    if (livesRemain == 0){

        myGameArea.stop();
        return;

    }
}


function collision(gamePiece, enemy)
{
    var crash = true;

    if(
        ((gamePiece.y + gamePiece.height) < (enemy.y)) ||

        (gamePiece.y > (enemy.y + enemy.height)) ||

        ((gamePiece.x + gamePiece.width) < enemy.x) ||

        (gamePiece.x > (enemy.x + enemy.width))
    
    )
    {
        crash = false;
    }
    else
    {
        return crash;
    }
}

function cooldownTime()
{
    if(cooldown > 0)
    {
        cooldown--;
    }    
}



function powerUpCollision(gamePiece, powerUpType)
{
    var powered = true;

    if(
        ((gamePiece.y + gamePiece.height) < (powerUpType.y)) ||

        (gamePiece.y > (powerUpType.y + powerUpType.height)) ||

        ((gamePiece.x + gamePiece.width) < powerUpType.x) ||

        (gamePiece.x > (powerUpType.x + powerUpType.width))
    
    )
    {
        powered = false;
    }
    else
    {
        
        return powered;
    }   
}

function walkEnemyInterval()
{
    walkingEnemy.push( new enemy(100, 80, "green", 300, 150));
    //walkingEnemy.push( new enemy(100, 100, "blue", 300, 450));
}

function updateGameArea() {

    //animateBackground();

    cooldownTime();

    let inter = Math.floor((Math.random() * 150) + 50);
    

    for(i = 0; i < flyingEnemy.length; i +=1)
    {
        if(collision(myGamePiece, flyingEnemy[i]) == true && cooldown == 0)
            {
                lifeLost(false);
                console.log("hit flying enemy");

            }        
    }

    for(i = 0; i < walkingEnemy.length; i+= 1)
    {
        if(collision(myGamePiece, walkingEnemy[i]) == true && cooldown == 0)
        {
                lifeLost(false);
                console.log("hit walking enemy");
        }
    }


    for(i = 0; i < jumpPowerUp.length; i += 1)
    {
        if(powerUpCollision(myGamePiece, jumpPowerUp[i]) == true && jumpPowerUp[i].powerUpActive)
            {
                jumpPowerUp[i].powerInStorage();
                //jumpPowerUp.visible = false;
                console.log("jump collision");
            }
    }

    for(i = 0; i < sheildPowerUp.length; i += 1)
    {
        if(powerUpCollision(myGamePiece, sheildPowerUp[i]) == true && cooldown == 0)
            {
                lifeLost(true);
                console.log("sheild used");
            }
    }

   
 
    //setTimeout(final, 200);
    


    myGameArea.clear();

    myGameArea.frameNum += 1;

    background.speedX = -1;
    background.newPos();
    background.update();

    if(myGameArea.frameNum == 100 || everyFlyinterval(250))
    {
        flyingEnemy.push( new enemy(100, 40, "Bird.png", 2000, 360));

    }
   if(myGameArea.frameNum == 1 || everyWalkinterval(250))
    {
        walkingEnemy.push( new enemy(100, 80, "Dog.png", 850, 420));
    }

    if(myGameArea.frameNum == 200|| everySheildInterval(350))
    {
        sheildPowerUp.push( new powerUp(50, 50, "Shield.png", 900, 400, "sheild", "image"));
    }

    if(myGameArea.frameNum == 300 || everyJumpInterval(350))
    {
        jumpPowerUp.push(new powerUp(50, 50, "Jump.png", 1000, 400, "jump", "image"));
    }
    


    for(i = 0; i < flyingEnemy.length; i += 1)
    {
        flyingEnemy[i].speedX = -2;
        flyingEnemy[i].newPos();
        flyingEnemy[i].update();
    }

    for(i = 0; i < walkingEnemy.length; i += 1)
    {
        walkingEnemy[i].speedX = -2;
        walkingEnemy[i].newPos();
        walkingEnemy[i].update();
    }

    for(i = 0; i < sheildPowerUp.length; i += 1)
    {
        sheildPowerUp[i].speedX = -1.2;
        sheildPowerUp[i].newPos();
        sheildPowerUp[i].update();
    }

    for(i = 0; i < jumpPowerUp.length; i += 1)
    {
        jumpPowerUp[i].speedX = -1.2;
        jumpPowerUp[i].newPos();
        jumpPowerUp[i].update();
    }

    move(myGameArea.key, "sim");
    //move(myGameArea.key, "en");


    if(endOfLevel !== null)
    {
        final();
    }
    
    //flyingEnemy.update();
    //walkingEnemy.update();
    //console.log(myGameArea.frameNum);
    //jumpPowerUp.update();
    //sheildPowerUp.update();
    
    myGamePiece.x += myGamePiece.speedX;
    myGamePiece.y += myGamePiece.speedY;
    lives.text = "Lives: " + livesRemain;
    lives.update();

    myGamePiece.newPos();    
    myGamePiece.update();
   

    
}

function move(key)
{
    if(key == 37)
    {
        //myGamePiece.image.src = "Molly-Left.png";
        goLeft()
    }
    else if (key == 39)
    {
        goRight();
    }

    if(key == 38 && !myGamePiece.jumping)
    {
        if(storedPowerUp.length > 0)
        {
            if(storedPowerUp[0] == "jump")
                {
                    jump("en");
                    storedPowerUp.pop();
                }
        }
        else
        {
            jump("sim");
        }
        
    }

}

function goLeft()
{
    myGamePiece.image.src = "Molly-Left.png";
    myGamePiece.speedX = -2;
}

function goRight()
{
    myGamePiece.image.src = "Molly-Right.png";
    myGamePiece.speedX = 2;
}

function jump(type)
{
    if(type == "en")
    {
        myGamePiece.gravitySpeed = -11.5; myGamePiece.jumping = true;

        
    }
    else if (type == "sim")
    {
        myGamePiece.gravitySpeed = -8.5; myGamePiece.jumping = true;
    }
        
  
     
}

function superJump()
{
    myGamePiece.gravitySpeed = -9; myGamePiece.jumping = true;    
}



function everyFlyinterval(n) {
    if ((myGameArea.frameNum / n) % 3 == 0) 
        {
            return true;
        }
        return false;
}

function everyWalkinterval(n) {
    
    /*if ((myGameArea.frameNum / n) % 2 == 0) 
        {
            return true;
        }
        return false;*/

        return (myGameArea.frameNum % (2 * n)) === 0;
}

function everySheildInterval(n)
{
    if((myGameArea.frameNum / n) % 5 == 0)
    {
        return true;
    }
    return false;
}

function everyJumpInterval(n)
{
    if((myGameArea.frameNum / n) % 4 == 0)
    {
        return true;
    }
    return false;
}

function clearmove() {
    myGamePiece.image.src = "Molly-Stand.png";
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
var showCredits = function(){
       document.getElementById("head").style.display = "none";
       document.getElementById("credButton").style.display = "none";
       document.getElementById("bGame").style.display = "none";
       document.getElementById("endless").style.display = "none";
       document.getElementById("cred").style.display = "block";
       document.getElementById("bkButton").style.display = "block";
     };
      
var goBack = function(){
      document.getElementById("bkButton").style.display = "none";
      document.getElementById("cred").style.display = "none";
      document.getElementById("head").style.display = "block";
      document.getElementById("bGame").style.display = "block";
      document.getElementById("endless").style.display = "block";
      document.getElementById("credButton").style.display = "block";
    };