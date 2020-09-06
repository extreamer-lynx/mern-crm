import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {searchProd} from "../store/action/productAction";

export const Search = () => {
    const [search, setSearch] = useState()
    const dispatch = useDispatch()
    const changeHandler = (e) => {
        setSearch(e.target.value)
    }

    const searchHandler = e => {
        dispatch(searchProd(search))
    }

    return (<div className={"right "} style={{marginTop: 0, paddingTop: 0}}>
                    <div className="input-field col s5" style={{marginTop: 0}}>
                        <input id="input_text" name={"search"} onChange={changeHandler} type="text" data-length="10"/>
                        <label htmlFor="input_text">Поиск</label>
                        <a className="prefix material-icons" href="#search" onClick={searchHandler}>arrow_forward</a>
                    </div>
        </div>
    )
}