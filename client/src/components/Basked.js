import React from 'react'
import {remove} from "../store/action/basketAction";
import {useMessage} from "../hooks/message.hook";
import {connect} from "react-redux"
import {buySales} from "../store/action/sallesAction";


function Basked({baskedState, dispatch, loading, error}) {
    const message = useMessage()
    localStorage.setItem('baskedState', JSON.stringify(baskedState))

    if (!baskedState.length) {
        return <h4 className="center">Товаров пока нет</h4>
    }

    function deleteBasketHandler(e) {
        e.preventDefault()
        dispatch(remove(e.target.id))
        message("Товар удален")
    }

    function sellHandler(e) {
        e.preventDefault()
        dispatch(buySales(baskedState))
        message(error)
    }



    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Имя</th>
                <th>Количество</th>
                <th>Цена</th>
                <th>&#032;</th>
            </tr>
            </thead>

            <tbody>
            {baskedState.map((product, index) => {
                return (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.count}</td>
                        <td>{product.cost} грн</td>
                        <td><a href={product._id} id={index} onClick={deleteBasketHandler}>Удалить</a></td>
                    </tr>
                )
            })}
            </tbody>
            <tfoot>
            <tr>
                <td>&#032;</td>
                <td>&#032;</td>
                <td>&#032;</td>
                <td>&#032;</td>
                <td>
                    {!loading ? <a className={"btn"} href={"#send"} onClick={sellHandler}>Заказать</a> : <a className={"btn disabled"} href={"#send"}>Заказать</a>}
                </td>
            </tr>
            </tfoot>
        </table>
    )
}

const mapStateToProps = function (state) {
    return {
        baskedState: state.baskedState,
        loading: state.appState.isLoading,
        error: state.appState.error
    }
}

export default connect(mapStateToProps)(Basked);