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
    <nav>
      <div className="nav-wrapper grey darken-3" style={{ padding: '0 2rem' }}>
        <span className="brand-logo"><NavLink to="/">Guitar Shop</NavLink></span>
        {auth.isAuthenticated ?
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><NavLink to="/basket"><i className="material-icons left">shopping_cart</i> Корзина</NavLink></li>
              <li><NavLink to="/profile"><i className="material-icons left">person</i> Профиль</NavLink></li>
              <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
            </ul> :
            <ul className="right hide-on-med-and-down">
              <li><NavLink to="/auth">Ввойти</NavLink></li>
            </ul>
        }
      </div>
    </nav>
  )
}
