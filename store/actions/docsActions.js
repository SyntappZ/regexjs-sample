import { SELECT_REGEX_DOCUMENT, SELECT_METHODS_DOCUMENT, SELECT_FLAGS_DOCUMENT, REMOVE_SELECTED_DOCUMENT } from "./types";


const selectRegexDocument = (docId) => ({
  type: SELECT_REGEX_DOCUMENT,
  payload: docId,
})

const selectMethodsDocument = (docId) => ({
  type: SELECT_METHODS_DOCUMENT,
  payload: docId,
});


const selectFlagsDocument = (docId) => ({
  type: SELECT_FLAGS_DOCUMENT,
  payload: docId,
});
const removeSelectedDocument = () => ({
  type: REMOVE_SELECTED_DOCUMENT,
  payload: null,
});


export { selectRegexDocument, selectMethodsDocument, selectFlagsDocument, removeSelectedDocument };
