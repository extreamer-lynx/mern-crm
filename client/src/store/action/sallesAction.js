import {SET_SALLES} from "../types";
import {clearError, hideLoad, setError, showLoad} from "./appAction";
import {setProduct} from "./productAction";

export function addSales(products) {
    return {
        type: SET_SALLES,
        products
    }
}

export function initSales() {
    return async dispatch => {
        try {
            dispatch(showLoad())
            const response = await fetch('/api/products/sales', {
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