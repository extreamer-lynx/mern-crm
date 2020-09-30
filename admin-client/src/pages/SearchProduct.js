import React, {useState, useEffect} from "react";
import {connect} from "react-redux"
import {searchProd} from "../store/action/productAction";
import {ProductItem} from "../components/ProductItem";
import {useMessage} from "../hooks/message.hook";
import {Loader} from "../components/Loader";

const SearchProduct = ({dispatch, app, product}) => {
    const [searchProduct, setSearchProduct] = useState()
    const message = useMessage()

    const addHandler = (e) => {
        setSearchProduct(e.target.value)
    }

    const addClickHandler = () => {
        dispatch(searchProd(searchProduct))
    }

    useEffect(() => {
        if (app.error) {
            message(app.error)
        }
    })

    return (
        <React.Fragment>
            <div className="row center-align">
                <div className="input-field col s6">
                    <input id="first_name2" type="text" className="validate" onChange={addHandler}/>
                    <label className="active" htmlFor="first_name2">Введите имя</label>
                </div>
                <div className="col s3" style={{paddingTop: "20px"}}>
                    <button className="btn" onClick={addClickHandler}>Искать</button>
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <td>Название</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                </thead>
                <tbody>
                {product ? product.map((item) => {
                    return <ProductItem item={item}/>
                }) : app.isLoading ? <Loader/> : null}
                </tbody>
            </table>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({product: state.productState, app: state.appState})

export default connect(mapStateToProps)(SearchProduct)