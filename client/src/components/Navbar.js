import React, {useContext} from 'react'
import {NavLink, useHistory, useLocation} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {AuthModal} from "./AuthModal";
import Sidenav from "./Sidenav";

export const Navbar = () => {

    const location = useLocation();
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
                {location.pathname === '/' &&
                <React.Fragment>
                    <Sidenav/>
                    <a href="#slide-out" data-target="slide-out" className="sidenav-trigger show-on-large"><i
                        className="material-icons">menu</i></a>
                </React.Fragment>}
                {auth.isAuthenticated ?
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/basket"><i className="material-icons left">shopping_cart</i> Корзина</NavLink>
                        </li>
                        <li><NavLink to="/profile"><i className="material-icons left">person</i> Профиль</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                    </ul> : <React.Fragment>
                        <ul className="right hide-on-med-and-down">
                            <li><a className="modal-trigger" href="#AuthModal">Ввойти</a></li>
                        </ul>
                        <AuthModal/>
                    </React.Fragment>
                }
            </div>
        </nav>
    )
}
