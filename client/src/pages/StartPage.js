import React, {useEffect, useState} from 'react'
import {Product} from '../components/Products'
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {CategoryRadio} from "../components/CategoryRadio";


export const StartPage = () => {
    const [categories, setCategories] = useState(null);
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const style = {
        vh_column: {
            height: '100vh'
        }
    }

    function handleClick(e) {
        e.preventDefault()
        console.log(e.target.name)
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        const categoryHandler = async () => {
            try {
                const d = await request('/api/products/categories', 'POST')
                setCategories(d)
            } catch (e) {
            }
        }
        categoryHandler()
    }, [request])

    return (
        <div className="row">
            <div className="col s2 grey lighten-4 m4 l3" style={style.vh_column}>
                <ul className={"sidenav sidenav-open"} id="slide-out">
                    <li><h4 style={{marginBottom: "3rm"}}>Категории</h4></li>

                    {loading && <Loader/>}
                    {categories ? categories.map(item => <CategoryRadio category={item}
                                                                        key={item._id}/>) : loading ? null : "Пока категорий нет"}
                    <li>
                        <a href="category" className="center" name="sdf" onClick={handleClick}>localTest</a>
                    </li>
                </ul>
            </div>
            <Product/>
        </div>
    )
}