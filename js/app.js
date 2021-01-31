// Import custom elements
import './window-frame.js'

// Display current time
displayCurrentTime();


// Loaded applications counter (for smooth mutual positioning)
let windowCounter = 0;

// Applications start buttons
const memoryGameButton = document.querySelector('#memory-game-icon');
const chatButton = document.querySelector('#chat-icon');
const calculationGameButton = document.querySelector('#calculation-game-icon');

// Buttons listen for events:
memoryGameButton.addEventListener('click', e => {
  const memoryGame = document.createElement('window-frame')
  document.querySelector('.playground').appendChild(memoryGame)
  windowCounter++
})

chatButton.addEventListener('click', e => {
  const chat = document.createElement('window-frame')
  document.querySelector('.playground').appendChild(chat)
  windowCounter++
})

calculationGameButton.addEventListener('click', e => {
  const calculationGame = document.createElement('window-frame')
  document.querySelector('.playground').appendChild(calculationGame)
  windowCounter++
})

// Export loaded applications counter
export { windowCounter }



// Assisting methods
function displayCurrentTime() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  
  let amOrPm = hours < 12 ? "AM" : "PM";

  hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  hours = addZero(hours);
  minutes = addZero(minutes);

  let timeString = `${hours}:${minutes} ${amOrPm}`;
  document.getElementById("clock").innerText = timeString;

  let timer = setTimeout(displayCurrentTime, 1000);
}

function addZero(component) {
  return component < 10 ? "0" + component : component;
}
