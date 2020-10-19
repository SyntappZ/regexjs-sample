import { ADD_HISTORY_FROM_STORAGE, DELETE_ALL_HISTORY, STORE_HISTORY, ADD_HISTORY, ADD_HISTORY_TO_REGEX } from "./types";
import { fetchData } from '../storageFunctions.js'

const fetchHistoryFromStorage =  () => {

  return async (dispatch) => {
    const data = await fetchData('historyStorage')
    dispatch(addStorageHistory(data))
  }
}

const addStorageHistory = (data) => ({
  type: ADD_HISTORY_FROM_STORAGE,
  payload: data,
});

const addHistoryToRegex = (data) => ({
  type: ADD_HISTORY_TO_REGEX,
  payload: data
})

const storeHistory = () => ({
  type: STORE_HISTORY,
  payload: null,
});

const addHistory = (data) => ({
  type: ADD_HISTORY, 
  payload: data
})

const deleteAllHistory = () => ({
  type: DELETE_ALL_HISTORY,
  payload: null
})



export { fetchHistoryFromStorage, storeHistory, addHistory, deleteAllHistory, addHistoryToRegex };
