import {SET_PRODUCT} from '../types';
import {clearError, hideLoad, setError, showLoad} from "./appAction";

export function setProduct(product) {
    return {
        type: SET_PRODUCT,
        product
    }
}

export function searchProd(search) {
    return async dispatch => {
        try {
            dispatch(setProduct(null))

            dispatch(showLoad())
            const response = await fetch('/api/products/search', {
                method: 'POST',
                headers: {
                    'Content-type': 'multipart/form-data; boundary=spacer',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                },
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

export function deleteProd(id) {
    return async dispatch => {
        try {

            dispatch(showLoad())
            const response = await fetch('/api/admin/deleteProd', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                },
                body: JSON.stringify({id})
            })

            const json = await response.json()

            if (!response.ok) {
                throw new Error(json || 'Что-то пошло не так')
            }

            dispatch(hideLoad())
            dispatch(setProduct(null))

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError())
        }
    }
}

export function addProd(params) {
    return async dispatch => {
        try {
            dispatch(showLoad())
            //{"name":"vlad_franchuk02","count":"2","cost":"4321","photo":{},"description":"cxfdxj"}
            console.log(params)
            const formData = new FormData()
            formData.append("name", params.name)
            formData.append("count", params.count)
            formData.append("cost", params.cost)
            formData.append("photo", params.file)
            const response = await fetch('/api/admin/addProd', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
                },
                body: formData
            })

            const json = await response.json()

            if (!response.ok) {
                throw new Error(json || 'Что-то пошло не так')
            }

            dispatch(hideLoad())

        } catch (e) {
            dispatch(setError(e.message))
            dispatch(clearError())
        }
    }
}