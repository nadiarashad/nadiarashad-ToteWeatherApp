import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, TextInput } from "react-native";
import Weather from "nadiaToteWeather/components/Weather.js";
import { API_KEY } from "nadiaToteWeather/utils/WeatherApiKey.js";

export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    allWeatherInfo: {},
    currentLocation: "",
    weatherDescription: "",
    error: null,
    image: "",
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        this.setState({
          error: "Error Getting Weather Conditions",
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log("json of all weather", json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          allWeatherInfo: json.main,
          currentLocation: json.name,
          isLoading: false,
          weatherDescription: json.weather[0].description,
          image: json.weather[0].icon,
        });
      });
  }

  render() {
    const {
      isLoading,
      temperature,
      weatherCondition,
      allWeatherInfo,
      currentLocation,
      weatherDescription,
      image,
    } = this.state;

    console.log(allWeatherInfo, currentLocation, weatherDescription, image);
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text>Fetching The Weather</Text>
        ) : (
          <Weather
            weather={weatherCondition}
            temperature={temperature}
            currentLocation={currentLocation}
            weatherDescription={weatherDescription}
            image={image}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 7.5,
    flex: 2,
  },
});
