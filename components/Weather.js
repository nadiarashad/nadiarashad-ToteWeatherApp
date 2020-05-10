import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import { API_KEY } from "../utils/WeatherApiKey.js";
import SearchBar from "../components/SearchBar.js";
import * as api from "../api.js";
import { kelvinChecker } from "../utils/KelvinChecker.js";
import { Button } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { secondsToLocalTime } from "../utils/SecondsToLocalTime";

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
    activeIndex: 0,
    carouselItems: [],
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
          carouselItems: [
            ...this.state.carouselItems,
            {
              weatherDescription: "Currently: " + json.weather[0].description,
            },
            {
              max_temp: "Max Temp: " + kelvinChecker(json.main.temp_max) + "˚C",
            },
            {
              min_temp: "Min Temp: " + kelvinChecker(json.main.temp_min) + "˚C",
            },
            { humidity: "Humidity: " + json.main.humidity + "%" },
            {
              feelsLike:
                "Feels like: " + kelvinChecker(json.main.feels_like) + "˚C",
            },
            {
              windSpeed: "Wind speed: " + json.wind.speed + " mph",
            },
            {
              location: "Location: " + json.name,
            },
            {
              sunrise: "Sunrise: " + secondsToLocalTime(json.sys.sunrise),
            },
            {
              sunset: "Sunset: " + secondsToLocalTime(json.sys.sunset),
            },
          ],
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
        console.log("new location data", res.data);
        return res.data;
      })
      .then((data) => {
        this.setState({
          temperature: data.main.temp,
          newLocation: data.name,
          isLoading: false,
          image: data.weather[0].icon,
          enteredLocation: "",
          searched: true,
          carouselItems: [
            ...this.state.carouselItems,
            {
              weatherDescription: "Currently: " + data.weather[0].description,
            },
            {
              location: "Location: " + data.name,
            },
            {
              sunrise: "Sunrise: " + secondsToLocalTime(data.sys.sunrise),
            },
            {
              sunset: "Sunset: " + secondsToLocalTime(data.sys.sunset),
            },
            {
              max_temp: "Max Temp: " + kelvinChecker(data.main.temp_max) + "˚C",
            },
            {
              min_temp: "Min Temp: " + kelvinChecker(data.main.temp_min) + "˚C",
            },
            { humidity: "Humidity: " + data.main.humidity + "%" },
            {
              feelsLike:
                "Feels like: " + kelvinChecker(data.main.feels_like) + "˚C",
            },
            {
              windSpeed: "Wind speed: " + data.wind.speed + " mph",
            },
          ],
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

  //this function will invoke fetchNewLocationWeather function to fetch all of the new location weather and reset the carousel data to an empty array
  handleSearch = () => {
    const { enteredLocation } = this.state;
    this.setState({ carouselItems: [] });
    this.fetchNewLocationWeather(enteredLocation);
  };

  //this function sets the boolean flag so the app renders back to the current weather
  handleCurrentWeather = () => {
    this.setState({ searched: false });
  };

  //this function renders the display for the carousel
  renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 4,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <MaterialCommunityIcons name="weather-cloudy" size={45} color="black" />
        <Text style={styles.subtitle}>{item.weatherDescription}</Text>
        <Text style={styles.subtitle}>{item.feelsLike}</Text>
        <Text style={styles.subtitle}>{item.min_temp}</Text>
        <Text style={styles.subtitle}>{item.max_temp}</Text>
        <Text style={styles.subtitle}>{item.windSpeed}</Text>
        <Text style={styles.subtitle}>{item.humidity}</Text>
        <Text style={styles.subtitle}>{item.location}</Text>
        <Text style={styles.subtitle}>{item.sunrise}</Text>
        <Text style={styles.subtitle}>{item.sunset}</Text>
      </View>
    );
  };

  render() {
    const {
      enteredLocation,
      searched,
      temperature,
      image,
      newLocation,
      currentLocation,
      isLoading,
    } = this.state;

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

            <SafeAreaView style={styles.container}>
              <TouchableHighlight
                onPress={() =>
                  this.carousel._snapToItem(this.state.activeIndex - 1)
                }
              >
                <EvilIcons name="arrow-left" size={35} color="white" />
              </TouchableHighlight>

              <View>
                <Carousel
                  ref={(ref) => (this.carousel = ref)}
                  data={this.state.carouselItems}
                  sliderWidth={280}
                  itemWidth={280}
                  renderItem={this.renderItem}
                  onSnapToItem={(index) =>
                    this.setState({ activeIndex: index })
                  }
                />
              </View>
              <TouchableHighlight
                onPress={() =>
                  this.carousel._snapToItem(this.state.activeIndex + 1)
                }
              >
                <EvilIcons name="arrow-right" size={35} color="white" />
              </TouchableHighlight>
            </SafeAreaView>

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
    fontFamily: "sans-serif",
    fontWeight: "bold",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    flex: 5,
    backgroundColor: "transparent",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 0,
    textAlign: "center",
    justifyContent: "space-around",
  },
});

export default Weather;
