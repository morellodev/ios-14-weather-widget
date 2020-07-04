import qs from "query-string";

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
  const queryParameters = qs.stringify({
    ...params,
    appid: process.env.OWM_KEY,
  });

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${queryParameters}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
