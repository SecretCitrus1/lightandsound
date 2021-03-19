var clueHoldTime = 1000;
var cluePauseTime = 333;
const nextClueWaitTime = 1000;

var pattern = [5, 1, 1, 1, 1, 1, 1, 1];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;
var myTimer = null;
var easyCounter = 0;
var easyPoints = 0;
var mediumCounter = 0;
var mediumPoints = 0;
var hardCounter = 0;
var hardPoints = 0;
var choice = 0;
document.getElementById("points").innerHTML = 0;
document.getElementById("timer").innerHTML = 0;
document.getElementById("highScore").innerHTML = 0;

function choice1() {
  document.getElementById("difficulty").innerHTML = "Easy Mode";
  document.getElementById("timer").innerHTML = 10;
  document.getElementById("button5").classList.add("hidden");
  document.getElementById("button6").classList.add("hidden");
  document.getElementById("button7").classList.add("hidden");
  document.getElementById("button8").classList.add("hidden");
  document.getElementById("button9").classList.add("hidden");
  document.getElementById("button10").classList.add("hidden");
  document.getElementById("button11").classList.add("hidden");
  document.getElementById("button12").classList.add("hidden");
  document.getElementById("button13").classList.add("hidden");
  document.getElementById("button14").classList.add("hidden");
  document.getElementById("button15").classList.add("hidden");
  document.getElementById("button16").classList.add("hidden");
  stopTimer();
  stopGame();
  choice = 1;
}

function choice2() {
  document.getElementById("difficulty").innerHTML = "Medium Mode";
  document.getElementById("timer").innerHTML = 5;
  document.getElementById("button9").classList.add("hidden");
  document.getElementById("button10").classList.add("hidden");
  document.getElementById("button11").classList.add("hidden");
  document.getElementById("button12").classList.add("hidden");
  document.getElementById("button13").classList.add("hidden");
  document.getElementById("button14").classList.add("hidden");
  document.getElementById("button15").classList.add("hidden");
  document.getElementById("button16").classList.add("hidden");

  document.getElementById("button5").classList.remove("hidden");
  document.getElementById("button6").classList.remove("hidden");
  document.getElementById("button7").classList.remove("hidden");
  document.getElementById("button8").classList.remove("hidden");
  choice = 2;
  stopTimer();
  stopGame();
}

function choice3() {
  document.getElementById("difficulty").innerHTML = "Hard Mode";
  document.getElementById("timer").innerHTML = 3;

  document.getElementById("button5").classList.remove("hidden");
  document.getElementById("button6").classList.remove("hidden");
  document.getElementById("button7").classList.remove("hidden");
  document.getElementById("button8").classList.remove("hidden");
  document.getElementById("button9").classList.remove("hidden");
  document.getElementById("button10").classList.remove("hidden");
  document.getElementById("button11").classList.remove("hidden");
  document.getElementById("button12").classList.remove("hidden");
  document.getElementById("button13").classList.remove("hidden");
  document.getElementById("button14").classList.remove("hidden");
  document.getElementById("button15").classList.remove("hidden");
  document.getElementById("button16").classList.remove("hidden");
  stopTimer();
  stopGame();
  choice = 3;
}

function startGame() {
  document.getElementById("points").innerHTML = 0;

  if (choice == 0) {
    alert("Choose Your Difficulty!");
  } 
  else if (choice == 1) {
    pattern = pattern.map(x => Math.round(1 + Math.random() * 3));
    progress = 0;
    gamePlaying = true;
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    playClueSequence();
  }
  
  else if (choice == 2) {
    pattern = pattern.map(x => Math.round(1 + Math.random() * 7));
    progress = 0;
    gamePlaying = true;
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    playClueSequence();
  }
  
  else if (choice == 3) {
    pattern = pattern.map(x => Math.round(1 + Math.random() * 15));
    progress = 0;
    gamePlaying = true;
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    playClueSequence();
  }
  
  
  
  
}

