import {ADD_BASKED, CLEAR_BASKED, REMOVE_BASKED} from "../types";

let persistedState = (localStorage.getItem('baskedState') ? JSON.parse(localStorage.getItem('baskedState')) : []);

export function baskedReducer(state = persistedState, action) {
    switch (action.type) {
        case ADD_BASKED:
            state.push(action.product);
            return state;
        case REMOVE_BASKED:
            return state.filter((n) => {return n !== state[action.product]});
        case CLEAR_BASKED:
            return {};
        default:
            return state;
    }
}