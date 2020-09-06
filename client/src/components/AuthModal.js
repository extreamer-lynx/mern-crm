import React, {useEffect} from "react";
import M from "materialize-css/dist/js/materialize.min";

import {useContext, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthModal = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })
    const [regForm, setRegForm] = useState({email: '', password: '', tel: '', name: '', sName: ''})

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
        M.Tabs.init(document.querySelector('#authModal'))
        M.Modal.init(document.querySelector('#AuthModal'))
    }, [])

    const changHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const regHandler = event => {
        setRegForm({...regForm, [event.target.id]: event.target.value})
    }

    const registrarHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...regForm})
            message(data.message)
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }

    return (
        <div id="AuthModal" className="modal">
            <div className="modal-content">
                <div className="col s12">
                    <ul className="tabs" id={"authModal"}>
                        <li className="tab col s3"><a href="#auth">Авторизация</a></li>
                        <li className="tab col s3"><a href="#reg">Регистрация</a></li>
                    </ul>
                </div>
                <div id="auth" className="col s12">
                    <div className="input-field">
                        <input
                            placeholder="Введите email"
                            type="text"
                            name="email"
                            className="yellow-input"
                            value={form.email}
                            onChange={changHandler}
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-field">
                        <input
                            placeholder="Введите пароль"
                            type="password"
                            name="password"
                            className="yellow-input"
                            value={form.password}
                            onChange={changHandler}
                        />
                        <label htmlFor="email">Пароль</label>
                    </div>

                    <button
                        className="btn black darken-4"
                        style={{marginRight: 10}}
                        disabled={loading}
                        onClick={loginHandler}
                    >
                        Войти
                    </button>

                </div>
                <div id="reg" className="col s12">
                    <div className="input-field col s6">
                        <input placeholder="Введите имя" id="name" type="text" className="validate" value={regForm.name}
                               onChange={regHandler}/>
                        <label htmlFor="name">Имя</label>
                    </div>

                    <div className="input-field col s6">
                        <input placeholder="Введите фамилию" id="sName" type="text" className="validate"
                               value={regForm.sName} onChange={regHandler}/>
                        <label htmlFor="sName">Фамилия</label>
                    </div>

                    <div className="input-field col s6">
                        <input placeholder="Введите номер" id="tel" type="text" className="validate" value={regForm.tel}
                               onChange={regHandler}/>
                        <label htmlFor="tel">Номер телефона</label>
                    </div>

                    <div className="input-field">
                        <input
                            placeholder="Введите email"
                            id="email"
                            type="text"
                            name="em"
                            className="yellow-input"
                            value={regForm.email}
                            onChange={regHandler}
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-field">
                        <input
                            placeholder="Введите пароль"
                            id="password"
                            type="password"
                            name="pass"
                            className="yellow-input"
                            value={regForm.password}
                            onChange={regHandler}
                        />
                        <label htmlFor="email">Пароль</label>
                    </div>

                    <button
                        className="btn grey lighten-1 black-text"
                        onClick={registrarHandler}
                        disabled={loading}
                    >
                        Регистрация
                    </button>
                </div>
            </div>
        </div>
    );
}