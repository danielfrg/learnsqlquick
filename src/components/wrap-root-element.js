import { ThemeProvider } from "@primer/components"
import { default as React } from "react"
import initSqlJs from "sql.js"

import { Provider as DBProvider } from "./db-context"

class SQLite {
    constructor() {
        this.db = null
        this.err = null
    }

    async init() {
        const sqlPromise = initSqlJs({
            locateFile: file =>
                `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/${file}`,
        })

        const url = "/dbs/acs-1-year-2015.sqlite"
        // const url =
        // "https://github.com/lerocha/chinook-database/raw/master/ChinookDatabase/DataSources/Chinook_Sqlite.sqlite"
        const dataPromise = fetch(url)
            .then(res => res.arrayBuffer())
            .catch(function (err) {
                console.log(err)
            })

        const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
        const db = new SQL.Database(new Uint8Array(buf))

        this.db = db
    }

    exec(sql) {
        return this.db.exec(sql)
        // let results = null,
        //     err = null
        // try {
        //     // The sql is executed synchronously on the UI thread.
        //     // You may want to use a web worker
        //     results = this.db.exec(sql) // an array of objects is returned
        // } catch (e) {
        //     // exec throws an error when the SQL statement is invalid
        //     err = e
        // }
        // return results
    }
}

function wrapRootElement({ element }) {
    const db = new SQLite()
    db.init()

    return (
        <ThemeProvider>
            <DBProvider value={{ db: db }}>{element}</DBProvider>
        </ThemeProvider>
    )
}

export default wrapRootElement
