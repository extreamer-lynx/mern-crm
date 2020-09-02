import {ADD_BASKED} from "./types";
import {useDispatch} from "react-redux";
import {setError} from "./action/appAction";

export function checker(store) {
    return (next) => {
        return (action) => {
            if(action.type === ADD_BASKED)
            {
                if (action.product.name.trim() === '')
                {
                    (setError("Неизвесная ошибка")).useDispatch()
                }
            }
            return next(action)
        }
    }
}
