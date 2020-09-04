let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keydown(function(event) {
  if(!started){

    $("h1").html(`Level ${level}`);
    gameSequence();
    started = true;
  }
});


const gameSequence = () =>{

  userClickedPattern = []; //to empty the userClicked array

  level++;
  $("h1").html(`Level ${level}`);


  let randomNumber = Math.floor(4*(Math.random()));
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function(){
  // let userChosenColour = $(".btn").attr("id");//wrong method
  let userChosenColour = $(this).attr("id");
  // console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);


});

const checkAnswer = (currentLevel) =>{
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    // console.log("success");

    if(userClickedPattern.length === gamePattern.length){

      setTimeout(function(){
        gameSequence();
      }, 1000);
    }
  }
  else {
    // console.log("looser");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").html("Game Over, press any key to Restart");
    startOver();
  }
}

const startOver = () =>{
  started = false;
  gamePattern = [];
  level = 0;
};

const playSound = (colour) =>{
  let audio = new Audio(`sounds/${colour}.mp3`);
  audio.play();
}

const animatePress = (currentColour) =>{
  $(`#${currentColour}`).addClass('pressed');

  setTimeout(function(){
    $(`#${currentColour}`).removeClass('pressed');
  },100);
}
