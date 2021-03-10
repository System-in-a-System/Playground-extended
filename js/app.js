// Import custom elements
import './login-form.js'
import './window-frame.js'
import './memory-game.js'
import './calculation-game.js'
import './chat-app.js'
import './weather-app.js'
import './style-settings.js'

// Display current time
displayCurrentTime()


// Handle login / logoff
const loginButton = document.querySelector('#login-button')
const status = document.querySelector('.status-field')

if (window.localStorage.getItem('nickname')) {
  status.textContent = ` 👽 ${window.localStorage.getItem('nickname')} is online`
}

loginButton.addEventListener('click', e => {
  // If the user is already logged in... 
  if (window.localStorage.getItem('nickname')) {
    // the button works as a log off button
    window.localStorage.removeItem('nickname')
    status.textContent = 'Is there anybody there?'
    return
  }

  // Display login form
  const loginForm = document.createElement('login-form')
  document.querySelector('.playground').appendChild(loginForm)

  // Catch dispatched event from login form (nickname is valid)
  document.addEventListener('nicknameValid', e => {
    status.textContent = ` 👽 ${e.detail.text()} is online.`
    loginButton.textContent = 'Log off'
  })
})


// Loaded applications counter (for smooth mutual positioning)
let windowCounter = 0

// Applications' start buttons
const memoryGameButton = document.querySelector('#memory-game-icon')
const calculationGameButton = document.querySelector('#calculation-game-icon')
const chatButton = document.querySelector('#chat-icon')
const weatherAppButton = document.querySelector('#weather-app-icon')
const styleSettingsButton = document.querySelector('#style-settings-icon')

// Buttons listen for events
memoryGameButton.addEventListener('click', e => {
  const memoryGame = document.createElement('memory-game')
  document.querySelector('.playground').appendChild(memoryGame)
  windowCounter++
})

calculationGameButton.addEventListener('click', e => {
  const calculationGame = document.createElement('calculation-game')
  document.querySelector('.playground').appendChild(calculationGame)
  windowCounter++
})

chatButton.addEventListener('click', e => {
  const chat = document.createElement('chat-app')
  document.querySelector('.playground').appendChild(chat)
  windowCounter++
})

weatherAppButton.addEventListener('click', e => {
  const weatherApp = document.createElement('weather-app')
  document.querySelector('.playground').appendChild(weatherApp)
  windowCounter++
})

styleSettingsButton.addEventListener('click', e => {
  const styleSettings = document.createElement('style-settings')
  document.querySelector('.playground').appendChild(styleSettings)
  windowCounter++
})


// Export loaded applications counter
export { windowCounter }



//============================================================================
// Assisting functions:

function displayCurrentTime() {
  let currentTime = new Date()
  let hours = currentTime.getHours()
  let minutes = currentTime.getMinutes()
  
  let amOrPm = hours < 12 ? 'AM' : 'PM'

  hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours

  hours = addZero(hours)
  minutes = addZero(minutes)

  let timeString = `${hours}:${minutes} ${amOrPm}`
  document.getElementById('clock').innerText = timeString

  let timer = setTimeout(displayCurrentTime, 1000)
}

function addZero(component) {
  return component < 10 ? '0' + component : component
}