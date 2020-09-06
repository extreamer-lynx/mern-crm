import {SET_PRODUCT} from "../types";

export function productReducer(state = null, action) {
    if (action.type === SET_PRODUCT) {
        return action.product;
    } else {
        return state;
    }
}