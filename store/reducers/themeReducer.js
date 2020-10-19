import { CHANGE_THEME, STORE_THEME } from "../actions/types";

import { storeData } from "../storageFunctions.js";
const darkBlue = "#011126";
const mediumBlue = "#022340";
const lightBlue = "#024873";
const veryLightBlue = "#0367A6";

// const greenTheme = {
//   darkColor: "#111",
//   mediumColor: "#222",
//   lightColor: "#333",
//   mainTextColor: "#fff",
//   mainColor: "#013543",
//   secondaryColor: "#046173",
//   status: "light",
//   textColor: "#555",
//   subtitleColor: "#aaa",
// };

const darkTheme = {
  darkColor: "#111",
  mediumColor: "#222",
  lightColor: "#333",
  mainTextColor: "#fff",
  mainColor: "#701326",
  secondaryColor: "#A8203B",
  status: "light",
  textColor: "#555",
  subtitleColor: "grey",
  highlightBackground: "#fff",
  highlightColor: "#A8203B",
  tabsColor: "#5C1120",
  inactiveTintColor: "grey",
  activeColor: "#fff",
  borderColor: '#333',
  saveButtonColor: "grey"
};

const lightTheme = {
  darkColor: "#fff",
  mediumColor: "#eee",
  lightColor: "#dedede",
  mainTextColor: "#000",
  mainColor: "#701326",
  secondaryColor: "#A8203B",
  status: "dark",
  subtitleColor: "#111",
  textColor: "#222",
  highlightBackground: "#A8203B",
  highlightColor: "#fff",
  tabsColor: "#fff",
  inactiveTintColor: "#aaa",
  activeColor: "#5C1120",
  borderColor: '#dedede',
  saveButtonColor: "#666"
};

const initialState = {
  darkMode: false,
  themeColors: lightTheme,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME: {
      const darkMode = action.payload;
      const theme = darkMode ? darkTheme : lightTheme;
      return {
        ...state,
        themeColors: theme,
        darkMode: darkMode,
      };
    }
    case STORE_THEME: {
      storeData("themeStorage", { darkMode: state.darkMode });
      return state;
    }

    default:
      return state;
  }
};

export default themeReducer;
