import React from "react"

export default class SQLTable extends React.Component {
    render() {
        const { table } = this.props

        if (!table) {
            return null
        }

        console.log(table)

        const headers = table[0].columns.map((col, index) => (
            <th key={index} className="column">
                {col}
            </th>
        ))

        const rows = table[0].values.map((element, index) => {
            const cols = element.map((value, index2) => (
                <td key={index2} className="column">
                    {value}
                </td>
            ))
            return <tr key={index}>{cols}</tr>
        })

        return (
            <div className="table markdown-body">
                <table>
                    <thead>
                        <tr>{headers}</tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        )
    }
}
