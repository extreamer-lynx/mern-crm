import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {productReducer} from "./reducer/productReducer";
import {baskedReducer} from "./reducer/basketReducer";
import thunk from "redux-thunk";
import {checker} from "./middleware"
import {appReducer} from "./reducer/appReducer";
import {sallesReducer} from "./reducer/sallesReducer";


const reducer = combineReducers({
    productState: productReducer,
    baskedState: baskedReducer,
    appState: appReducer,
    sallesState: sallesReducer

})
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, checker)));

export default store