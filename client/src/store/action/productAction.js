import {SET_PRODUCT} from '../types';
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

            if (!response.ok) {
                throw new Error(response.message || 'Что-то пошло не так')
            }

            const json = await response.json()

            dispatch(setProduct(json))
            dispatch(hideLoad())

        } catch (e) {
            console.log(e)
            dispatch(setError(e.message))
            dispatch(clearError())

        }
    }
}

export function byCategory(category) {
    return async dispatch => {
        try {
            dispatch(showLoad())
            const response = await fetch('/api/products/byCategory', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({category})
            })
            if (!response.ok) {
                throw new Error(response.message || 'Что-то пошло не так')
            }

            const json = await response.json()

            dispatch(setProduct(json))
            dispatch(hideLoad())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError())

        }
    }
}

export function searchProd(search) {
    return async dispatch => {
        try {
            dispatch(showLoad())
            const response = await fetch('/api/products/search', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                 body: JSON.stringify({name: search})
            })
            if (!response.ok) {
                throw new Error(response.message || 'Что-то пошло не так')
            }

            const json = await response.json()

            dispatch(setProduct(json))
            dispatch(hideLoad())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError())

        }
    }
}