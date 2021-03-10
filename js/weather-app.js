// Import superclass
import { WindowFrame } from "./window-frame.js";

// Create a structural template for a custom element 'weather-app'
const template = document.createElement("template");

template.innerHTML = `
<div id="app-container"
  style="
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 327px;
    background: rgb(224,224,237);
    background: radial-gradient(circle, rgba(224,224,237,0.9867297260701156) 63%, rgba(97,115,180,1) 89%, rgba(5,3,42,1) 100%);">
    
      <img src="" alt="" srcset="" id="weather-icon">
      <div id="location" style="font-size: 20px;"></div>
      <div id="description"></div>
      <div id="weather-temperature"
        style="
          display: flex; 
          align-items: center;
          margin: 15px ;
          font-size: 14px;">

            <div id="c"></div>
            <div id="circle"
              style="
                background-color: black;
                border-radius: 50px;
                height: 15px;
                width: 15px;
                margin: 0 15px;"></div>
            <div id="f"></div>
      </div>
      <div id="sun-info" style="font-size: 10px;">
            <p>Sunrise: <span id="sunrise"></span></p>
            <p>Sunset: <span id="sunset"></span></p>
      </div>
</div>
`;

/**
 * Defines the functionality for 'weather-app' custom element
 *
 * @class WeatherApp
 * @extends {WindowFrame}
 */
class WeatherApp extends WindowFrame {
  constructor() {
    super();

    // Deep clone 'weather-app' template & Append it to the 'content block' from the WindowFrame parent class
    this._contentBlock.appendChild(template.content.cloneNode(true));
    this._iconHolder.style.background =
      "url(https://cdn3.iconfinder.com/data/icons/spring-5/44/spring_work-17-512.png) no-repeat";
    this._iconHolder.style.backgroundSize = "contain";
    this._appTitle.textContent = "Weather";

    // Reference the structural parts of the appended 'weather-app' template
    this._appContainer = this._contentBlock.querySelector("#app-container");
    this._weatherIcon = this._contentBlock.querySelector("#weather-icon");
    this._location = this._contentBlock.querySelector("#location");
    this._description = this._contentBlock.querySelector("#description");
    this._weatherTemperature = this._contentBlock.querySelector("#weather-temperature");
    this._temperatureInCelsius = this._contentBlock.querySelector("#c");
    this._temperatureInFahrenheit = this._contentBlock.querySelector("#f");
    this._weatherCircle = this._contentBlock.querySelector("#circle");
    this._sunInfo = this._contentBlock.querySelector("#sun-info");
    this._sunrise = this._contentBlock.querySelector("#sunrise");
    this._sunset = this._contentBlock.querySelector("#sunset");

    // OpenWeatherMap API.
    this._weatherApi = "139a07dae0b4078bab359dbb8c3af430";
  }

  /**
   * Called when connected to the DOM
   *
   * @memberof WeatherApp
   */
  connectedCallback() {
    this.positionElement();

    this.displayWeather();

    this.listenForDragging();

    this._frame.addEventListener("click", (e) => {
      this.refocusStack();
    });

    this._exitButton.addEventListener("click", (e) => {
      this.remove();
    });
  }

  /**
   * Displays current Weather in the current City
   *
   * @memberof WeatherApp
   */
  displayWeather() {  
    // If user current Geolocation access was successful 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Retrieve user Geolocation
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;

        // Weather API base URL
        const base = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this._weatherApi}&units=metric`;

        // Fetch Weather API
        fetch(base)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            const { temp } = data.main;
            const place = data.name;
            const { description, icon } = data.weather[0];
            const { sunrise, sunset } = data.sys;

            // Retrieve suitable icon
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            // Convert Celsius to Fahrenheit
            const fahrenheit = (temp * 9) / 5 + 32;

            // Convert Unix time to GMT
            const sunriseGMT = new Date(sunrise * 1000);
            const sunsetGMT = new Date(sunset * 1000);

            // Populate DOM elements with freshly fetched weather data
            this._weatherIcon.src = iconUrl;
            this._location.textContent = `${place}`;
            this._description.textContent = `${description}`[0].toUpperCase() + `${description}`.substr(1) ;
            this._temperatureInCelsius.textContent = `${temp.toFixed(2)} °C`;
            this._temperatureInFahrenheit.textContent = `${fahrenheit.toFixed(2)} °F`;
            this._sunrise.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
            this._sunset.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
          });
      });
    }
  }
}

// Register 'weather-app' custom element
window.customElements.define("weather-app", WeatherApp);
