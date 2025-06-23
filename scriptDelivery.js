var myGamePiece;



function startBaseGame() {


    document.getElementById("bGame").style.display = "none";
    document.getElementById("endless").style.display = "none";
    document.getElementById("head").style.display = "none";
        
    document.getElementById("cred").style.display = "none";       
    document.getElementById("main").style.display = "block";
    document.getElementById("credButton").style.display = "none";
    myGamePiece = new component(30, 30, "red", 0, 240);
    myGameArea.start();
   
}

var myGameArea = {
    canvas : document.getElementById("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    }, 
    stop : function() {
        clearInterval(this.interval);
    },  
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;  
    this.gravity = 0.2;
    this.gravitySpeed = 0;
    this.jumping = false;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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



function updateGameArea() {
    myGameArea.clear();

    if (myGameArea.key == 37) {myGamePiece.speedX = -2; }
    else if (myGameArea.key == 39) {myGamePiece.speedX = 2; }
    if (myGameArea.key == 38 && !myGamePiece.jumping) {myGamePiece.gravitySpeed = -6.5; myGamePiece.jumping = true; }


    myGamePiece.newPos();    
    myGamePiece.update();
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