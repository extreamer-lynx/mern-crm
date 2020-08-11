import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ShopBasket} from './pages/ShopBasket'
import {Profile} from './pages/Profile'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'
import {StartPage} from "./pages/StartPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/basket" exact>
                    <ShopBasket/>
                </Route>
                <Route path="/profile" exact>
                    <Profile/>
                </Route>
                <Route path="/product/:id">
                    <DetailPage/>
                </Route>
                <Route path="/">
                    <StartPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/auth" exact>
                <AuthPage/>
            </Route>
            <Route path="/">
                <StartPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}
