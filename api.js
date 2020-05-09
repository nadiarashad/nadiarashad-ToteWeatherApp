import Axios from "axios";
import { API_KEY } from "./utils/WeatherApiKey";

export const fetchNewWeather = (enteredLocation) => {
  return Axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${enteredLocation}&appid=${API_KEY}`
  );
};
