import {clearError, hideLoad, setError, showLoad} from "./appAction";
import {SET_PROFILE} from "../types";

export function setProfile(profile) {
    return {
        type: SET_PROFILE,
        profile
    }
}


export function searchProfile(search) {
    return async dispatch => {
        try {
            dispatch(setProfile(null))
            dispatch(showLoad())
            const response = await fetch('/api/admin/search', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                },
                body: JSON.stringify({name: search})
            })
            const json = await response.json()

            dispatch(hideLoad())
            dispatch(setProfile(json))
            dispatch(clearError())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError())
        }
    }
}

export function deleteProf(id) {
    return async dispatch => {
        try {
            dispatch(setProfile(null))
            dispatch(showLoad())
            const response = await fetch('/api/admin/delProfile', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                },
                body: JSON.stringify({_id: id})
            })
            const json = await response.json()
            dispatch(setError(json.message))
            dispatch(hideLoad())
            dispatch(clearError())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError())
        }
    }
}

export function changeProfile(id,role) {
    return async dispatch => {
        try {

            dispatch(showLoad())
            const response = await fetch('/api/admin/changeProfile', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                },
                body: JSON.stringify({_id: id, role})
            })
            const json = await response.json()
            dispatch(setProfile(null))
            dispatch(hideLoad())
            dispatch(setError(json.message))
            dispatch(clearError())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError())
        }
    }
}