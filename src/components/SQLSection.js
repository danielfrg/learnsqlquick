import React from "react"
import { Consumer as DBConsumer } from "../components/db-context"
import SQLEditor from "./SQLEditor"

export default function SQLSection(props) {
    return (
        <DBConsumer>
            {value => (
                <div className="sqlsection">
                    <SQLEditor
                        autoRun={props.autoRun}
                        defaultValue={props.defaultValue}
                        solution={props.solution}
                        classes={props.classes}
                    ></SQLEditor>
                </div>
            )}
        </DBConsumer>
    )
}
