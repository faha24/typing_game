


  window.addEventListener('load', init);

// window.addEventListener('load', init);

var words = [];

//Load words
async function load_words()
{
  return new Promise(resolve => {
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
      //  IE7+, Firefox, Chrome, Opera, Safari 
      xmlhttp=new XMLHttpRequest();
    }
    else
    {
      // IE6, IE5 
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        
        if (navigator.userAgentData.platform === "Windows")
          words=xmlhttp.responseText.split("\r\n");
        else
          words=xmlhttp.responseText.split("\n");

        words = words.map(string => {
          const parts = string.split(" - ");
          return { acronym: parts[0], terms: parts[1] };
        });
        
        resolve('resolved');
      }
    }
    xmlhttp.open("GET","word.txt",true);
    xmlhttp.send();
  });
}

// Available Levels
const levels = {
  supereasy: 10,
  easy: 5,
  medium: 3,
  hard: 1
};

let currentLevel;
let time ;
let start;
// To change level
const level = document.getElementById('lv');


async function  currentime(){
  
  let options = level.options;
  var a =options.selectedIndex ;
  var x = options[a].text;
  if(x == 'lv1'){
    currentLevel = levels.supereasy;
  console.log(x);
  }
  if(x == 'lv2'){
    currentLevel = levels.easy;
    console.log(x)
  
  }
   time = await currentLevel;
   seconds.innerHTML = currentLevel;
   timeDisplay.innerHTML = time;
   wordInput.addEventListener("input", startMatch);
}
currentime();



// let time = await currentLevel;
let score = 0;
let isPlaying;
let time_Start = 4;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');
const button = document.querySelector("button");
const container = document.querySelector('.container');
const timeStart = document.querySelector(".time_start");
const containerStart = document.querySelector(".container_start");


// Initialize Game
async function init() {
  let result = await load_words();
  
  
  // Show number of seconds in UI
  // seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  container.style.display="none";
  wordInput.addEventListener("input", startMatch);
  // setInterval(countdownStart, 1000);
 button.addEventListener('click' ,(a) => {
  setInterval(countdownStart, 1000);
  level.setAttribute("disabled", "disabled");
  button.style.display = "none";
  timeStart.style.display ="block";
  // setInterval(countdown, 1000);
  console.log();
  
  setTimeout((a) => {
    setInterval(countdown, 1000);
    containerStart.style.display ="none";
    wordInput.setAttribute("autofocus", "autofocus");
 
    
   
  
  // button.style.display = "none";
  container.style.display="block";
  container.addEventListener('click' , ()=>{
    wordInput.focus();
    console.log('test');
  })
  },4000)
  // setInterval(countdown, 1000);
  // wordInput.removeAttribute("disabled", "disabled");
  // button.style.display = "none";
  // container.style.display="block";
 }

 )
  // setInterval(countdown, 1000);

  
    // setInterval(countdown, 1000);
   
  

  // Call countdown every second
timeDisplay.innerHTML ='10';

  // Check game status
  setInterval(checkStatus, 50);

}

function countdownStart(){
  if (time_Start > 1) {
    // Decrement
    time_Start--;
    console.log(timeStart)
   
  } 
  // Show time
  timeStart.innerHTML =  time_Start;
}

async function levelSevice(){
  currentime();
  let options = level.options;
  var a =options.selectedIndex ;
  var x = options[a].text;
  

 if(x == 'lv1' ){
  currentLevel = 5;
 }else if(x=='lv2'){
  console.log(x)
 }



 }
 

  


// Start match
function startMatch() {
 
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }
  
  // Highscore based on score value for Session Storage
  
  

//   // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
  level.setAttribute("disabled", "disabled");

}

// Match currentWord to wordInput
function matchWords() {
  
  

  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
  
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex].acronym;
}

// Countdown timer
async function countdown() {
  // Make sure time is not run out
  
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = await time;
}

// Check game status
function checkStatus() {
 
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!! ' ;
    wordInput.setAttribute("disabled", "disabled");
    score = -1;
  }
}