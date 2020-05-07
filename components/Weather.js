import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

import { API_KEY } from "nadiaToteWeather/utils/WeatherApiKey.js";
import Axios from "axios";
import SearchBar from "nadiaToteWeather/components/SearchBar.js";

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

  handleInput = (locationToSearch) => {
    console.log("handling input", locationToSearch);
    this.setState({ enteredLocation: locationToSearch });
  };

  handleSearch = () => {
    const { enteredLocation } = this.state;

    this.fetchNewLocationWeather(enteredLocation);
  };

  fetchNewLocationWeather = (enteredLocation) => {
    return Axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${enteredLocation}&appid=${API_KEY}`
    )
      .then((res) => {
        console.log(res.data.name, res.data.main.temp);
        return res.data;
      })
      .then((data) => {
        console.log("data", data);
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

        {searched ? (
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>{weatherCondition}</Text>
            <Text style={styles.subtitle}></Text>
            <Button
              title="Back to current weather"
              onPress={this.handleCurrentWeather}
            ></Button>
          </View>
        ) : (
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>{weatherDescription}</Text>
            <Text style={styles.subtitle}>Humidity: </Text>
          </View>
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

// return (
//   <View style={styles.weatherContainer}>
//     <SearchBar
//       handleInput={this.handleInput}
//       handleSearch={this.handleSearch}
//       enteredLocation={enteredLocation}
//     />

//     {searched ? (
//       <View style={styles.headerContainer}>
//         <Text style={styles.location}>{newLocation} </Text>
//         <Image
//           style={{ width: 110, height: 110 }}
//           source={{
//             uri: `http://openweathermap.org/img/wn/${image}@2x.png`,
//           }}
//         />

//         <Text style={styles.tempText}>
//           {Math.ceil(temperature - 273.15)}˚C
//             </Text>
//       </View>
//     ) : (
//         <View style={styles.headerContainer}>
//           <Text style={styles.location}>{this.props.currentLocation} </Text>
//           <Image
//             style={{ width: 110, height: 110 }}
//             source={{
//               uri: `http://openweathermap.org/img/wn/${this.props.image}@2x.png`,
//             }}
//           />

//           <Text style={styles.tempText}>
//             {Math.ceil(this.props.temperature)}˚C
//             </Text>
//         </View>
//       )}

//     {searched ? (
//       <View style={styles.bodyContainer}>
//         <Text style={styles.title}>{weatherCondition}</Text>
//         <Text style={styles.subtitle}></Text>
//         <Button
//           title="Back to current weather"
//           onPress={this.handleCurrentWeather}
//         ></Button>
//       </View>
//     ) : (
//         <View style={styles.bodyContainer}>
//           <Text style={styles.title}>{this.props.weatherDescription}</Text>
//           <Text style={styles.subtitle}>Humidity: </Text>
//         </View>
//       )}
//   </View>
// );
