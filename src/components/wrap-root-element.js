import { ThemeProvider } from "@primer/components"
import { default as React } from "react"
import { Provider as DBProvider } from "../components/db-context"
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
