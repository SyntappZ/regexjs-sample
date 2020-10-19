import { ADD_SAVED_FROM_STORAGE, DELETE_ALL_SAVED, STORE_SAVED, ADD_SAVED, ADD_SAVED_TO_REGEX, DELETE_SELECTED_SAVED } from "./types";
import { fetchData } from '../storageFunctions.js'

const fetchSavedFromStorage =  () => {

  return async (dispatch) => {
    const data = await fetchData('savedStorage')
    console.log(data)
    dispatch(addStorageSaved(data))
  }
}

const addStorageSaved = (data) => ({
  type: ADD_SAVED_FROM_STORAGE,
  payload: data,
});

const addSavedToRegex = (data) => ({
  type: ADD_SAVED_TO_REGEX,
  payload: data
})

const storeSaved = () => ({
  type: STORE_SAVED,
  payload: null,
});

const addSaved = (data) => ({
  type: ADD_SAVED, 
  payload: data
})

const deleteAllSaved = () => ({
  type: DELETE_ALL_SAVED,
  payload: null
})

const deleteSelectedSaved = (id) => ({
  type: DELETE_SELECTED_SAVED,
  payload: id
})



export { fetchSavedFromStorage, storeSaved, addSaved, deleteAllSaved, addSavedToRegex, deleteSelectedSaved };