import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { kelvinChecker } from "../utils/KelvinChecker.js";
import moment from "moment";

const WeatherBody = (props) => {
  let ts = new Date();

  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.title}>{props.weatherCondition}</Text>
      <Text style={styles.subtitle}>
        Feels like: {kelvinChecker(props.allWeatherInfo.feels_like)}˚C
      </Text>
      <Text style={styles.subtitle}>
        Humidity: {props.allWeatherInfo.humidity}%
      </Text>
      <Text style={styles.subtitle}>
        Min temp: {kelvinChecker(props.allWeatherInfo.temp_min)}˚C
      </Text>
      <Text style={styles.subtitle}>
        Max temp: {kelvinChecker(props.allWeatherInfo.temp_max)}˚C
      </Text>
      <Text style={styles.subtitle}>
        Sunrise: {ts.toLocaleTimeString(props.sunInfo.sunrise)}
      </Text>
      <Text style={styles.subtitle}>
        Sunset: {ts.toLocaleTimeString(props.sunInfo.sunset)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 40,

    color: "black",
  },
  subtitle: {
    fontSize: 24,
    color: "black",
  },
});

export default WeatherBody;