function stopGame() {
  easyPoints = 0;
  mediumPoints = 0;
  hardPoints = 0;

  stopTimer();
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

const freqMap = {
  1: 100,
  2: 140,
  3: 180,
  4: 220,
  5: 260,
  6: 300,
  7: 340,
  8: 380,
  9: 420,
  10: 460,
  11: 500,
  12: 540,
  13: 600,
  14: 640,
  15: 680,
  16: 720
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;
  let delay = nextClueWaitTime;
  for (let i = 0; i <= progress; i++) {
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]);

    if (document.getElementById("difficulty").innerHTML == "") {
      delay += clueHoldTime / 1.1;
      delay += cluePauseTime / 1.1;
    }

    if (document.getElementById("difficulty").innerHTML == "Easy Mode") {
      delay += clueHoldTime / 1.1;
      delay += cluePauseTime / 1.1;
    }

    if (document.getElementById("difficulty").innerHTML == "Medium Mode") {
      delay += clueHoldTime / 1.2;
      delay += cluePauseTime / 1.2;
    }

    if (document.getElementById("difficulty").innerHTML == "Hard Mode") {
      delay += clueHoldTime / 1.3;
      delay += cluePauseTime / 1.3;
    }
  }

  setTimeout(timer, delay);
}

function timer() {
  var easyCounter = 11;
  var mediumCounter = 6;
  var hardCounter = 4;
  var points = 0;
  var totalPoints = 0;
  var counter;

  if (document.getElementById("difficulty").innerHTML == "Easy Mode") {
    myTimer = setInterval(function easytimer() {
      easyCounter--;
      easyPointsCounter();
      if (easyCounter >= 0) {
        document.getElementById("timer").innerHTML = easyCounter;
      }
      if (easyCounter == -1) {
        loseGame();
      }
    }, 1000);
  }

  if (document.getElementById("difficulty").innerHTML == "Medium Mode") {
    myTimer = setInterval(function() {
      mediumCounter--;
      mediumPointsCounter();
      if (mediumCounter >= 0) {
        document.getElementById("timer").innerHTML = mediumCounter;
      }
      if (mediumCounter == -1) {
        loseGame();
      }
    }, 1000);
  }
  if (document.getElementById("difficulty").innerHTML == "Hard Mode") {
    myTimer = setInterval(function() {
      hardCounter--;
      if (hardCounter >= 0) {
        document.getElementById("timer").innerHTML = hardCounter;
      }
      if (hardCounter == -1) {
        loseGame();
      }
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(myTimer);
}

function easyPointsCounter() {
  var points;
  easyCounter++;
  if (document.getElementById("timer").innerHTML == 10) {
    easyCounter = 0;
  }
  return easyCounter;
}

function easyPointsTotal() {
  easyPoints += 1000 - easyPointsCounter() * 50;
  document.getElementById("points").innerHTML = easyPoints;
}

function mediumPointsCounter() {
  var points;
  mediumCounter++;
  if (document.getElementById("timer").innerHTML == 5) {
    mediumCounter = 0;
  }
  return mediumCounter;
}

function mediumPointsTotal() {
  mediumPoints += 1500 - mediumPointsCounter() * 50;
  document.getElementById("points").innerHTML = mediumPoints;
}

function hardPointsCounter() {
  var points;
  hardCounter++;
  if (document.getElementById("timer").innerHTML == 3) {
    hardCounter = 0;
  }
  return hardCounter;
}

function hardPointsTotal() {
  hardPoints += 2000 - hardPointsCounter() * 50;
  document.getElementById("points").innerHTML = hardPoints;
}

function highScore() {
  if (document.getElementById("highScore").innerHTML <= hardPoints) {
    document.getElementById("highScore").innerHTML = hardPoints;
  }

  if (document.getElementById("highScore").innerHTML <= mediumPoints) {
    document.getElementById("highScore").innerHTML = mediumPoints;
  }
  if (document.getElementById("highScore").innerHTML <= easyPoints) {
    document.getElementById("highScore").innerHTML = easyPoints;
  }
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }

  if (pattern[guessCounter] == btn) {
    if (guessCounter == progress) {
      stopTimer();
      if (progress == pattern.length - 1) {
        winGame();
      } else {
        if (document.getElementById("difficulty").innerHTML == "Easy Mode") {
          easyPointsTotal();
        }
        if (document.getElementById("difficulty").innerHTML == "Medium Mode") {
          mediumPointsTotal();
        }
        if (document.getElementById("difficulty").innerHTML == "Hard Mode") {
          hardPointsTotal();
        }
        progress++;
        playClueSequence();
      }
    } else {
      guessCounter++;
    }
  } else {
    loseGame();
  }
}

function loseGame() {
  highScore();
  stopTimer();
  stopGame();
  alert("Game Over. You lost.");
}
function winGame() {
  highScore();
  stopGame();
  alert("Game Over. You won!");
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);
