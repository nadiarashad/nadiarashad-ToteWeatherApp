# nadiarashad-ToteWeatherApp

Welcome to my first attempt at a React Native application! Please run the app in the browser as that is what I used to test.

This is a React-Native based weather App, it uses geo location to give the user their current location weather data and also allows the user to input a location of their choice to retrieve new data.

The weather data (e.g. humidity, wind speed, sunrise and more) is displayed using the react-native-snap-carousel to avoid the user having to scroll through pages of content.

The backend uses the Open Weather API, https://openweathermap.org/api.


Getting Started

Forking the repository

Fork the repo

Clone the Fork of this repository to you local machine, e.g. git clone https://github.com/nadiarashad/nadiarashad-ToteWeatherApp.git in your terminal

cd into the repository 

The following dependancies will need to be installed using the Node Package Manager (npm i or npm install), I have listed the minimum required version.

   "axios": "^0.19.2",
    "bootstrap": "^4.4.1",
    "chai": "^4.2.0",
    "detox": "^16.4.1",
    "expo": "~37.0.3",
    "expo-font": "~8.1.0",
    "express": "^4.17.1",
    "mocha": "^7.1.2",
    "moment": "^2.25.3",
    "nodemon": "^2.0.3",
    "opentype.js": "^1.3.3",
    "react": "~16.9.0",
    "react-dom": "~16.9.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-37.0.1.tar.gz",
    "react-native-elements": "^2.0.0",
    "react-native-snap-carousel": "^3.9.0",
    "react-native-swiper": "^1.6.0",
    "react-native-web": "~0.11.7",
    "socket.io": "^2.3.0"

The minimum version of Node required to run locally: v13.0.1

To run the app in your browser you will need to use the npm script - 'npm start'

The functionality was tested using Expo Cli web browser and also the Expo App downloaded on an Android device.

Utility functions were also tested using mocha and chai.

I hope you enjoy it! 

© 2020 GitHub, Inc.
