import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_KEY } from "nadiaToteWeather/utils/WeatherApiKey.js";
import Axios from "axios";
import { FarenheitToCelsius } from "nadiaToteWeather/utils/FarenheitToCelsius.js";

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
  };

  handleInput = (locationToSearch) => {
    console.log("handling input", locationToSearch);
    this.setState({ enteredLocation: locationToSearch });
  };

  handleSearch = () => {
    const { enteredLocation } = this.state;

    this.fetchNewLocationWeather(enteredLocation);

    const newTemp = FarenheitToCelsius(170);

    console.log("NEWWWWWWWWWWWWW TEMP", newTemp);
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
        });
      })
      .catch((err) => {
        console.log(
          "there's been an error getting the new location details" + err.message
        );
      });
  };

  render() {
    const { enteredLocation } = this.state;
    console.log(this.props.weatherDescription);

    console.log("STATEEEEEEEEEEEEEEEEEEEEEEEE", this.state);
    return (
      <View style={styles.weatherContainer}>
        <View style={styles.searchbar}>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.inputContainer}
              placeholder="Enter location"
              value={enteredLocation}
              onChangeText={(location) => this.handleInput(location)}
              ref={"textInput1"}
            />

            <Button title="Search" onPress={this.handleSearch} />
          </View>
        </View>
        <View style={styles.headerContainer}>
          <Text>Current Location: {this.props.currentLocation} </Text>
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: `http://openweathermap.org/img/wn/${this.props.image}@2x.png`,
            }}
          />

          <Text style={styles.tempText}>{this.props.temperature}˚C</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{this.props.weatherDescription}</Text>
          <Text style={styles.subtitle}></Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: "pink",
  },
  searchbar: {
    padding: 40,
  },
  inputContainer: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 7.5,
    flex: 1,
  },
  location: {
    padding: 10,
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  tempText: {
    fontSize: 48,
    color: "#fff",
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
    color: "#fff",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
  },
});

export default Weather;
