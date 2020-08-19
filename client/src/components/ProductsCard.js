import React from "react";
import {Modal} from "./Modal";

export const ProductsCard = ({item}) => {
    return (
        <div className="row">
            <div className="col s12 m4 p1">
                <div className="card">
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
                        <button data-target="modal1" className="btn modal-trigger">Modal</button>
                        <Modal/>
                    </div>
                </div>
            </div>
        </div>


    )
}