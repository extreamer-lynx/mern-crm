import React, {useState} from "react";

const CompletedTasks = () => {
    const [tasks] = useState(0)

    if(!tasks){
        return (
            <h4 className={"center"}>Нет выполненных заказов</h4>
        )
    }

    return (
        <table>
            <thead>
            <tr>
                <td>№</td>
                <td>Статус</td>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>ff</td>
                    <td>asd</td>
                </tr>
            </tbody>
        </table>
    )
}

export default CompletedTasks