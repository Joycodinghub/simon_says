
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern=[];


var level =0;
var started = false;

$(document).on("keypress",Started);

function Started(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
   
}

$(".btn").on("click",handler);
function handler(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenColor);
    animatePress(userChosenColor)
    
    
}


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var random = Math.round(Math.random()*3);
    var randomChosenColour = buttonColors[random];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    

}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
 
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");

        function time(){
            $("."+currentColour).removeClass("pressed"); 
        }
        setTimeout(time,100);
}


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

        if(userClickedPattern.length===gamePattern.length){
            console.log("succes");
            function time(){
                nextSequence();
            }
            setTimeout(time,1000);
        }
    }
    else{
        
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        function time1(){
            $("body").removeClass("game-over");
        }
        setTimeout(time1,500);

        $("#level-title").text("Game Over,Press any Key to Restart")
        startOver();
    }
}



function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}