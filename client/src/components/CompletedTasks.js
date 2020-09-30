import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Loader} from "../components/Loader";
import {initSales} from "../store/action/sallesAction";

const CompletedTasks = ({sallesState, appState, dispatch}) => {

    useEffect(()=>{
        dispatch(initSales())
    },[dispatch])

    return (
        <React.Fragment>
            {appState.isLoading && <Loader/>}
            {sallesState.length ?
                <table>
                    <thead>
                    <tr>
                        <td>№</td>
                        <td>Дата</td>
                        <td>Статус</td>
                    </tr>
                    </thead>
                    <tbody>
                    {sallesState.map((prod, index) => {
                        return (<tr key={index}>
                            <td>{index+1}</td>
                            <td>{prod.date}</td>
                            <td>{prod.status ? <div className="green-text" style={{display: "inline"}}>Выполнен</div> : <div style={{display: "inline"}} className="red-text">Выполняется</div>}</td>
                        </tr>)
                    })}
                    </tbody>
                </table> : appState.isLoading ? null :
                    <h4 className={"center"}>Заказов нет!</h4>
            }
        </React.Fragment>
    )
}

const mapStateToProps = function (state) {
    return {
        sallesState: state.sallesState,
        appState: state.appState
    }
}

export default connect(mapStateToProps)(CompletedTasks);