import {SET_SALLES} from "../types";

export function sallesReducer(state = [], action) {
    if (action.type === SET_SALLES) {
        return action.salles
    } else {
        return state
    }
}