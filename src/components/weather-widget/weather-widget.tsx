import { Component, ComponentInterface, Host, State, h } from "@stencil/core";

// Services
import { getCurrentWeatherByCoords } from "../../services/weather";

// Utils
import { getIoniconFromOwmWeatherId } from "../../utils/owmIonicons";

@Component({
  tag: "weather-widget",
  styleUrl: "weather-widget.css",
  shadow: true,
})
export class WeatherWidget implements ComponentInterface {
  @State() location: string = "Milan";
  @State() condition: string = "Mostly Sunny";
  @State() iconName: string = "sunny";
  @State() tempHigh: number = 32;
  @State() tempLow: number = 24;
  @State() temperature: number = 28;

  componentWillLoad() {
    this.getUserLocation();
  }

  getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.onPositionGet,
        this.onPositionError
      );
    }
  };

  onPositionGet = async (position: Position) => {
    try {
      const weatherData = await getCurrentWeatherByCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        units: "metric",
      });

      this.location = weatherData.name;
      this.condition = weatherData.weather[0].main;
      this.iconName = getIoniconFromOwmWeatherId(weatherData.weather[0].id);
      this.temperature = Math.round(weatherData.main.temp);
      this.tempHigh = Math.ceil(weatherData.main.temp_max);
      this.tempLow = Math.floor(weatherData.main.temp_min);
    } catch (error) {
      console.log(error);
    }
  };

  onPositionError = (error: PositionError) => {
    console.log(error);
  };

  render() {
    return (
      <Host>
        <div>
          <h3 class="location">{this.location}</h3>
          <h4 class="temperature">{this.temperature}°</h4>
        </div>
        <div>
          <ion-icon
            class={`weather icon ${this.iconName}`}
            name={this.iconName}
          ></ion-icon>
          <h4 class="weather condition">{this.condition}</h4>
          <h4 class="weather temperatures">
            <span class="temp-high">H:{this.tempHigh}°</span>
            <span class="temp-low">L:{this.tempLow}°</span>
          </h4>
        </div>
      </Host>
    );
  }
}
