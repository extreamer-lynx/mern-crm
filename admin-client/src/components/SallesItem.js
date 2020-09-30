import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {changeStatus} from "../store/action/sallesAction";
import {SallesModal} from "../components/SallesModal";
import M from "materialize-css/dist/js/materialize.min";

export const SallesItem = ({item}) => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.appState.isLoading)
    const button = useRef()
    const ts = new Date(item.date).getTime()

    const changeHandler = (e) => {
        e.preventDefault();
        dispatch(changeStatus(item._id, !item.status))
        button.current.classList.add("disabled")
    }

    useEffect(() => {
        M.Modal.init(document.getElementById(ts));
        //M.Modal.init(modalButton)
        if(!loading)
        {
            button.current.classList.remove("disabled")
        }
    })

    return (
        <tr>
            <td>{item.date}</td>
            <td>{item.status ? <i className="material-icons">check</i> :
                <i className="material-icons">close</i>}</td>
            <td><a className={"btn modal-trigger"} href={'#' + ts} >Информация</a><SallesModal id={ts} item={item}/></td>
            <td><a href={item._id} ref={button} className={"btn"} onClick={changeHandler}>Изменить</a></td>
        </tr>
    )
}