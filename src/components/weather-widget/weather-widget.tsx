import { Component, ComponentInterface, Host, State, h } from "@stencil/core";

// Services
import { getCurrentWeatherByCoords } from "../../services/weather";

interface WeatherData {
  location: string;
  condition: string;
  owmId: number;
  temp: number;
  tempHigh: number;
  tempLow: number;
}

@Component({
  tag: "weather-widget",
  styleUrl: "weather-widget.css",
  shadow: true,
})
export class WeatherWidget implements ComponentInterface {
  @State() weatherData: WeatherData = null;
  @State() error: Error = null;

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
    this.error = null;

    try {
      const weatherData = await getCurrentWeatherByCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        units: "metric",
      });

      this.weatherData = {
        location: weatherData.name,
        condition: weatherData.weather[0].description,
        owmId: weatherData.weather[0].id,
        temp: Math.round(weatherData.main.temp),
        tempHigh: Math.ceil(weatherData.main.temp_max),
        tempLow: Math.floor(weatherData.main.temp_min),
      };
    } catch (error) {
      this.error = error;
      this.weatherData = null;
    }
  };

  onPositionError = (error: PositionError) => {
    this.error = new Error(error.message);
  };

  render() {
    return this.weatherData ? (
      <Host>
        <div>
          <h3 class="location">{this.weatherData.location}</h3>
          <h4 class="temperature">{this.weatherData.temp}°</h4>
        </div>
        <div>
          <weather-icon
            class="weather icon"
            owm-id={this.weatherData.owmId}
          ></weather-icon>
          <h4 class="weather condition">{this.weatherData.condition}</h4>
          <h4 class="weather temperatures">
            <span class="temp-high">H:{this.weatherData.tempHigh}°</span>
            <span class="temp-low">L:{this.weatherData.tempLow}°</span>
          </h4>
        </div>
      </Host>
    ) : this.error ? (
      <Host>
        <centered-message>
          <ion-icon slot="icon" name="warning" size="large"></ion-icon>
          <p>{this.error.message}</p>
        </centered-message>
      </Host>
    ) : (
      <Host>
        <centered-message>
          <ion-icon slot="icon" name="arrow-down" size="large"></ion-icon>
          <p>Loading...</p>
        </centered-message>
      </Host>
    );
  }
}
