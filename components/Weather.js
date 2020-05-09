import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { API_KEY } from "../utils/WeatherApiKey.js";
import SearchBar from "../components/SearchBar.js";
import * as api from "../api.js";
import { kelvinChecker } from "../utils/KelvinChecker.js";
import WeatherBody from "./WeatherBody.js";
import { Button } from "react-native-elements";

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
    isLoading: true,
    currentLocation: "",
    sunInfo: "",
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
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log("json of all weather", json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          allWeatherInfo: json.main,
          currentLocation: json.name,
          isLoading: false,
          weatherDescription: json.weather[0].description,
          image: json.weather[0].icon,
          sunInfo: json.sys,
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
        // console.log("new location data", res.data);
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
          sunInfo: data.sys,
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
      isLoading,
      sunInfo,
    } = this.state;

    console.log("STATEEEEEEEEEEEEEEEEEEEEEEEE", this.state.sunInfo);

    return (
      <View style={styles.weatherContainer}>
        <ImageBackground
          source={require("../assets/beach.jpg")}
          style={styles.backgroundImage}
        >
          <View style={styles.child}>
            <SearchBar
              handleInput={this.handleInput}
              handleSearch={this.handleSearch}
              enteredLocation={enteredLocation}
            />

            {searched ? (
              <View style={styles.locationContainer}>
                <Text style={styles.location}>{newLocation} </Text>
              </View>
            ) : (
              <View style={styles.locationContainer}>
                <Text style={styles.headerText}>{currentLocation} </Text>
              </View>
            )}
            <View style={styles.headerContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://openweathermap.org/img/wn/${image}@2x.png`,
                }}
              />
              <Text style={styles.location}>
                {kelvinChecker(temperature)}˚C
              </Text>
            </View>

            <WeatherBody
              handleCurrentWeather={this.handleCurrentWeather}
              weatherCondition={weatherCondition}
              weatherDescription={weatherDescription}
              allWeatherInfo={allWeatherInfo}
              sunInfo={sunInfo}
            />

            {searched ? (
              <View>
                <Button
                  title="Back to current weather"
                  onPress={this.handleCurrentWeather}
                ></Button>
              </View>
            ) : (
              <View>
                <Text> </Text>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  image: {
    width: 120,
    height: 120,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  child: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  searchbar: {
    padding: 0,
  },
  inputContainer: {
    width: "80%",
    borderColor: "white",
    borderWidth: 1,
    padding: 7.5,
    flex: 1,
  },
  location: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 44,
    color: "white",
    backgroundColor: "transparent",
    fontFamily: "sans-serif",
    fontWeight: "900",
    fontWeight: "bold",
  },
  locationContainer: {
    flex: 2,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  headerContainer: {
    flex: 3,
    alignItems: "center",
  },
  headerText: {
    fontSize: 44,
    color: "white",
    flex: 3,
    fontFamily: "sans-serif",
    fontWeight: "900",
  },
  bodyContainer: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },
  buttonContainer: {
    flex: 4,
  },
  title: {
    fontSize: 40,
    color: "white",
  },
  subtitle: {
    fontSize: 24,
    color: "white",
  },
});

export default Weather;
