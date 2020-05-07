import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { API_KEY } from "nadiaToteWeather/utils/WeatherApiKey.js";
import Axios from "axios";
import SearchBar from "nadiaToteWeather/components/SearchBar.js";
import * as api from "nadiaToteWeather/api.js";

const remote = "nadiaToteWeather/components/Weather.js";

class Weather extends Component {
  state = {
    enteredLocation: "",
    temperature: 0,
    weatherCondition: null,
    allWeatherInfo: {},
    newLocation: "",
    weatherDescription: "",
    error: null,
    image: "",
    searched: false,
    isLoading: false,
    currentLocation: "",
  };

  componentDidMount() {
    //this code below will get the current position of the device
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //fetchWeather is invoked with your location
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        this.setState({
          error: "Error Getting Weather Conditions",
        });
      }
    );
  }

  //using your location I make a call to the API & return and setState with the data
  fetchWeather(lat, lon) {
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
      })
      .catch((err) => {
        console.log(
          "there's been an error getting the current location details" +
            err.message
        );
      });
  }

  //I use the users input location to make an Axios request to the API, returning the location data and setting state
  fetchNewLocationWeather = (enteredLocation) => {
    api
      .fetchNewWeather(enteredLocation)
      .then((res) => {
        console.log(res.data.name, res.data.main.temp);
        return res.data;
      })
      .then((data) => {
        this.setState({
          temperature: data.main.temp,
          weatherCondition: data.weather[0].main,
          allWeatherInfo: data.main,
          newLocation: data.name,
          isLoading: false,
          weatherDescription: data.weather[0].weatherDescription,
          image: data.weather[0].icon,
          enteredLocation: "",
          searched: true,
        });
      })
      .catch((err) => {
        console.log(
          "there's been an error getting the new location details" + err.message
        );
      });
  };

  //this function will setState with the users input location
  handleInput = (locationToSearch) => {
    this.setState({ enteredLocation: locationToSearch });
  };

  //this function will invoke fetchNewLocationWeather function to fetch all of the new location weather
  handleSearch = () => {
    const { enteredLocation } = this.state;

    this.fetchNewLocationWeather(enteredLocation);
  };

  //this function sets the boolean flag so the app renders back to the current weather
  handleCurrentWeather = () => {
    this.setState({ searched: false });
  };

  render() {
    const {
      enteredLocation,
      searched,
      temperature,
      weatherCondition,
      image,
      newLocation,
      currentLocation,
      weatherDescription,
      allWeatherInfo,
    } = this.state;

    console.log("STATEEEEEEEEEEEEEEEEEEEEEEEE", this.state);

    return (
      <View style={styles.weatherContainer}>
        <SearchBar
          handleInput={this.handleInput}
          handleSearch={this.handleSearch}
          enteredLocation={enteredLocation}
        />

        {searched ? (
          <View style={styles.headerContainer}>
            <Text style={styles.location}>{newLocation} </Text>
            <Image
              style={{ width: 110, height: 110 }}
              source={{
                uri: `http://openweathermap.org/img/wn/${image}@2x.png`,
              }}
            />

            <Text style={styles.tempText}>
              {Math.ceil(temperature - 273.15)}˚C
            </Text>
          </View>
        ) : (
          <View style={styles.headerContainer}>
            <Text style={styles.location}>{currentLocation} </Text>
            <Image
              style={{ width: 110, height: 110 }}
              source={{
                uri: `http://openweathermap.org/img/wn/${image}@2x.png`,
              }}
            />

            <Text style={styles.tempText}>{Math.ceil(temperature)}˚C</Text>
          </View>
        )}

        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{weatherCondition}</Text>
          <Text style={styles.subtitle}>
            Feels like: {allWeatherInfo.feels_like}˚C
          </Text>
          <Text style={styles.subtitle}>
            Humidity: {allWeatherInfo.humidity}%
          </Text>
        </View>
        {searched ? (
          <View>
            <Button
              title="Back to current weather"
              onPress={this.handleCurrentWeather}
            ></Button>
          </View>
        ) : (
          <Text style={styles.subtitle}></Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  searchbar: {
    padding: 40,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    flexDirection: "column",
  },
  inputContainer: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 7.5,
    flex: 1,
  },
  location: {
    padding: 0,
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 48,
    color: "black",
  },
  headerContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  tempText: {
    fontSize: 48,
    color: "black",
  },
  bodyContainer: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },

  title: {
    fontSize: 48,
    color: "black",
  },
  subtitle: {
    fontSize: 24,
    color: "black",
  },
});

export default Weather;
