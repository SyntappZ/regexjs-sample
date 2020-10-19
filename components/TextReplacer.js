import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { useSelector } from "react-redux";

const TextReplacer = ({
  stringValue,
  regexValue,
  flags,
  mainTextColor,
  highlightBackground,
  highlightColor,
}) => {
  const { secondaryColor } = useSelector(
    (state) => state.themeReducer.themeColors
  );
  const [textArray, setTextArray] = useState([]);

  const noMatch = () => {
    const addArray = textSplitter(stringValue, []);
    setTextArray(addArray);
  };

  const textSplitter = (value, matchedArray) => {
    const highlightStyle = {
      backgroundColor: highlightBackground,
      color: highlightColor,
    };
    const arr = [...value];
    return arr.map((item, i) => {
      return {
        letter: item,
        style: matchedArray.includes(i) ? highlightStyle : "",
      };
    });
  };

  useEffect(() => {
    if (stringValue) {
      noMatch();
    } else {
      setTextArray([]);
    }
  }, [stringValue]);

  useEffect(() => {
    let regexValid = true;
    try {
      new RegExp(regexValue, flags);
    } catch (e) {
      regexValid = false;
    }

    if (regexValue && regexValid) {
      const globalCheck = flags.includes("g");
      const reg = new RegExp(regexValue, flags);
      const regValid = reg.test(stringValue);
      if (regValid) {
        if (globalCheck) {
          globalRegex(reg);
        } else {
          handleRegex(reg);
        }
      } else {
        noMatch();
      }
    } else {
      noMatch();
    }
  }, [regexValue, flags, stringValue]);

  

  const globalRegex = (reg) => {
    let matchedArray = [];
    let beginAndEnd = [];

    let match;

    const test = new RegExp(reg, flags);
    while ((match = test.exec(stringValue)) !== null) {
      beginAndEnd.push([match.index, match.index + match[0].length]);
    }

    beginAndEnd.forEach((item) => {
      for (let i = item[0]; i < item[1]; i++) {
        matchedArray.push(i);
      }
    });

    const addArray = textSplitter(stringValue, matchedArray);
    setTextArray(addArray);
  };

  const handleRegex = (reg) => {
    const matchedArray = [];

    const match = stringValue.match(reg)[0].length;
    const position = stringValue.match(reg).index;
    for (let i = position; i < position + match; i++) {
      matchedArray.push(i);
    }
    const addArray = textSplitter(stringValue, matchedArray);
    setTextArray(addArray);

    // regexExtractor(str);
  };

  return (
    <Text style={[styles.inputText, { color: mainTextColor }]}>
      {textArray.map((item, i) => (
        <Text key={i} style={item.style}>
          {item.letter}
        </Text>
      ))}
    </Text>
  );
};



export default TextReplacer;
