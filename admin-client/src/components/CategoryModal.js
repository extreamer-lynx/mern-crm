import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {renameCategory} from "../store/action/categoryAction";

export const CategoryModal = ({id}) => {
    const dispatch = useDispatch()
    const [name, setName] = useState()

    const categoryChangeHandler = (e) => {
        e.preventDefault()
        dispatch(renameCategory(id, name))
    }

    const changeHandler = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    return (
        <React.Fragment>
            <div id={id} className="modal">
                <div className="modal-content">
                    <h4>Изменить имя</h4>
                    <p>&nbsp;</p>
                    <div className="input-field">
                        <input id={id+"string"} type="text" className="validate" onChange={changeHandler}/>
                        <label className="active" htmlFor={id+"string"}>Введите значение</label>
                    </div>
                </div>
                <div className="modal-footer">
                    <a onClick={categoryChangeHandler} href={id} className="btn">Изменить</a>
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Закрыть</a>
                </div>
            </div>
        </React.Fragment>
    )
}