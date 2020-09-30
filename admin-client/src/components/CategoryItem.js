import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {deleteCategory} from "../store/action/categoryAction";
import {CategoryModal} from "./CategoryModal";
import M from "materialize-css/dist/js/materialize.min";

export const CategoryItem = ({item}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        M.Modal.init(document.getElementById(item._id))
    })

    const deleteHandler = (e) => {
        e.preventDefault()
        dispatch(deleteCategory(item._id))
    }

    return (
        <tr>
            <td>{item.ruCategory}</td>
            <td><a className={"btn modal-trigger"} href={"#" + item._id} >Изменить</a><CategoryModal key={item._id} id={item._id}/></td>
            <td><a href={item._id} className="btn" onClick={deleteHandler}>Удалить</a></td>
        </tr>
    )
}