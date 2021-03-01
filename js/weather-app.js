// Import superclass
import { WindowFrame } from "./window-frame.js";

// Create a structural template for a custom element 'weather-app'
const template = document.createElement("template");

template.innerHTML = `
<div id="appContainer
    style="
      display: flex;
      flex-direction: rows;
      justify-content: center;
      align-items: center">
  
    <div id="weatherInfo" tabindex="0" 
      style="
        width: fit-content; 
        height: fit-content;
        display: flex; 
        flex-direction: rows;
        justify-content: center;
        align-items: center;
        background-color: red;
        border-style: solid;
        border-width: 0.5px;
        border-color: black;">
    </div>

  <div id="cityChoice" 
    style="
      margin-top: 10px;
      width: 92%;
      height: 30px;
      text-align: center;
      font-size: 17px;
      padding: 10px;
      background-color: rgb(214, 210, 210);
      opacity: 0.6;">
        
        <div id="currentCity">Current City</div>
        <button id="cityChoiceButton">Choose the City</button>

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
      "url(https://www.flaticon.com/svg/vstatic/svg/578/578116.svg?token=exp=1614598104~hmac=938bb537cc90ad11607945110d6e6212) no-repeat";
    this._appTitle.textContent = "Weather";

    // Reference the structural parts of the appended 'weather-app' template
    this._appContainer = this._contentBlock.querySelector("#appContainer");
    this._weatherInfo = this._contentBlock.querySelector("#weatherInfo");
    this._cityChoice = this._contentBlock.querySelector("#cityChoice");
    this._currentCity = this._contentBlock.querySelector("#currentCity");
    this._cityChoiceButton = this._contentBlock.querySelector("#cityChoiceButton");
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
   * @param {*} city
   * @memberof WeatherApp
   */
  displayWeather(city) {
    this._weatherInfo.textContent = "Weather Info";    
  }

  
}

// Register 'weather-app' custom element
window.customElements.define("weather-app", WeatherApp);
