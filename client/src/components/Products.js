import React, {useEffect, useState} from "react";
import {Loader} from "./Loader";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import {ProductsCard} from "./ProductsCard";

export const Product = () => {
    const [product, setProduct] = useState(null);
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [lable, setLable] = useState('Последние добавленные товары')
    const style = {

        hr_line: {
            borderBottom: "1px solid black"
        }
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        const topProdHandler = async () => {
            try {
                const d = await request('/api/products/topProducts', 'POST')
                setProduct(d)
            }catch (e) {
            }
        }
        topProdHandler()
    },[request])

    return(
        <div className="col s9">
            <h3 style={style.hr_line}>{lable}</h3>
            <div className="products">
                {loading && <Loader/>}
                {product ? product.map((items => {return <ProductsCard item={items} key={items.date}/>})) : loading ? null : "Пока товаров нет!"}
            </div>
        </div>
    )
}