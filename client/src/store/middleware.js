import {ADD_BASKED} from "./types";

function checker(store) {
    return (next) => {
        return (action) => {
            if(action.type === ADD_BASKED)
            {
                
            }
            return next(action)
        }
    }
}
