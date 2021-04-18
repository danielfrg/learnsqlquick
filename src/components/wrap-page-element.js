import { BaseStyles } from "@primer/components"
import React from "react"
import SiteHeader from "../components/header"
import "../styles/index.scss"

function wrapPageElement({ element }) {
    return (
        <BaseStyles>
            <SiteHeader />
            <main>{element}</main>
        </BaseStyles>
    )
}

export default wrapPageElement
