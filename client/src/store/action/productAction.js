import {PRODUCT_CATEGORY, SET_PRODUCT} from '../types';
import {clearError, hideLoad, setError, showLoad} from "./appAction";

export function setProduct(product) {
    return {
        type: SET_PRODUCT,
        product
    }
}

export function init() {
    return async dispatch => {
        try {
            dispatch(showLoad())
            const response = await fetch('/api/products/topProducts', {
                method: 'POST',
                headers: {'Content-type': 'application/json'}
            })
            const json = await response.json()

            dispatch(setProduct(json))
            dispatch(hideLoad())

        } catch (e) {
            dispatch(setError(e))
            dispatch(clearError)

        }
    }
}

export function byCategory() {
    return {
        type: PRODUCT_CATEGORY
    }
}

export function search() {
    return async dispatch => {
        try {
            dispatch(showLoad())
            const response = await fetch('/api/products/search', {
                method: 'POST',
                headers: {'Content-type': 'application/json'}
            })
            const json = await response.json()

            dispatch(setProduct(json))
            dispatch(hideLoad())

        } catch (e) {
            dispatch(setError(e))
            dispatch(clearError)

        }
    }
}