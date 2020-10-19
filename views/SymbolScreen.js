import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
const SymbolScreen = ({ navigation }) => {
  const {
    mainTextColor,
    darkColor,
    lightColor,
    mainColor,
    mediumColor,
    secondaryColor,
    subtitleColor
  } = useSelector((state) => state.themeReducer.themeColors);
  const { symbol, snippet, paragraph, documentType } = useSelector(
    (state) => state.docsReducer.selectedDocument
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: darkColor }]}>
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={26} color={secondaryColor} />
        </TouchableOpacity>

        <View style={styles.titleWrap}>
          <Text style={[styles.title, { color: secondaryColor }]}>
            {symbol}
          </Text>

          <View
            style={[styles.line, { borderBottomColor: mediumColor }]}
          ></View>
          <Text style={[styles.subtitle, { color: subtitleColor }]}>
            {documentType}
          </Text>
        </View>
      </View>
      <View style={[styles.main, { backgroundColor: mediumColor }]}>
        <Text style={[styles.paragraph, { color: mainTextColor }]}>
          {paragraph}
        </Text>
      </View>
    </ScrollView>
  );
};



export default SymbolScreen;
