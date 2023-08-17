var gamePattern = [];
var userClickedPattern = [];
var level=0;
var start_game = false;


var buttonColors = ["red","blue","green","yellow"];
function nextSequence(){
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 3 +1);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(id = "#" + randomChosenColor).delay(100).fadeOut().fadeIn();
    playSound(randomChosenColor);
    userClickedPattern = [];
    
}



$(".btn").click(function(event){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(level);
})

function playSound(name){
    var audio1 = new Audio("./sounds/" + name + ".mp3");
    audio1.play();
    
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


$(document).keypress(function(){
    if(!start_game){
        $("#level-title").text("level " + level);
        nextSequence();
        start_game = true;
    }
})

function checkAnswer(currentLevel){
    var j = false;
    if(userClickedPattern[userClickedPattern.length-1] == gamePattern[userClickedPattern.length-1]){
        console.log("suceess");
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over.Press any key to start");
    startOver();
    }
    
    for(var i =0;i<currentLevel;i++){
        if(userClickedPattern[i] == gamePattern[i]){
            j = true;
        }
        else{
            j = false;
            break;
        }
    }
    if(j == true){
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
}

function startOver(){
    level =0;
    start_game = false;
    gamePattern = [];
}
