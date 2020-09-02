import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

const CompletedTasks = ({sallesState, dispatch , appState}) => {

    useEffect(()=> {
      dispatch()
    })

    return (
        <React.Fragment>
            {loading ?
                <table>
                    <thead>
                    <tr>
                        <td>№</td>
                        <td>Статус</td>
                    </tr>
                    </thead>
                    <tbody>
                    {sallesState.map(prod => {
                        return (<tr>
                            <td>{prod.date}</td>
                            <td>{prod.status}</td>
                        </tr>)
                    })}
                    </tbody>
                </table> :
                <h4 className={"center"}>Нет выполненных заказов</h4>
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