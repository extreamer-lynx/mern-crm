import {CLEAR_ERROR, HIDE_LOAD, SET_ERROR, SET_PAGE, SHOW_LOAD} from "../types";

export function hideLoad() {
    return {
        type: HIDE_LOAD,
    }
}

export function showLoad() {
    return {
        type: SHOW_LOAD,
    }
}

export function setError(error) {
    return {
        type:SET_ERROR,
        error
    }
}

export function f() {

}

export function clearError() {
    return{
        type: CLEAR_ERROR
    }
}

export function setPage(page) {
    return {
        type:SET_PAGE,
        page
    }
}