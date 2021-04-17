import React from "react"
import { Consumer as DBConsumer } from "../components/db-context"
import SQLEditor from "./SQLEditor"

export default function SQLSection() {
    return <DBConsumer>{value => <SQLEditor></SQLEditor>}</DBConsumer>
}
