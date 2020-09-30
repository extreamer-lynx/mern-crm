import {SET_CATEGORY} from "../types";

export function categoryReducer(state = null, action) {
    if (action.type === SET_CATEGORY) {
        return action.category;
    } else {
        return state;
    }
}