import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

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
        <Button
          title="Search"
          // icon={<Icon name="arrow-right" size={15} color="white" />}
          onPress={props.handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    padding: 40,
    // backgroundColor: "transparent",
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
    // backgroundColor: "transparent",
  },
});
export default SearchBar;
