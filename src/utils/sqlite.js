import initSqlJs from "sql.js"

export default class SQLite {
    constructor() {
        this.db = null
    }

    async init() {
        const sqlPromise = initSqlJs({
            locateFile: file =>
                `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/${file}`,
        })

        const url = "/dbs/acs-1-year-2015.sqlite"
        const dataPromise = fetch(url)
            .then(res => res.arrayBuffer())
            .catch(function (err) {})

        const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
        const db = new SQL.Database(new Uint8Array(buf))

        this.db = db
    }

    async exec(sql) {
        if (!this.db) {
            await this.init()
        }

        return this.db.exec(sql)
    }
}
