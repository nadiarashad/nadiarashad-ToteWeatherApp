import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button, FlatList } from "react-native";
import { kelvinChecker } from "../utils/KelvinChecker.js";
import { secondsToLocalTime } from "../utils/SecondsToLocalTime";
// import Swiper from "react-native-swiper";

const WeatherBody = (props) => {
  let ts = new Date();

  return (
    // <View style={styles.bodyContainer}>
    //   <Text style={styles.title}>Currently: {props.weatherCondition}</Text>
    //   <Text style={styles.subtitle}>
    //     Feels like: {kelvinChecker(props.allWeatherInfo.feels_like)}˚C
    //   </Text>

    //   <Text style={styles.subtitle}>
    //     Humidity: {props.allWeatherInfo.humidity}%
    //   </Text>
    //   <Text style={styles.subtitle}>
    //     Min temp: {kelvinChecker(props.allWeatherInfo.temp_min)}˚C
    //   </Text>
    //   <Text style={styles.subtitle}>
    //     Max temp: {kelvinChecker(props.allWeatherInfo.temp_max)}˚C
    //   </Text>
    //   <Text style={styles.subtitle}>
    //     Sunrise: {secondsToLocalTime(props.sunInfo.sunrise)}
    //   </Text>
    //   <Text style={styles.subtitle}>
    //     Sunset: {secondsToLocalTime(props.sunInfo.sunset)}
    //   </Text>
    // </View>

    <View></View>
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
    fontSize: 36,

    fontFamily: "sans-serif",
    color: "white",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
    color: "white",
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
});

export default WeatherBody;
