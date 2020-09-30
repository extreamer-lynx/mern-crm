import React, {useEffect, useRef, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const SallesModal = ({id, item}) => {
    const {loading, request, error, clearError} = useHttp()
    const [profile, setProfile] = useState()
    const message = useMessage()
    const button = useRef()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        if(!loading)
        {
            button.current.classList.remove("disabled")
        }
    })

    const profileHandler = async (e) => {
        e.preventDefault();
        try {
            button.current.classList.add("disabled")
            setProfile(await request('/api/admin/getUserById', 'POST', {id: item.user}, {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`
            }))
        } catch (e) {
        }
    }

    return (
        <React.Fragment>
            <div id={id} className="modal">
                <div className="modal-content">
                    <h4>Информация о заказе №{id}</h4>
                    <p>&nbsp;</p>
                    <p onClick={profileHandler} className="btn" ref={button}>Узнать заказчика</p>
                    {profile ? <React.Fragment>
                        <p>Имя: {profile.name}</p>
                        <p>Фамилия: {profile.sName}</p>
                        <p>Телефон: {profile.tel}</p>
                        <p>Email: {profile.email}</p>
                    </React.Fragment> : null
                    }
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Имя</th>
                        <th>Количество</th>
                        <th>Цена</th>
                    </tr>
                    </thead>

                    <tbody>
                    {item.products.map((product, index) => {
                        return (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.count}</td>
                                <td>{product.cost} грн</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Закрыть</a>
                </div>
            </div>
        </React.Fragment>
    )
}