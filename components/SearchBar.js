import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

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
});
export default SearchBar;
