import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import M from "materialize-css/dist/js/materialize.min";
import {deleteProd} from "../store/action/productAction";

export const ProductItem = ({item}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        M.Modal.init(document.getElementById(item._id))
    })

    const deleteHandler = (e) => {
        e.preventDefault()
       dispatch(deleteProd(item._id))
    }

    return (
        <tr>
            <td>{item.name}</td>
            <td><a href={item._id} className="btn" onClick={deleteHandler}>Удалить</a></td>
        </tr>
    )
}