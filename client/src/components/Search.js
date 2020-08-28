import React from "react";

export const Search = () => {
    return (<div className={"right "} style={{marginTop: 0, paddingTop: 0}}>
                    <div className="input-field col s5" style={{marginTop: 0}}>
                        <input id="input_text" type="text" data-length="10"/>
                        <label htmlFor="input_text">Поиск</label>
                        <a className="prefix material-icons">arrow_forward</a>
                    </div>

        </div>
    )
}