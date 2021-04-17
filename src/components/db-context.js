import React from "react"

export const Context = React.createContext({
    db: null,
})

export const Provider = Context.Provider
export const Consumer = Context.Consumer
