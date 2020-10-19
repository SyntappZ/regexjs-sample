import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./store/store";
import React, { useEffect } from "react";
import NavContainer from "./navigation/NavContainer";
import Constants from "expo-constants";
const store = configureStore();

const App = () => (
  <Provider store={store}>
    <NavContainer />
  </Provider>
);

export default App;
