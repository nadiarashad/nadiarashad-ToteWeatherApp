import React, { useState, Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Weather from "../nadiaToteWeather/components/Weather.js";
// import { useFonts } from "@use-expo/font";
// import { Font } from "expo";
import * as Font from "expo-font";

export default class App extends Component {
  state = {
    isLoading: false,
  };

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     "Chewy-Regular": {
  //       uri: require("./assets/fonts/Chewy-Regular.ttf"),
  //       fontDisplay: FontDisplay.FALLBACK,
  //     },
  //
  //   });
  //   // this.props.fontLoader();
  // }

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
