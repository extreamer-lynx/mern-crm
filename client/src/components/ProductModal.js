import React, {useEffect} from "react";
import M from "materialize-css/dist/js/materialize.min";

export const ProductModal = ({product}) => {
    useEffect(() => {
        M.Modal.init(document.querySelector('#modal1'))
    }, [])

    return (
        <div id="modal1" className="modal">
            <div className="modal-content">
                <div className="row">
                    <div className="col s12 h4 center">{product.name}</div>
                    <div className="col s6 center">
                        <div className="m4">
                            <img alt={"prod"} src={product.images.flatMap(pic => {
                                if (pic.url.indexOf('main') !== -1) {
                                    return pic.url
                                }
                            })}/>
                        </div>
                    </div>
                    <div className="col s6 center">
                        {product.params.map((key, item) => {return (<p>{{key}}.......{{item}}</p>)})}
                    </div>
                </div>
            </div>
            <div className="modal-footer">

                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
        </div>
    )
}