import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {

    const [form, setForm] = useState({
        email: '', password: ''
    })

    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const auth = useContext(AuthContext)


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/admin/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col s6 offset-s3">
                    <div className="card grey darken-3" id='auth'>
                        <div className="card-content white-text">
                            <div className="card-title">Авторизация</div>
                                <div className="input-field">
                                    <input
                                        placeholder="Введите email"
                                        id="email"
                                        type="text"
                                        name="email"
                                        className="yellow-input"
                                        value={form.email}
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>

                                <div className="input-field">
                                    <input
                                        placeholder="Введите пароль"
                                        id="password"
                                        type="password"
                                        name="password"
                                        className="yellow-input"
                                        value={form.password}
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="email">Пароль</label>
                                </div>
                        </div>
                        <div className="card-action">
                            <button
                                className="btn black darken-4"
                                style={{marginRight: 10}}
                                disabled={loading}
                                onClick={loginHandler}
                            >
                                Войти
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
