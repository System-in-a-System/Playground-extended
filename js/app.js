displayCurrentTime();

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
