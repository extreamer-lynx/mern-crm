import {SET_PROFILE} from "../types";

export function profilesReducer(state = [], action) {
    if (action.type === SET_PROFILE) {
        return action.profile;
    } else {
        return state;
    }
}