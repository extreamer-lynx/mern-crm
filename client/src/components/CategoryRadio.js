import React from "react";

export const CategoryRadio = (props) => {
    const category = props.category
    return (
        <p>
            <label>
                <input name={category.category} type="radio"/>
                <span>{category.ruCategory}</span>
            </label>
        </p>
    )
}