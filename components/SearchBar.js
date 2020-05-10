import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Button } from "react-native-elements";

const SearchBar = (props) => {
  return (
    <View style={styles.searchbar}>
      <View style={{ flexDirection: "row" }}>
        <Entypo name="location-pin" size={35} color="black" />
        <TextInput
          style={styles.inputContainer}
          placeholder="Enter location"
          value={props.enteredLocation}
          onChangeText={(location) => props.handleInput(location)}
        />
        <Button title="Search" onPress={props.handleSearch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    padding: 40,
  },

  inputContainer: {
    width: "80%",
    borderColor: "white",
    borderWidth: 1.5,
    padding: 7.5,
    flex: 1,
    color: "black",
    backgroundColor: "white",
  },
  location: {
    padding: 0,
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 48,
    color: "white",
  },
});
export default SearchBar;
