import {CLEAR_ERROR, HIDE_LOAD, SET_ERROR, SET_PAGE, SHOW_LOAD} from "../types";

export function appReducer(state = {error: null, isLoading: false, page: 'Последние добавленные товары'}, action) {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        case HIDE_LOAD:
            return {
                ...state,
                isLoading: false
            }

        case SHOW_LOAD:
            return {
                ...state,
                isLoading: true
            }

        case SET_PAGE:
            return {
                ...state,
                page: action.page
            }

        default:
            return state

    }
}