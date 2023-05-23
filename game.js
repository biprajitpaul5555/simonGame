let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let nextSequence = () => {
    let randomNumber = 0 + Math.floor((3 - 0 + 1) * Math.random());
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
};
$(".btn").on("click", (e) => {
    let userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});
let playSound = (name) => {
    $("#" + name)
        .fadeOut(150)
        .fadeIn(150);
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};
let animatePress = (currentColour) => {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};
let level = 0;
$(document).keydown(() => {
    if (!level) nextSequence();
});
let checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        // console.log("success");
        if (currentLevel == gamePattern.length - 1) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        // console.log("wrong");
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $(document.body).addClass("game-over");
        setTimeout(() => {
            $(document.body).removeClass("game-over");
        }, 200);
        level = 0;
        gamePattern = [];
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
};
