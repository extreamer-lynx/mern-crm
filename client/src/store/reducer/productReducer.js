import {SET_PRODUCT, PRODUCT_CATEGORY} from "../types";

export function productReducer(state = null, action) {
    switch (action.type) {
        case PRODUCT_CATEGORY:
            return {value: action.value_1};
        case SET_PRODUCT:
            return action.product;
        default:
            return state;
    }
}