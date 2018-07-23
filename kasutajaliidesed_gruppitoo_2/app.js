var score = 0;

function onWin() {
    if (score === 25) {
        onGameWin();
    } else {
        resultAnimation("WIN");

        var snd = new Audio("1-up.wav");
        snd.play();
    }
}

function onLoss() {
    resultAnimation("Loss");

    if (score === -25) {
        onGameLoss();
    } else {
        var ddd = new Audio("loss.wav");
        ddd.play();

        resultAnimation("LOSS");
    }
}

function onTie() {
	var ddd = new Audio("tie.wav");
	ddd.play();
    resultAnimation("TIE");
}

function onGameWin() {
    setTimeout(function(){
        restartGame();
    }, 4000);
    $('#firework').html('<img src="fireworks.gif" width="400" height="400"/>');
    setTimeout(function(){
        var ddd = new Audio("fireworks.mp3");
        ddd.play();
    }, 2500);
    var snd = new Audio("fireworks.mp3");
    snd.play();
    disableButtons();
}

function onGameLoss() {
    setTimeout(function(){
        restartGame();
    }, 5000);
    var snd = new Audio("game_over.wav");
    snd.play();
    disableButtons();
    $("#firework").html('<img src="bad.png" width="400" height="400" class="animated slideInDown" />');
}

function restartGame() {
    location.reload(true);
}

function pressKivi() {
    document.getElementById("myMoveVisible").src = "rock.png";
    computerMove(1);
}

function pressPaber() {
    document.getElementById("myMoveVisible").src = "paper.png";
    computerMove(2);
}

function pressKaarid() {
    document.getElementById("myMoveVisible").src = "scissors.png";
    computerMove(3);
}

function computerMove(tempScore) {
    //var coMove = Math.floor(Math.random() * 3) + 1; // random
    var coMove = 1; // always rock

    switch(coMove) {
        case 1:
            document.getElementById("compMoveVisible").src = "ai_rock.png";
            break;
        case 2: 
            document.getElementById("compMoveVisible").src = "ai_paper.png";
            break;
        case 3:
            document.getElementById("compMoveVisible").src = "ai_scissors.png";
            break;
    }

    let loss = coMove == 1 &&  tempScore == 3 || coMove == 2 &&  tempScore == 1 || coMove == 3 &&  tempScore == 2;

    if (loss) {
        score--;
        onLoss();
    } else if (coMove == tempScore) {
        onTie();
    } else if(coMove == 3 &&  tempScore == 1 || coMove == 1 &&  tempScore == 2 || coMove == 2 &&  tempScore == 3) {
        score++;
        onWin();
    }

    if (coMove !== tempScore) {
        if (score > 0) {
            drawResults("star.png", score, loss);
        } else {
            drawResults("bad.png", score, loss);
        }
    }
}

function resultAnimation(message) {
    $('#textIn').addClass('animated zoomIn');
    $("#textIn").text(message);
    setTimeout(function(){
        document.getElementById("textIn").innerHTML = "";
        $('#textIn').removeClass('animated zoomIn');
    }, 1100);
}

function drawResults(image, curScore, loss) {
    clearResults();
    if (curScore === 0) {
        return;
    }
    let count = Math.abs(curScore);
    let i = 0;
    for (i = 0; i < count - 1; i++) {
        addImage(image, getResultDestination(i));
    }

    let decrease = curScore > 0 && loss || curScore < 0 && !loss;
    if (decrease) {
        console.log(i + 1);
        addImage(image, getResultDestination(i));
        removeAnimatedImage(image, getResultDestination(i + 1));
    } else {
        console.log(i);
        addAnimatedImage(image, getResultDestination(i));
    }
}

function clearResults() {
    for (let i = 1; i <= 5; i++) {
        $("#results" + i).empty();
    }
}

function addImage(image, location, animate) {
    location.append('<img alt="result" class="resultImage" src="' + image + '" />');
}

function addAnimatedImage(image, location) {
    location.append('<img alt="result" class="resultImage animated zoomIn" src="' + image + '" />');
}

function removeAnimatedImage(image, location) {
    location.append('<img alt="result" class="resultImage animated zoomOut" src="' + image + '" />');
}

function getResultDestination(i) {
    if (i < 5) {
        return $("#results1");
    } else if (i < 10) {
        return $("#results2");
    } else if (i < 15) {
        return $("#results3");
    } else if (i < 20) {
        return $("#results4");
    } else if (i < 25) {
        return $("#results5");
    }
}

function disableButtons() {
    $("#rockBtn").prop("disabled", true);
    $("#scissorsBtn").prop("disabled", true);
    $("#paperBtn").prop("disabled", true);
}
