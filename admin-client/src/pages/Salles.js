import React from "react";
import {connect} from "react-redux";
import {initSales} from "../store/action/sallesAction";
import {SallesItem} from "../components/SallesItem";

class Salles extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount(): void {
        this.props.dispatch(initSales())
    }

    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Статус</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>

                <tbody>
                {this.props.salles.length ? this.props.salles.map((item, index) => {
                    return (<SallesItem key={index} item={item}/>)
                }) : null}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => ({salles: state.sallesState, app: state.appState})

export default connect(mapStateToProps)(Salles)