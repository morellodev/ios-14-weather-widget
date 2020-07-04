export function getIoniconFromOwmWeatherId(id: number) {
  if (id >= 200 && id < 300) {
    return "thunderstorm";
  }

  if (id >= 300 && id < 600) {
    return "rainy";
  }

  if (id >= 600 && id < 700) {
    return "snow";
  }

  if (id >= 700 && id < 800) {
    return "reorder-four";
  }

  if (id === 801) {
    return "partly-sunny";
  }

  if (id >= 802 && id < 805) {
    return "cloudy";
  }

  return "sunny";
}
