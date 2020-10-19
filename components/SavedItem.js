import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import allActions from "../store/actions";

const SavedItem = ({
  regex,
  name,
  mainTextColor,
  borderColor,
  lightColor,
  navigation,
  subtitleColor,
  id
}) => {
  const dispatch = useDispatch();

  const deleteSavedItem = () => {
    dispatch(allActions.deleteSelectedSaved(id));
    dispatch(allActions.storeSaved());
  };

  const sendSavedToTester = () => {
    dispatch(allActions.addSavedToRegex(regex));
    navigation.navigate("Tester");
  };

  
  return (
    <View style={[styles.documentItem, { borderColor: borderColor }]}>
      <TouchableOpacity style={styles.regex} onPress={sendSavedToTester}>
        <Text numberOfLines={1} style={{ color: mainTextColor, fontSize: 20 }}>
          {name}
        </Text>
        <Text numberOfLines={1} style={{ color: subtitleColor, fontSize: 14 }}>
          {regex}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={deleteSavedItem}>
        <FontAwesome name="trash" size={24} color={mainTextColor} />
      </TouchableOpacity>
    </View>
  );
};



export default SavedItem;

