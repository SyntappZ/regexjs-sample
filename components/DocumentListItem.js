import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import allActions from "../store/actions";
const DocumentListItem = ({
  symbol,
  snippet,
  iconColor,
  dispatchType,
  navigation,
  docId,
  subtextColor,
  lightColor,
  mainTextColor,
}) => {
  const dispatch = useDispatch();

  const handleModal = () => {
    switch (dispatchType) {
      case "RegEx":
        dispatch(allActions.selectRegexDocument(docId));
        break;
      case "Methods":
        dispatch(allActions.selectMethodsDocument(docId));
        break;
      case "Flags":
        dispatch(allActions.selectFlagsDocument(docId));
        break;
    }

    navigation.navigate("Modal");
  };
  return (
    <TouchableOpacity
      style={[styles.documentItem, { backgroundColor: lightColor }]}
      onPress={handleModal}
    >
      <View style={styles.symbol}>
        <Text style={{ color: mainTextColor, fontSize: 16 }}>{symbol}</Text>
      </View>
      <View style={styles.previewText}>
        <Text style={{ color: mainTextColor, fontSize: 12 }}>{snippet}</Text>
      </View>
      <View style={styles.arrow}>
        <AntDesign name="rightcircle" size={24} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
};



export default DocumentListItem;
