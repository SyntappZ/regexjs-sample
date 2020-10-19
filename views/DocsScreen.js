import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DocumentListItem from "../components/DocumentListItem";
import allActions from "../store/actions";
import SettingsScreen from "./SettingsScreen";
import { Feather } from "@expo/vector-icons";
import { withSafeAreaInsets } from "react-native-safe-area-context";
const DocsScreen = ({ navigation }) => {
  const regexDocs = useSelector((state) => state.docsReducer.regexDocs);
  const methodsDocs = useSelector((state) => state.docsReducer.methodsDocs);
  const flagsDocs = useSelector((state) => state.docsReducer.flagsDocs);
  const dispatch = useDispatch();
  const {
    mainTextColor,
    darkColor,
    lightColor,
    mainColor,
    mediumColor,
    secondaryColor,
    textColor,
    subtitleColor,
  } = useSelector((state) => state.themeReducer.themeColors);
  const [types] = useState(["RegEx", "Methods", "Flags"]);
  const [chosenType, setChosenType] = useState("RegEx");
  const [docs, setDocs] = useState([
    { title: "RegEx", docs: regexDocs },
    { title: "Methods", docs: methodsDocs },
    { title: "Flags", docs: flagsDocs },
  ]);

  const openSettings = () => {
    dispatch(allActions.removeSelectedDocument());
    navigation.navigate("Modal");
    
  };

  useEffect(() => {
    const doc = docs.find((item) => item.title === chosenType);
    const remaining = docs.filter((item) => item !== doc);
    remaining.unshift(doc);
    setDocs(remaining);
  }, [chosenType]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: darkColor }]}>
      <View style={styles.top}>
        <TouchableOpacity onPress={openSettings} style={styles.settingsButton}>
          <Feather name="settings" size={24} color={textColor} />
        </TouchableOpacity>
        <View style={styles.titleWrap}>
          <Text style={[styles.title, { color: mainColor }]}>{chosenType}</Text>

          <Text
            style={[
              styles.subtitle,
              { color: mainTextColor, borderBottomColor: mediumColor },
            ]}
          >
            Documentation
          </Text>
        </View>

        <View style={styles.types}>
          {types.map((type, i) => {
            const color = chosenType === type ? secondaryColor : subtitleColor;

            const buttonStyle =
              chosenType === type
                ? [styles.button, { borderBottomColor: secondaryColor }]
                : styles.button;
            return (
              <TouchableOpacity
                style={buttonStyle}
                key={i}
                onPress={() => setChosenType(type)}
              >
                <Text style={{ color: color, fontSize: 16 }}>{type}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={[styles.main, { backgroundColor: mediumColor }]}>
        {docs.map((item) => {
          return (
            <RenderDocs
              docs={item.docs}
              title={item.title}
              key={item.title}
              navigation={navigation}
              lightColor={lightColor}
              mainTextColor={mainTextColor}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const RenderDocs = ({ docs, title, navigation, lightColor, mainTextColor }) => {
  return (
    <>
      <Text style={[styles.selectText, {color: mainTextColor}]}>{title}</Text>
      {docs.map((item, i) => {
        return (
          <DocumentListItem
            key={i}
            symbol={item.symbol}
            snippet={item.snippet}
            iconColor={"#555"}
            navigation={navigation}
            dispatchType={title}
            docId={i}
            lightColor={lightColor}
            mainTextColor={mainTextColor}
          />
        );
      })}
    </>
  );
};



export default DocsScreen;
