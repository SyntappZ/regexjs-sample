import {
  ADD_SAVED,
  ADD_SAVED_FROM_STORAGE,
  STORE_SAVED,
  DELETE_ALL_SAVED,
  ADD_SAVED_TO_REGEX,
  DELETE_SELECTED_SAVED,
} from "../actions/types";
import {
  storeData,
  dateFormat,
  currentTime,
  removeArrayFromStorage,
} from "../storageFunctions.js";
const initialState = {
  savedData: [],
  savedCap: 10,
  regexFromSaved: "",
};

const savedReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ALL_SAVED: {
      removeArrayFromStorage("savedStorage");
      return {
        ...state,
        savedData: [],
      };
    }
    case DELETE_SELECTED_SAVED: {
      const arr = state.savedData;
      const index = action.payload;
      arr.splice(index, 1);

      return {
        ...state,
        savedData: arr,
      };
    }
    case ADD_SAVED: {
      return {
        ...state,
        savedData: [...state.savedData, action.payload],
      };
    }
    case ADD_SAVED_FROM_STORAGE: {
      console.log(action)
      return {
        ...state,
        savedData: action.payload,
      };
    }
    case ADD_SAVED_TO_REGEX: {
      return {
        ...state,
        regexFromSaved: action.payload,
      };
    }
    case STORE_SAVED: {
      storeData("savedStorage", state.savedData);
      return state;
    }

    default:
      return state;
  }
};

export default savedReducer;
