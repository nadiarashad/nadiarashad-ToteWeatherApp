import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Weather from "../nadiaToteWeather/components/Weather.js";

export default class App extends React.Component {
  state = {
    isLoading: false,
  };

  render() {
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        {/* <ImageBackground
          source={require("./assets/sky.jpg")}
          style={styles.backgroundImage}
        > */}
        {isLoading ? <Text>Fetching The Weather</Text> : <Weather />}
        {/* </ImageBackground> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // backgroundColor: "transparent",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "stretch",
  },
});
