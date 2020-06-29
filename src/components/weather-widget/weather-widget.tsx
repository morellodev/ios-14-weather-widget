import { Component, ComponentInterface, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "weather-widget",
  styleUrl: "weather-widget.css",
  shadow: true,
})
export class WeatherWidget implements ComponentInterface {
  @Prop() location: string = "Milan";
  @Prop() condition: string = "Mostly Sunny";
  @Prop() tempHigh: number = 32;
  @Prop() tempLow: number = 24;
  @Prop() temperature: number = 28;

  render() {
    return (
      <Host>
        <div>
          <h3 class="location">{this.location}</h3>
          <h4 class="temperature">{this.temperature}°</h4>
        </div>
        <div>
          <ion-icon class="weather icon" name="sunny"></ion-icon>
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
