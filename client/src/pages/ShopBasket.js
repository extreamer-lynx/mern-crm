import React, {useEffect} from 'react'
import M from 'materialize-css/dist/js/materialize.min'
import Basked from "../components/Basked";
import CompletedTasks from "../components/CompletedTasks";


const ShopBasket = () => {
    //dispatch(add({name:"someTov", cost:Math.random(), count: Math.random()}))

    useEffect(() => {
        M.Tabs.init(document.querySelectorAll('.tabs'))
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s3"><a href="#basket">Корзина</a></li>
                        <li className="tab col s3"><a href="#completed">Заказы</a></li>
                    </ul>
                </div>
                <div id="basket" className="col s12">
                    <Basked/>
                </div>
                <div id="completed" className="col s12">
                    <CompletedTasks/>
                </div>
            </div>
        </div>
    )
}


export default ShopBasket