import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from './pages/AuthPage'
import {Link} from "react-router-dom";
import SearchProduct from "./pages/SearchProduct";
import Categories from "./pages/Categories";
import AddProduct from "./pages/AddProduct";
import  Profiles from "./pages/Profiles"
import Salles from "./pages/Salles";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <div className="row">
                <div className="col s3">
                    <ul className={"collection"}>
                        <li><Link to="/profile" className={"collection-item"}>Профили</Link></li>
                        <li><Link to={"/searchP"} className={"collection-item"}>Товары</Link></li>
                        <li><Link to={"/salles"} className={"collection-item"}>Заказы</Link></li>
                        <li><Link to={"/categories"} className={"collection-item"}>Категории</Link></li>
                        <li><Link to={"/addProduct"} className={"collection-item"}>Добавить продукт</Link></li>
                    </ul>
                </div>

                <div className="col s9">
                    <Switch>
                        <Route path="/profile" exact>
                            <Profiles/>
                        </Route>
                        <Route path={"/searchP"} exact>
                            <SearchProduct/>
                        </Route>
                        <Route path={"/categories"} exact>
                            <Categories/>
                        </Route>
                        <Route path={"/addProduct"} exact>
                            <AddProduct/>
                        </Route>
                        <Route path={"/salles"} exact>
                            <Salles/>
                        </Route>
                        <Redirect to="/profile"/>
                    </Switch>
                </div>

            </div>
        )
    }

    return (
        <Switch>
            <Route path="/auth" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/auth"/>
        </Switch>
    )
}
