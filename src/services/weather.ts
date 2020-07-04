import qs from "query-string";

const OWM_KEY = "723ed8b4ed4f4c56202300995ca6bbb8";

interface OwmGetCurrentWeatherParams {
  lang?: string;
  units?: "standard" | "metric" | "imperial";
}

interface OwmGetCurrentWeatherByCoordsParams
  extends OwmGetCurrentWeatherParams {
  lat: number;
  lon: number;
}

export async function getCurrentWeatherByCoords(
  params: OwmGetCurrentWeatherByCoordsParams
) {
  const queryParameters = qs.stringify({ ...params, appid: OWM_KEY });

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${queryParameters}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
