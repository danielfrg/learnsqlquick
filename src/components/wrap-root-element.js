import { ThemeProvider } from "@primer/components"
import React from "react"
import { DBProvider } from "../components"
import SQLite from "../utils/sqlite"

function wrapRootElement({ element }) {
    const db = new SQLite()

    return (
        <ThemeProvider>
            <DBProvider value={{ db: db }}>{element}</DBProvider>
        </ThemeProvider>
    )
}

export default wrapRootElement
