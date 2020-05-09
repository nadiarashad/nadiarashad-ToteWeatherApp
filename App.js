import React, { useState, Component } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Weather from "../nadiaToteWeather/components/Weather.js";

export default class App extends Component {
  state = {
    isLoading: false,
  };

  render() {
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? <Text>Fetching The Weather</Text> : <Weather />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "stretch",
  },
});
