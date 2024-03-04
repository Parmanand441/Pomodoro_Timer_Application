var interval;
var elapsedTime = 0;
var isPaused = false;
var start;

// Get the audio element

var audio = document.getElementById("myAudio");

function startTimer() {
  const time = document.getElementById("time").value * 60000;
  var display = document.getElementById("display");
  
  start = Date.now();
  interval = setInterval(function() {
    const timeLeft = time - (Date.now() - start + elapsedTime);
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor(timeLeft % 60000 / 1000);
    const centiseconds = Math.floor(timeLeft % 1000 / 10);
    
    if (timeLeft <= 0) {
      clearInterval(interval);
      display.classList.add("display-text");
      display.textContent = "Time is Up!";
      document.getElementById("startBtn").disabled = false;
      document.getElementById("pauseBtn").disabled = true;
      audio.play();
      alert("Your time is up! what's next?")

    } else {
      display.innerHTML = minutes + ":" + (seconds < 10 ? "0" : "") + seconds + ":" + (centiseconds < 10 ? "0" : "") + centiseconds;
    }
  }, 10);
  
  document.getElementById("startBtn").disabled = true;
  document.getElementById("pauseBtn").innerHTML = "<img src=\'https://img.icons8.com/material-outlined/256/pause.png\' width=\'40px\' height=\'40px\'>";
  document.getElementById("pauseBtn").disabled = false;
  document.getElementById("resetBtn").disabled = false;
}

function pauseTimer() {
  clearInterval(interval);
  isPaused = !isPaused;
  if (isPaused) {
    elapsedTime += Date.now() - start;
    document.getElementById("pauseBtn").innerHTML = "<img src=\'https://img.icons8.com/material-outlined/256/play.png\' width=\'40px\' height=\'40px\' title=\'Play\'>";
  } else {
    start = Date.now();
    document.getElementById("pauseBtn").innerHTML = "<img src=\'https://img.icons8.com/material-outlined/256/pause.png\' width=\'40px\' height=\'40px\'>";
    startTimer();
  }
  document.getElementById("startBtn").disabled = true;
}

function resetTimer() {
  clearInterval(interval);
  document.getElementById("display").innerHTML = "";
  document.getElementById("startBtn").disabled = false;
  document.getElementById("pauseBtn").innerHTML = "<img src=\'https://img.icons8.com/material-outlined/256/pause.png\' width=\'40px\' height=\'40px\'>";
  document.getElementById("pauseBtn").disabled = true;
  document.getElementById("resetBtn").disabled = true;
  elapsedTime = 0;
  isPaused = false;
}

window.onload = function() {
  setVolume();
}

function setVolume() {
  audio.volume = document.getElementById("volumeControl").value;
}