import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {productReducer} from "./reducer/productReducer";
import thunk from "redux-thunk";
import {appReducer} from "./reducer/appReducer";
import {sallesReducer} from "./reducer/sallesReducer";
import {profilesReducer} from "./reducer/profileReducer";
import {categoryReducer} from "./reducer/categoryReducer";


const reducer = combineReducers({
    productState: productReducer,
    appState: appReducer,
    sallesState: sallesReducer,
    profilesState: profilesReducer,
    categoryState: categoryReducer

})
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store