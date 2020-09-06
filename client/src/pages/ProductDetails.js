import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {add} from "../store/action/basketAction"
import M from 'materialize-css/dist/js/materialize.min'
import {useDispatch} from "react-redux";

export const ProductDetails = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [basket, setBasket] = useState({count: 1})
    const dispatch = useDispatch()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        const productHandler = async () => {
            try {
                const d = await request('/api/products/product', 'POST', {id})
                await setProduct(d)

                M.Carousel.init(document.querySelectorAll('.carousel'), {indicators: true})
                window.M.updateTextFields()
            } catch (e) {
            }
        }

        productHandler()


    }, [request, id])

    const changeHandler = (e) => {
        setBasket({...basket, [e.target.name]: e.target.value})
    }

    const clickHandler = () => {
        dispatch(add({name: product.name, cost: basket.count * product.cost, count: basket.count, allCount: product.count}))
        message("Товар добавлен в корзину")
    }

    return (
        <div className="container">
            {loading && <Loader/>}
            {product ?
                <React.Fragment>
                    <div className="row section">
                        <div className="col s12 m6 pull-s1">
                            <div className="carousel carousel-slider center">
                                {product.images.map((item) => {
                                    return (<div className="carousel-item" key={item.url}><img alt={"img"}
                                                                                               src={item.url}/></div>)
                                })}
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <h5>{product.name}</h5>
                            <hr/>
                            <p>Стоимость: {product.cost} грн.</p>
                            <p>На складе: {product.count} шт.</p>
                            <p>Характеристики:</p>
                            {product.params.map((item, key) => {
                                return (<p key={key}>{item.key + ' - ' + item.value}</p>)
                            })}
                            <div className="input-field col m4 s4">
                                <input id="count" name="count" onChange={changeHandler} type="text"
                                       className="validate"/>
                                <label className="active" htmlFor="count">Количество</label>
                            </div>
                            <p>
                                <button className="btn" style={{marginTop: "25px"}} onClick={clickHandler}>В корзину
                                </button>
                            </p>
                        </div>
                        <div className="col s12">
                            {product.description}
                        </div>
                    </div>
                </React.Fragment> : loading ? null : 'Internal Error'
            }

        </div>
    )}