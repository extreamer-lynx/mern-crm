import React, {useState} from "react";
import {Loader} from "../components/Loader";
import {connect} from "react-redux"
import {searchProfile} from "../store/action/profileAction";
import {ProfileItem} from "../components/ProfileItem";
import {useMessage} from "../hooks/message.hook";

const Profiles = ({profiles, dispatch, app}) => {

    const message = useMessage()
    const [search, setSearch] = useState("")

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    if(app.error){
        message(app.error)
    }

    const searchClickHandler = (e) => {
        e.preventDefault()
        dispatch(searchProfile(search))
    }

    return (
        <React.Fragment>
            <div className="row center-align">
                <div className="input-field col s6">
                    <input id="first_name2" type="text" className="validate" onChange={searchHandler}/>
                    <label className="active" htmlFor="first_name2">Поиск по email</label>
                </div>
                <div className="col s3" style={{paddingTop: "20px"}}>
                    <button className="btn" onClick={searchClickHandler}>Поиск</button>
                </div>
            </div>
            <div className="row">
                <table>
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Tel</th>
                        <th>Роль</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {profiles && profiles.map((item, index) => {
                        return (<ProfileItem key={index} item={item}/>)
                    })}
                    </tbody>
                </table>
                {app.isLoading && <Loader/>}
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({profiles: state.profilesState, app: state.appState})

export default connect(mapStateToProps)(Profiles)