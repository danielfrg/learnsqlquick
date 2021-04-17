import React, { useContext } from "react"
import { Context as DBContext } from "../components/db-context"

export default function SQLEditor() {
    const sql = useContext(DBContext)

    console.log(sql.db.exec("SELECT 1"))

    return "hi"
}
