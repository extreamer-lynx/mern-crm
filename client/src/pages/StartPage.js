import React from 'react'
import {Product} from '../components/Products'

export const StartPage  = () => {
    const style = {
        vh_column: {
            height: '100vh'
        },

        hr_line: {
            borderBottom: "1px solid black"
        }
    }
    return (
        <div className="row">

            <div className="col s2 grey lighten-4" style={style.vh_column}>
                <p>
                    <label>
                        <input name="group1" type="radio" checked/>
                        <span>Red</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="group1" type="radio"/>
                        <span>Yellow</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input className="with-gap" name="group1" type="radio"/>
                        <span>Green</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="group1" type="radio" disabled="disabled"/>
                        <span>Brown</span>
                    </label>
                </p>
            </div>

            <div className="col s9" style={style.vw_block}>
                <h1 style={style.hr_line}>Product</h1>
                <div className="products">
                    <Product/>
                </div>
            </div>

        </div>
    )
}