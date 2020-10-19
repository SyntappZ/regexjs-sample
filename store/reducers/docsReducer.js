import { SELECT_REGEX_DOCUMENT, SELECT_METHODS_DOCUMENT, SELECT_FLAGS_DOCUMENT, REMOVE_SELECTED_DOCUMENT } from "../actions/types";
import { regexDocuments, methodsDocuments, flagsDocuments } from '../documentsData.js'


const initialState = {
 regexDocs: regexDocuments,
 methodsDocs: methodsDocuments,
 flagsDocs: flagsDocuments,
 selectedDocument: null
};

const docReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_REGEX_DOCUMENT: {
     const document = state.regexDocs[action.payload]
     document.documentType = 'RegEx'
      return {
          ...state,
          selectedDocument: document
      };
    }
    case SELECT_METHODS_DOCUMENT: {
      const document = state.methodsDocs[action.payload]
      document.documentType = 'Method'
      return {
          ...state,
          selectedDocument: document
      };
    }
    case SELECT_FLAGS_DOCUMENT: {
      const document = state.flagsDocs[action.payload]
      document.documentType = 'Flag'
      return {
          ...state,
          selectedDocument: state.flagsDocs[action.payload]
      };
    }
    case REMOVE_SELECTED_DOCUMENT: {
      return {
        ...state,
        selectedDocument: null
      }
    }

    default:
      return state;
  }
  
};

export default docReducer;