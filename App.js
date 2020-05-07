import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Weather from "nadiaToteWeather/components/Weather.js";

export default class App extends React.Component {
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
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 7.5,
    flex: 2,
  },
});
