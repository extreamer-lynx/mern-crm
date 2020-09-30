import {clearError, hideLoad, setError, showLoad} from "./appAction";
import {SET_SALLES} from "../types";

export function addSalles(salles) {
        return {
            type: SET_SALLES,
            salles
        }
}

export function changeStatus(id, status) {
    return async dispatch => {
        try {

            dispatch(showLoad())
            const response = await fetch('/api/admin/changeSale', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                },
                body: JSON.stringify({_id: id, status})
            })
            const json = await response.json()
            dispatch(setError(json.message))
            dispatch(hideLoad())
            dispatch(initSales())
            dispatch(clearError())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError())
        }
    }
}

export function initSales() {
    return async dispatch => {
        try {
            dispatch(showLoad())
            const response = await fetch('/api/admin/getSales', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                }
            })

            const json = await response.json()

            if (!response.ok) {
                throw new Error(json.message || 'Что-то пошло не так')
            }
            dispatch(addSalles(json))
            dispatch(hideLoad())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError)

        }
    }
}