import { ThemeProvider } from "@primer/components"
import { default as React } from "react"
import initSqlJs from "sql.js"

import { Provider as DBProvider } from "./db-context"

class SQLite {
    constructor() {
        // super()
        // this.state = { db: null, err: null, results: null }

        this.db = null
        this.err = null

        initSqlJs({
            locateFile: file =>
                `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/${file}`,
        })
            .then(SQL => (this.db = new SQL.Database()))
            .catch(err => (this.error = err))
    }

    // componentDidMount() {
    //     // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
    //     // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
    //     // see ../config-overrides.js
    //     initSqlJs({
    //         locateFile: file =>
    //             `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/${file}`,
    //     })
    //         .then(SQL => this.setState({ db: new SQL.Database() }))
    //         .catch(err => this.setState({ err }))
    // }

    exec(sql) {
        let results = null,
            err = null
        try {
            // The sql is executed synchronously on the UI thread.
            // You may want to use a web worker
            results = this.db.exec(sql) // an array of objects is returned
        } catch (e) {
            // exec throws an error when the SQL statement is invalid
            err = e
        }
        return results
    }

    // render() {
    //     return null
    // }
}

function wrapRootElement({ element }) {
    return (
        <ThemeProvider>
            <DBProvider value={{ db: new SQLite() }}>{element}</DBProvider>
        </ThemeProvider>
    )
}

export default wrapRootElement
