import React from 'react'
import {useDispatch} from "react-redux";
import {deleteProf} from "../store/action/profileAction";
import {changeProfile} from "../store/action/profileAction";

export const ProfileItem = ({item}) => {
    const dispatch = useDispatch()

    const deleteProfile = (e) => {
        e.preventDefault();
        dispatch(deleteProf(item._id))
    }

    const adminProfile = (e) => {
        e.preventDefault();
        dispatch(changeProfile(item._id,"admin"))
    }

    const memberProfile = (e) => {
        e.preventDefault();
        dispatch(changeProfile(item._id,"member"))

    }

    return (
        <tr>
            <td>{item.email}</td>
            <td>{item.tel}</td>
            <td>{item.role}</td>
            <td>{item.role === "member" ? <a href={item._id} className={"btn"} onClick={adminProfile}>Сделать админом</a> : <a href={item._id} className={"btn"} onClick={memberProfile}>Убрать админку</a>}</td>
            <td><a href={item._id} className={"btn"} onClick={deleteProfile}>Удалить</a></td>
        </tr>
    )
}