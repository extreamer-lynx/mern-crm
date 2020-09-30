import React, {useEffect, useState} from "react";
import {connect} from "react-redux"
import {getCategory, plusCategory} from "../store/action/categoryAction";
import {CategoryItem} from "../components/CategoryItem";
import {useMessage} from "../hooks/message.hook";


const Categories = ({dispatch, app, categories}) => {
    const [addCategory, setAddCategory] = useState()
    const message = useMessage()

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    const addHandler = (e) => {
        setAddCategory(e.target.value)
    }

    const addClickHandler = () => {
        dispatch(plusCategory(addCategory))
    }

    if(app.error){
        message(app.error)
    }

    return (
        <React.Fragment>
            <div className="row center-align">
                <div className="input-field col s6">
                    <input id="name" type="text" className="validate" onChange={addHandler}/>
                    <label className="active" htmlFor="name">Введите имя</label>
                </div>
                <div className="col s3" style={{paddingTop: "20px"}}>
                    <button className="btn" onClick={addClickHandler}>Добавить</button>
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
                {categories ? categories.map((item) => {
                    return <CategoryItem key={item.ruCategory} item={item}/>
                }) : null}
                </tbody>
            </table>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({categories: state.categoryState, app: state.appState})

export default connect(mapStateToProps)(Categories)