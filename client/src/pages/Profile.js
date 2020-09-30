import React from 'react'
import M from "materialize-css/dist/js/materialize.min";
import {connect} from "react-redux";
import {changeProfile, getProfile} from "../store/action/profileAction";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {form: {name: '', sName: '', tel: '', email: ''}};
        this.formHandler = this.formHandler.bind(this);
    }

    componentDidMount(): void {
        M.Tabs.init(document.querySelectorAll('#profileTabs'))
        this.props.dispatch(getProfile())
        window.M.updateTextFields()
    }

    formHandler(event) {
        this.setState({form: {...this.state.form, [event.target.id]: event.target.value}})
    }

    render() {
        return (
        <div className="container">
            <div className="row">
                <div className="col s8 center-block">
                    <ul className="tabs" id={"profileTabs"}>
                        <li className="tab col s3"><a className="active" href="#profile">Профиль</a></li>
                        <li className="tab col s3"><a href="#change">Изменить</a></li>
                    </ul>
                </div>


                <div id="profile" className="col s12">
                    <p>Имя: {this.props.profile.name}</p>
                    <p>Фамилия: {this.props.profile.sName}</p>
                    <p>Телефон: {this.props.profile.tel}</p>
                    <p>Email: {this.props.profile.email}</p>
                </div>

                <div id="change" className="col s12">
                    <div className="input-field col s6">
                        <input placeholder="Введите имя" id="name" type="text" className="validate" value={this.state.form.name}
                               onChange={e => this.formHandler(e)}/>
                        <label htmlFor="name">Имя</label>
                    </div>

                    <div className="input-field col s6">
                        <input placeholder="Введите фамилию" id="sName" type="text" className="validate"
                               value={this.state.form.sName} onChange={e => this.formHandler(e)}/>
                        <label htmlFor="sName">Фамилия</label>
                    </div>

                    <div className="input-field col s6">
                        <input placeholder="Введите номер" id="tel" type="text" className="validate" value={this.state.form.tel}
                               onChange={e => this.formHandler(e)}/>
                        <label htmlFor="tel">Номер телефона</label>
                    </div>

                    <div className="input-field col s6">
                        <input
                            placeholder="Введите email"
                            id="email"
                            type="text"
                            name="em"
                            className="yellow-input"
                            value={this.state.form.email}
                            onChange={e => this.formHandler(e)}
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <a href="#a" className={"btn"} onClick={() => this.props.dispatch(changeProfile(this.state.form))}>Click</a>
                </div>
            </div>
        </div>
        )
    }
}

export default connect(state => {return {profile: state.profileState}})(Profile)