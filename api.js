import Axios from "axios";
import { API_KEY } from "nadiaToteWeather/utils/WeatherApiKey.js";

export const fetchNewWeather = (enteredLocation) => {
  return Axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${enteredLocation}&appid=${API_KEY}`
  );
};
