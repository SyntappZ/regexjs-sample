import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import allActions from "../store/actions";
import { dateFormat } from "../store/storageFunctions.js";
const HistoryItem = ({
  regex,
  date,
  time,
  mainTextColor,
  borderColor,
  lightColor,
  navigation,
}) => {
  const dateOrTime = dateFormat() === date ? time : date;

  const dispatch = useDispatch();

  const sendHistory = () => {
    dispatch(allActions.addHistoryToRegex(regex));
    navigation.navigate("Tester");
  };
  return (
    <TouchableOpacity
      style={[styles.documentItem, { borderColor: borderColor }]}
      onPress={sendHistory}
    >
      <View style={styles.regex}>
        <Text numberOfLines={1} style={{ color: mainTextColor, fontSize: 16 }}>
          {regex}
        </Text>
      </View>
      <View style={styles.date}>
        <Text style={{ color: mainTextColor, fontSize: 12 }}>{dateOrTime}</Text>
      </View>
    </TouchableOpacity>
  );
};


export default HistoryItem;
