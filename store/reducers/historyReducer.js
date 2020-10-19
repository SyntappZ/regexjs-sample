import {
  ADD_HISTORY,
  ADD_HISTORY_FROM_STORAGE,
  STORE_HISTORY,
  DELETE_ALL_HISTORY,
  ADD_HISTORY_TO_REGEX,
} from "../actions/types";
import {
  storeData,
  dateFormat,
  currentTime,
  removeArrayFromStorage,
} from "../storageFunctions.js";
const initialState = {
  historyData: [],
  historyCap: 10,
  regexFromHistory: "",
};

const historyCycle = (arr, data, historyCap) => {
  const obj = { regex: data, date: dateFormat(), time: currentTime() };
  if (arr.length >= historyCap) {
    arr.pop();
  }
  const result = [obj, ...arr];

  return result;
};

const historyReducer = (state = initialState, action) => {
  const alreadyAdded = state.historyData.some(
    (item) => item.regex === action.payload
  );
  switch (action.type) {
    case DELETE_ALL_HISTORY: {
      removeArrayFromStorage("historyStorage");
      return {
        ...state,
        historyData: [],
      };
    }
    case ADD_HISTORY: {
      const data = alreadyAdded
        ? state.historyData
        : historyCycle(state.historyData, action.payload, state.historyCap);
      return {
        ...state,
        historyData: data,
      };
    }
    case ADD_HISTORY_FROM_STORAGE: {
      return {
        ...state,
        historyData: action.payload,
      };
    }
    case ADD_HISTORY_TO_REGEX: {
      return {
        ...state,
        regexFromHistory: action.payload,
      };
    }
    case STORE_HISTORY: {
      if (!alreadyAdded) {
        storeData("historyStorage", state.historyData);
      }
      return state;
    }

    default:
      return state;
  }
};

export default historyReducer;
