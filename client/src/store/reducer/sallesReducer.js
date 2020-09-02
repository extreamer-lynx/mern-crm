import {SET_SALLES} from "../types";

export function sallesReducer(state = [], action) {
    switch (action.type) {
        case SET_SALLES:
            return action.products
        default:
            return state
    }
}