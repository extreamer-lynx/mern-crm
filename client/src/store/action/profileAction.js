import {clearError, hideLoad, setError, showLoad} from "./appAction";
import {SET_PROFILE} from "../types";

export function setProfile(profile) {
    return {
        type: SET_PROFILE,
        profile
    }
}


export function getProfile() {
    return async dispatch => {
        try {
            dispatch(showLoad())
            const response = await fetch('/api/profile/get', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                }
            })
            const json = await response.json()

            dispatch(hideLoad())
            dispatch(setProfile(json))
            dispatch(clearError())

        } catch (e) {
            dispatch(setError(e))
            dispatch(clearError())
        }
    }
}

export function changeProfile(prof) {
    return async dispatch => {
        try {
            dispatch(showLoad())
            const response = await fetch('/api/profile/change', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                },
                body: JSON.stringify(prof)
            })
            const json = await response.json()

            if(!response.ok){
                throw Error(json.message)
            }

            dispatch(hideLoad())
            dispatch(getProfile())
            dispatch(clearError())

        } catch (e) {
            dispatch(setError(e))
            dispatch(clearError())
        }
    }
}