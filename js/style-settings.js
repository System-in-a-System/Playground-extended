// Import superclass
import { WindowFrame } from "./window-frame.js";

// Create a structural template for a custom element 'style-settings'
const template = document.createElement("template");

template.innerHTML = `
<div id="style-settings-container"
  style="
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 327px;">
    
    <div>
        <input type="radio" id="style-alternative-1" name="style-alternatives" value="style-alternative-1" checked>
        <label for="style-alternative-1">Cosmic Tranquility</label><br>
    </div>
    
    <div>
        <input type="radio" id="style-alternative-2" name="style-alternatives" value="style-alternative-2">
        <label for="style-alternative-2">Back Home</label><br>
    </div>
    
    <div>
        <input type="radio" id="style-alternative-3" name="style-alternatives" value="style-alternative-3">
        <label for="style-alternative-3">Adventurous</label>
    </div>
    

    <button id="apply-button" 
      style="
      width: 100px;
      height: 50px;
      ">
      Apply</button>

</div>
`;

/**
 * Defines the functionality for 'style-settings' custom element
 *
 * @class StyleSettings
 * @extends {WindowFrame}
 */
class StyleSettings extends WindowFrame {
  constructor() {
    super();

    // Deep clone 'style-settings' template & Append it to the 'content block' from the WindowFrame parent class
    this._contentBlock.appendChild(template.content.cloneNode(true));
    this._iconHolder.style.background =
      "url(https://img.utdstc.com/icon/6aa/5f4/6aa5f4f37a2a4111e3f8cdca68dab3b9d0d38632479bcccf594891ffd7b2f4d2:100) no-repeat";
    this._iconHolder.style.backgroundSize = "contain";
    this._appTitle.textContent = "Style Settings";

    // Reference the structural parts of the appended 'style-settings' template
    this._styleSettingsContainer = this._contentBlock.querySelector("#style-settings-container");
    this._styleAlternative1 = this._contentBlock.querySelector("#style-alternative-1");
    this._styleAlternative2 = this._contentBlock.querySelector("#style-alternative-2");
    this._styleAlternative3 = this._contentBlock.querySelector("#style-alternative-3");
    this._applyButton = this._contentBlock.querySelector("#apply-button");
  }

  /**
   * Called when connected to the DOM
   *
   * @memberof StyleSettings
   */
  connectedCallback() {
    this.positionElement();

    this._applyButton.addEventListener("click", (e) => {
        if(this._styleAlternative1.checked) {
            document.body.style.backgroundImage = 'url("https://w-dog.ru/wallpapers/2/19/501625857244167/kosmos-fantastika-mirozdanie-planeta-gorizont-ochertaniya-svet-zvezda-vosxod-bezdna-tma-prostranstvo-tumannosti-rossyp-zv-zd.jpg")';
        } else if(this._styleAlternative2.checked) {
            document.body.style.backgroundImage = 'url("https://cdn.wallpapersafari.com/21/65/B8aWZ2.jpg")';
        } else if(this._styleAlternative3.checked) {
            document.body.style.backgroundImage = 'url("https://wallpapershome.com/images/pages/pic_h/15621.jpg")'; 
        }
    })

    this.listenForDragging();

    this._frame.addEventListener("click", (e) => {
      this.refocusStack();
    });

    this._exitButton.addEventListener("click", (e) => {
      this.remove();
    });
  }
}

// Register 'style-settings' custom element
window.customElements.define("style-settings", StyleSettings);
