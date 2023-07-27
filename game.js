var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var firstKeyPress = false;
var level=0;

//here we have given for the keypress event
$(document).keypress(function (e) { 
  if(!firstKeyPress ){  
    $("#level-title").text("LEVEL "+level);
    nextSequence();
    firstKeyPress = true;
  }
});
  
//here we have given for the click event
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id"); 
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress( userChosenColour);
  checkAnswer(userClickedPattern.length-1);
 
});


/// this function is called when the 
function nextSequence(){
  level++;
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  $("#level-title").text("Level " + level);
}

//funtion to play sound 
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour) { 
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
  $("#"+currentColour).removeClass('pressed');
}, 100) 
 }

 function checkAnswer(currentLevel){
  console.log(gamePattern);
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success"); 
  
  if(gamePattern.length===userClickedPattern.length){
    setTimeout(function() {
      nextSequence();  }, 1000) 
    }
  }
  else{
   playSound("wrong");
    $("body").addClass("game-over");
   setTimeout(function() {
    $("body").removeClass("game-over"); }, 200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  firstKeyPress = false;
}


























