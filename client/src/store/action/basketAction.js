import {ADD_BASKED, CLEAR_BASKED, REMOVE_BASKED} from '../types';
import {clearError, setError} from "./appAction";

export function add(product) {
    return (dispatch) => {
        dispatch(addToBasked(product))
        dispatch(setError("Товар добавлен"))
        dispatch(clearError())
    }
}

export function addToBasked(product) {
    return {
        type: ADD_BASKED,
        product: product
    }
}

export function remove(product) {
    return {
        type: REMOVE_BASKED,
        product: product
    }
}

export function clear() {
    return {
        type: CLEAR_BASKED
    }
}