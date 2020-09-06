import {SET_PROFILE} from "../types";

export function profileReducer(state = {name: '', sName: '', tel: '', email: ''}, action) {
    if (action.type === SET_PROFILE) {
        return action.profile;
    } else {
        return state;
    }
}