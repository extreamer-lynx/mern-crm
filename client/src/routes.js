import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ShopBasket from './pages/ShopBasket'
import Profile from './pages/Profile'
import {AuthPage} from './pages/AuthPage'
import {StartPage} from "./pages/StartPage";
import {ProductDetails} from "./pages/ProductDetails";

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
                    <ProductDetails/>
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
            <Route path="/product/:id">
                <ProductDetails/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}
