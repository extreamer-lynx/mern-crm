import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {productReducer} from "./reducer/productReducer";
import {baskedReducer} from "./reducer/basketReducer";
import thunk from "redux-thunk";
import {appReducer} from "./reducer/appReducer";
import {sallesReducer} from "./reducer/sallesReducer";
import {profileReducer} from "./reducer/profileReducer";


const reducer = combineReducers({
    productState: productReducer,
    baskedState: baskedReducer,
    appState: appReducer,
    sallesState: sallesReducer,
    profileState: profileReducer

})
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store