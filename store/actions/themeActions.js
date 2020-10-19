import { CHANGE_THEME, STORE_THEME } from "./types";
import { fetchData } from '../storageFunctions.js'

  

const changeTheme = (darkMode) => ({
  type: CHANGE_THEME,
  payload: darkMode,
});


const fetchThemeFromStorage =  () => {

  return async (dispatch) => {
    const data = await fetchData('themeStorage')
    dispatch(changeTheme(data.darkMode))
  }
}
const storeTheme = () => ({
  type: STORE_THEME,
  payload: null,
});

export { changeTheme, fetchThemeFromStorage, storeTheme };
