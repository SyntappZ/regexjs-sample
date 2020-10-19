import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HistoryItem from "../components/HistoryItem";
import SavedItem from "../components/SavedItem";
import allActions from "../store/actions";
import SettingsScreen from "./SettingsScreen";

import { Feather } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const SavedItems = ({ navigation }) => {
  const { mediumColor, lightColor, mainTextColor, borderColor, saveButtonColor } = useSelector(
    (state) => state.themeReducer.themeColors
  );
  const { savedData, savedCap } = useSelector((state) => state.savedReducer);
  return (
    <View style={[styles.main, { backgroundColor: mediumColor }]}>
      <Text style={styles.editMode}>{`${savedData.length}/${savedCap}`}</Text>
      <Text style={[styles.selectText, { color: mainTextColor }]}>Saved</Text>
      {savedData.map((item, i) => {
        return (
          <SavedItem
            key={i}
            lightColor={lightColor}
            mainTextColor={mainTextColor}
            borderColor={borderColor}
            subtitleColor={saveButtonColor}
            regex={item.regex}
            name={item.name}
            id={i}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
};
const HistoryItems = ({ navigation }) => {
  const { mediumColor, lightColor, mainTextColor, borderColor } = useSelector(
    (state) => state.themeReducer.themeColors
  );
  const { historyData, historyCap } = useSelector(
    (state) => state.historyReducer
  );

  return (
    <View style={[styles.main, { backgroundColor: mediumColor }]}>
      <Text
        style={styles.editMode}
      >{`${historyData.length}/${historyCap}`}</Text>
      <Text style={[styles.selectText, { color: mainTextColor }]}>History</Text>
      {historyData.map((item, i) => {
        return (
          <HistoryItem
            key={i}
            docId={i}
            lightColor={lightColor}
            mainTextColor={mainTextColor}
            borderColor={borderColor}
            regex={item.regex}
            date={item.date}
            time={item.time}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
};

const MyTabBar = ({
  state,
  descriptors,
  navigation,
  position,
  setChosenType,
}) => {
  const { secondaryColor, subtitleColor } = useSelector(
    (state) => state.themeReducer.themeColors
  );
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          setChosenType(route.name);
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // const inputRange = state.routes.map((_, i) => i);
        // const opacity = Animated.interpolate(position, {
        //   inputRange,
        //   outputRange: inputRange.map((i) => (i === index ? 1 : 0.5)),
        // });
        const textColor = isFocused ? secondaryColor : subtitleColor;
        const borderColor = isFocused ? secondaryColor : "transparent";

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1, paddingHorizontal: 30 }}
          >
            <Animated.Text
              style={[
                styles.buttonTab,
                { color: textColor, borderBottomColor: borderColor },
              ]}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MyTabs = ({ chosenType, setChosenType }) => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar setChosenType={setChosenType} {...props} />}
      swipeEnabled={false}
    >
      <Tab.Screen name="Saved" component={SavedItems} chosenType={chosenType} />
      <Tab.Screen
        name="History"
        component={HistoryItems}
        chosenType={chosenType}
      />
    </Tab.Navigator>
  );
};
const HistoryScreen = ({ navigation }) => {
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
    borderColor,
  } = useSelector((state) => state.themeReducer.themeColors);
  const [types] = useState(["History", "Saved"]);
  const [chosenType, setChosenType] = useState("Saved");
  const [docs, setDocs] = useState([]);
  // const [savedViewIndex, setSavedViewIndex] = useState(0);
  // const [historyViewIndex, setHistoryViewIndex] = useState(1);
  const openSettings = () => {
    dispatch(allActions.removeSelectedDocument());
    navigation.navigate("Modal");
  };

  useEffect(() => {}, [chosenType]);

  // useEffect(() => {
  //   setTotalHistory(`${historyData.length}/10`);
  // }, [historyData]);

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
            RegEx
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <MyTabs chosenType={chosenType} setChosenType={setChosenType} />
      </View>
    </ScrollView>
  );
};



export default HistoryScreen;
