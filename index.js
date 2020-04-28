const plusBtn = document.getElementById('plus-btn'); 
const minusBtn = document.getElementById('minus-btn');
const timeInput = document.getElementById('input-number');
let status = document.getElementById('status');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const alarmAudio = document.getElementById('myAudio');
let remainingSeconds;
let currentState="stop";
let interval;

function alertMsg () {
  alert('Invalide Input, Please Enter only digits than zero');
}

// checks if the input is a digits number and it isn't empty and bigger than 0 
function checkTimeInput() {
  return timeInput.value.toString().split('').reduce((valid , element) => {
    return valid && (element >= '0' && element <= '9');
  },true) 
  && timeInput.value.toString().length>0 
  && timeInput.value > 0;
}
//convert the valid input into time format (to add 0 to the left of the seconds when it displays to user)
function convertToTimeFormat(input) {
  if(input < 10) return '0' + input;
  return input;
}
//increase the valid input one minute when plus button pressed
plusBtn.addEventListener('click', event => {
  event.preventDefault();
  checkTimeInput() ? timeInput.value++ : alertMsg();
} );

////decrease the valid input one minute when minus button pressed
minusBtn.addEventListener('click' , event => {
  event.preventDefault();
  checkTimeInput() ? timeInput.value-- : alertMsg();
});

//enable the disabled elements which they are the input element , plus button and minus button
function enableElements(){
  timeInput.removeAttribute('disabled');
  plusBtn.style.display = "";
  minusBtn.style.display = ""; 
}

//disable the enabled elements which they are the input element , plus button and minus button
function disableElements(){
  timeInput.setAttribute("disabled",'');
  plusBtn.style.display = "none";
  minusBtn.style.display = "none";
}

function countDown(){
  remainingSeconds--;
  status.textContent = `${Math.floor(remainingSeconds/60)}:${convertToTimeFormat(remainingSeconds % 60)}`;
  if(remainingSeconds === 0) {
    stop();
    status.textContent = "Time's Up!";
    alarmAudio.play();
  }
}

function play(){
  if (currentState === 'stop')
  {
    if(checkTimeInput())
    {
      remainingSeconds = timeInput.value * 60;
      interval = setInterval(countDown,1000);
      disableElements();
      currentState = 'play';
    }
    else
      alertMsg();
  }
  else if(currentState=='pause') {
    disableElements();
    interval = setInterval(countDown,1000);
    currentState = 'play';
  } 
}

function pause(){
  if (currentState === 'play') {
    currentState = 'pause' ;
    clearInterval(interval);
  }
}

function stop() {
  clearInterval(interval);
  remainingSeconds=0;
  currentState = 'stop';
  status.textContent = `${timeInput.value}:00`;
  enableElements();
}
playBtn.addEventListener('click', event => {
  event.preventDefault();
  play();
});
pauseBtn.addEventListener('click', event => {
  event.preventDefault();
  pause();
});
stopBtn.addEventListener('click', event => {
  event.preventDefault();
  stop();
});