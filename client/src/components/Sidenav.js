import {Loader} from "./Loader";
import React, {useEffect, useState} from "react";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import M from 'materialize-css/dist/js/materialize.min'
import {useDispatch} from "react-redux";
import {byCategory} from "../store/action/productAction";

const Sidenav = () => {

    const [categories, setCategories] = useState(null)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const dispatch = useDispatch()

    function handleClick(e) {
        e.preventDefault()
        dispatch(byCategory(e.target.name))

    }

    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {})
    }, [])

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
        <React.Fragment>
            <ul className={"sidenav sidenav-open"} id="slide-out">
                <li><h4 style={{marginBottom: "3rm"}} className="black-text">Категории</h4></li>
                <li><hr/></li>
                {loading && <Loader/>}
                {categories ? categories.map((item) => <li key={item.ruCategory}><a onClick={handleClick} name={item._id} href={item.category}>{item.ruCategory}</a></li>) : loading ? null : "Пока категорий нет"}>
            </ul>
        </React.Fragment>
    )
}

export default Sidenav;