import {SET_CATEGORY} from "../types";
import {clearError, hideLoad, setError, showLoad} from "./appAction";

export function setCategory(category) {
    return {
        type: SET_CATEGORY,
        category
    }
}

export function getCategory() {
    return async dispatch => {
        try {
            dispatch(setCategory(null))
            dispatch(showLoad())

            const response = await fetch('/api/products/categories', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const json = await response.json()

            dispatch(hideLoad())
            dispatch(setCategory(json))
            dispatch(clearError())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError())
        }
    }
}

export function deleteCategory(del) {
    return async dispatch => {
        try {
            dispatch(setCategory(null))
            dispatch(showLoad())

            const response = await fetch('/api/admin/deleteCategory', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                },
                body: JSON.stringify({id: del})
            })
            const json = await response.json()

            if(!response.ok)
            {
                throw Error(json.message)
            }

            dispatch(hideLoad())
            dispatch(getCategory())
            dispatch(clearError())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError())
        }
    }
}

export function renameCategory(id, name) {
    return async dispatch => {
        try {
            dispatch(setCategory(null))
            dispatch(showLoad())

            const response = await fetch('/api/admin/renameCategory', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                },
                body: JSON.stringify({name, id})
            })
            const json = await response.json()

            if(!response.ok)
            {
                throw Error(json.message)
            }

            dispatch(hideLoad(json.message))
            dispatch(setError())
            dispatch(getCategory())
            dispatch(clearError())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError())
        }
    }
}

export function plusCategory(name) {
    return async dispatch => {
        try {
            dispatch(setCategory(null))
            dispatch(showLoad())

            const response = await fetch('/api/admin/addCategory', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                },
                body: JSON.stringify({name: name})
            })
            const json = await response.json()

            if(!response.ok)
            {
                throw Error(json.message)
            }

            dispatch(hideLoad())
            dispatch(getCategory())
            dispatch(clearError())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError())
        }
    }
}