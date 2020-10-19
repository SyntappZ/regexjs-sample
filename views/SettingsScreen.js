import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import allActions from "../store/actions";
import { storeData } from "../store/storageFunctions";
const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const createTwoButtonAlert = (storageData) =>
    Alert.alert(
      `Delete all ${storageData}`,
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteHistory()},
      ],
      { cancelable: false }
    );

  const {
    mainTextColor,
    darkColor,
    lightColor,
    mainColor,
    mediumColor,
    secondaryColor,
    subtitleColor,
  } = useSelector((state) => state.themeReducer.themeColors);
  const darkMode = useSelector((state) => state.themeReducer.darkMode);

  const deleteHistory = () => {
    dispatch(allActions.deleteAllHistory());
  };

  const toggleSwitch = () => {
    dispatch(allActions.changeTheme(!darkMode));
    dispatch(allActions.storeTheme());
  };

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
            Settings
          </Text>

          <View
            style={[styles.line, { borderBottomColor: mediumColor }]}
          ></View>
        </View>
      </View>
      <View style={[styles.main, { backgroundColor: mediumColor }]}>
        <View style={styles.section}>
          <Text style={[styles.settingsTitle, { color: mainTextColor }]}>
            Theme
          </Text>
          <View style={styles.flexWrap}>
            <Text style={[styles.subtext, { color: subtitleColor }]}>
              Dark Mode
            </Text>
            <Switch
              trackColor={{ false: "grey", true: secondaryColor }}
              thumbColor={mainTextColor}
              onValueChange={toggleSwitch}
              value={darkMode}
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={[styles.settingsTitle, { color: mainTextColor }]}>
            Storage
          </Text>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => createTwoButtonAlert('History')}
              style={[styles.button, { backgroundColor: mainColor }]}
            >
              <Text style={{ color: "white", fontSize: 18 }}>
                Delete All History
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};



export default SettingsScreen;
