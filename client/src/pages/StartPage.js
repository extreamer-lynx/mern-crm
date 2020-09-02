import React, {useEffect} from "react";
import {Loader} from "../components/Loader";
import {useMessage} from "../hooks/message.hook";
import {ProductsCard} from "../components/ProductsCard";

import {useDispatch, useSelector} from "react-redux";
import {init} from "../store/action/productAction";
import {Search} from "../components/Search";

export const StartPage = () => {
    const message = useMessage()
    const lable = useSelector(state => state.appState.page)
    const dispatch = useDispatch();
    const loading = useSelector(state => state.appState.isLoading)
    const product = useSelector(state => state.productState)
    const error = useSelector(state => state.appState.error)

    useEffect(() => {
        dispatch(init())
    },[])

    if (error){
        message(error)
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <h4 style={{marginBottom: "3rm", margin: "3rm"}}>{lable}  <Search/></h4>
                    <hr/>
                    <div className="products">
                        {loading && <Loader/>}
                        {product ? product.map((items => {
                            return <ProductsCard item={items} key={items.date}/>
                        })) : loading ? null : "Пока товаров нет!"}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}