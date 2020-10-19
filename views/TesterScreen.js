import React, { useEffect, useState, useRef } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../store/actions";
import { vw } from "react-native-expo-viewport-units";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import TextReplacer from "../components/TextReplacer";

import { Entypo } from "@expo/vector-icons";
const TesterScreen = () => {
  const {
    mainTextColor,
    darkColor,
    lightColor,
    mainColor,
    mediumColor,
    secondaryColor,
    subtitleColor,
    highlightBackground,
    highlightColor,
    saveButtonColor,
  } = useSelector((state) => state.themeReducer.themeColors);

  const regexFromHistory = useSelector(
    (state) => state.historyReducer.regexFromHistory
  );
  const regexFromSaved = useSelector(
    (state) => state.savedReducer.regexFromSaved
  );
  const [regexValue, onChangeRegex] = useState("");
  const [output, setOutput] = useState("");
  const [flags] = useState(["i", "g", "m", "s", "u", "y"]);
  const [selectedFlags, setSelectedFlags] = useState([]);
  const [regexFocused, setRegexFocused] = useState(false);
  const [stringFocused, setStringFocused] = useState(false);
  const [stringValue, setStringValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [savedName, setSavedName] = useState("");
  const stringInputRef = useRef(null);
  const regexInputRef = useRef(null);
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();
  const updateRegexValue = useRef(regexValue);
  updateRegexValue.current = regexValue;

  useEffect(() => {
    if (regexFromHistory) {
      onChangeRegex(regexFromHistory);
      dispatch(allActions.addHistoryToRegex(""));
    }
    if (regexFromSaved) {
      onChangeRegex(regexFromSaved);
      dispatch(allActions.addSavedToRegex(""));
    }
  }, [regexFromHistory, regexFromSaved]);

  const onChangeString = (str) => {
    setStringFocused(true);
    setOutput(str);
    setStringValue(str);
  };

  const handleRegex = (text) => {
    setStringFocused(false);
    onChangeRegex(text);
    startIdleTimer();
  };
  const sendRegexToHistoryStorage = () => {
    const value = updateRegexValue.current;

    if (value.length > 0) {
      dispatch(allActions.addHistory(value));
      dispatch(allActions.storeHistory());
    }
  };

  const startIdleTimer = () => {
    clearTimeout(timer);
    setTimer(null);
    const newTimer = setTimeout(sendRegexToHistoryStorage, 5000);
    setTimer(newTimer);
  };

  const handleRegexFocus = () => {
    setStringFocused(false);
    setRegexFocused(true);
  };

  const handleFlagPress = (flag) => {
    setStringFocused(false);
    setRegexFocused(false);
    clearTimeout(timer);
    if (selectedFlags.includes(flag)) {
      const removeFlag = selectedFlags.filter((item) => item != flag);
      setSelectedFlags(removeFlag);
    } else {
      setSelectedFlags((state) => [...state, flag]);
    }
  };

  const handleStringFocus = () => {
    setStringFocused(true);
    setRegexFocused(false);
    startIdleTimer();
    clearTimeout(timer);
    setTimeout(() => {
      if (stringInputRef) {
        stringInputRef.current.focus();
      }
    }, 100);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const sendRegexToSavedStorage = () => {
    if (savedName) {
      
      toggleModal();
      const capitalizeName = savedName[0].toUpperCase() + savedName.slice(1);
      const data = { name: capitalizeName, regex: regexValue };

      dispatch(allActions.addSaved(data));
      dispatch(allActions.storeSaved());
      setSavedName("");
    } else {

    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: darkColor }]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: darkColor }]}>
            <Text style={{ ...styles.modalText, color: mainTextColor }}>
              Add Name
            </Text>
            <TextInput
              autoCapitalize={"none"}
              autoCorrect={false}
              autoCompleteType={"off"}
              style={{
                ...styles.modalInput,
                color: mainTextColor,
                backgroundColor: mediumColor,
              }}
              onChangeText={(text) => setSavedName(text)}
              value={savedName}
            />

            <TouchableHighlight
              style={{
                ...styles.closeModalButton,
                backgroundColor: secondaryColor,
              }}
              onPress={sendRegexToSavedStorage}
            >
              <Text style={styles.textStyle}>Save Regex</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <View style={styles.top}>
        <Text
          style={[
            styles.title,
            { color: regexFocused ? secondaryColor : subtitleColor },
          ]}
        >
          RegEx
        </Text>
        <View style={[styles.inputFlexWrap, { backgroundColor: mediumColor }]}>
          <View style={styles.inputWrap}>
            <TextInput
              onFocus={handleRegexFocus}
              ref={regexInputRef}
              autoCapitalize={"none"}
              autoCorrect={false}
              autoCompleteType={"off"}
              style={[styles.input, { color: mainTextColor }]}
              onChangeText={handleRegex}
              value={regexValue}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={toggleModal}>
            <Entypo name="save" size={24} color={saveButtonColor} />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={[
          styles.flagTitle,
          { color: selectedFlags.length > 0 ? secondaryColor : subtitleColor },
        ]}
      >
        Flags
      </Text>
      <View style={styles.flagWrap}>
        {flags.map((flag, i) => {
          const isSelected = selectedFlags.includes(flag);
          const flagColor = isSelected ? secondaryColor : subtitleColor;

          return (
            <TouchableOpacity
              onPress={() => handleFlagPress(flag)}
              key={i}
              style={[styles.flag, { borderColor: flagColor }]}
            >
              <Text style={{ color: flagColor }}>{flag}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableWithoutFeedback
        style={[styles.main, { backgroundColor: mediumColor }]}
        onPress={handleStringFocus}
      >
        <Text
          style={[
            styles.title,
            { color: stringFocused ? secondaryColor : subtitleColor },
          ]}
        >
          String
        </Text>

        {stringFocused ? (
          <Text style={styles.editMode}>Edit Mode</Text>
        ) : (
          <Text style={styles.editMode}>Testing Mode</Text>
        )}

        <View style={styles.stringWrap}>
          {stringFocused ? (
            <TextInput
              ref={stringInputRef}
              multiline={true}
              autoCapitalize={"none"}
              style={[styles.stringInput, { color: mainTextColor }]}
              onChangeText={(text) => onChangeString(text)}
              value={stringValue}
              autoCompleteType={"off"}
              autoCorrect={false}
            />
          ) : (
            <TextReplacer
              stringValue={stringValue}
              regexValue={regexValue}
              flags={selectedFlags.join("")}
              mainTextColor={mainTextColor}
              highlightBackground={highlightBackground}
              highlightColor={highlightColor}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};


export default TesterScreen;
