import React from "react";
import {NavLink} from "react-router-dom";

export const ProductsCard = ({item}) => {
    return (
        <div className="row">
            <div className="col s12 m4 p1">
                <div className="card hoverable">
                    <div className="card-image">
                        <img alt={"prod"} src={item.images.flatMap(pic => {
                            if (pic.url.indexOf('main') !== -1) {
                                return pic.url
                            }
                        })}/>

                    </div>
                    <div className="card-content">
                        <span className="card-title">{item.name} <p className="center">{item.cost} ₴</p></span>
                        <p>{item.description.length > 150 ? item.description.substring(0, 150) + ' ...' : item.description}</p>
                    </div>
                    <div className="card-action">
                        <NavLink to={`/product/${item._id}`}>Подробней</NavLink>
                    </div>
                </div>
            </div>
        </div>


    )
}