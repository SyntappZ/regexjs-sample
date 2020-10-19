import { createStore, combineReducers, applyMiddleware  } from "redux";
import thunk from 'redux-thunk';
import historyReducer from "./reducers/historyReducer";
import themeReducer from "./reducers/themeReducer";
import docsReducer from "./reducers/docsReducer";
import savedReducer from "./reducers/savedReducer";
const rootReducer = combineReducers({
  historyReducer: historyReducer,
  savedReducer: savedReducer,
  themeReducer: themeReducer,
  docsReducer: docsReducer
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
