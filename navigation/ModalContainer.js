import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import SymbolScreen from "../views/SymbolScreen";
import SettingsScreen from "../views/SettingsScreen";
import { useSelector, useDispatch } from "react-redux";
const ModalContainer = ({ navigation }) => {
  const selectedDocument = useSelector(
    (state) => state.docsReducer.selectedDocument
  );

  return selectedDocument ? (
    <SymbolScreen navigation={navigation} />
  ) : (
    <SettingsScreen navigation={navigation} />
  );
};



export default ModalContainer;
