import { ThemeProvider } from "@primer/components"
import React from "react"
// import { ThemeProvider } from "styled-components"

function wrapRootElement({ element }) {
    return <ThemeProvider>{element}</ThemeProvider>
}

export default wrapRootElement
