var buttonColors = ['red','blue','green','yellow'];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
        $("#level-title").text("Level " + level);
    }
});


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
       $("#" + currentColour).removeClass("pressed");
   }, 100);
}

function checkAnswer(currentLevel){
    console.log(gamePattern);
    console.log(userClickedPattern);

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
      }, 1000);

      }

    } else {
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $('body').addClass("game-over");

      setTimeout(function(){
          $('body').removeClass("game-over");
      },200);

      startOver();

      console.log("wrong");

    }
}

function startOver(){
    started = false;
    level = 0;
    var gamePattern = [];
}
