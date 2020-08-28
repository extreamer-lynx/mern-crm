import {ADD_BASKED, CLEAR_BASKED, REMOVE_BASKED} from '../types';

export function add(product) {
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