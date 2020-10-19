import {
  selectRegexDocument,
  selectMethodsDocument,
  selectFlagsDocument,
  removeSelectedDocument,
} from "./docsActions.js";
import {
  fetchHistoryFromStorage,
  deleteAllHistory,
  storeHistory,
  addHistory,
  addHistoryToRegex,
} from "./historyActions.js";
import {
  changeTheme,
  fetchThemeFromStorage,
  storeTheme,
} from "./themeActions.js";
import {
  fetchSavedFromStorage,
  storeSaved,
  addSaved,
  deleteAllSaved,
  addSavedToRegex,
  deleteSelectedSaved,
} from "./savedActions.js";
const allActions = {
  selectRegexDocument,
  selectMethodsDocument,
  selectFlagsDocument,
  removeSelectedDocument,
  fetchHistoryFromStorage,
  storeHistory,
  deleteAllHistory,
  addHistory,
  addHistoryToRegex,
  changeTheme,
  fetchThemeFromStorage,
  storeTheme,
  fetchSavedFromStorage,
  storeSaved,
  addSaved,
  deleteAllSaved,
  addSavedToRegex,
  deleteSelectedSaved,
};

export default allActions;
