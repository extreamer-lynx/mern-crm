import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav className="z-depth-0">
            <div className="nav-wrapper grey darken-3" style={{padding: '0 2rem'}}>
                <span className="brand-logo center"><NavLink to="/">Guitar Shop</NavLink></span>
                {auth.isAuthenticated &&
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                    </ul> }
            </div>
        </nav>
    )
}
