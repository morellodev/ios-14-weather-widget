import { Component, ComponentInterface, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "weather-icon",
  styleUrl: "weather-icon.css",
  shadow: true,
})
export class WeatherIcon implements ComponentInterface {
  @Prop() owmId: number;

  render() {
    if (this.owmId >= 200 && this.owmId < 300) {
      return (
        <Host>
          <ion-icon class="thunderstorm" name="thunderstorm"></ion-icon>
        </Host>
      );
    }

    if (this.owmId >= 300 && this.owmId < 600) {
      return (
        <Host>
          <ion-icon class="rainy" name="rainy"></ion-icon>
        </Host>
      );
    }

    if (this.owmId >= 600 && this.owmId < 700) {
      return (
        <Host>
          <ion-icon class="snow" name="snow"></ion-icon>
        </Host>
      );
    }

    if (this.owmId >= 700 && this.owmId < 800) {
      return (
        <Host>
          <ion-icon class="fog" name="reorder-four"></ion-icon>
        </Host>
      );
    }

    if (this.owmId === 800) {
      return (
        <Host>
          <ion-icon class="sunny" name="sunny"></ion-icon>
        </Host>
      );
    }

    if (this.owmId === 801) {
      return (
        <Host>
          <ion-icon class="partly-sunny" name="partly-sunny"></ion-icon>
        </Host>
      );
    }

    if (this.owmId >= 802 && this.owmId < 805) {
      return (
        <Host>
          <ion-icon class="cloudy" name="cloudy"></ion-icon>
        </Host>
      );
    }

    return <Host></Host>;
  }
}
