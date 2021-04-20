import { BaseStyles } from "@primer/components"
import React from "react"
import { SiteFooter, SiteHeader } from "../components"
import "../styles/index.scss"

function wrapPageElement({ element }) {
    return (
        <BaseStyles>
            <SiteHeader />
            <main>{element}</main>
            <SiteFooter />
        </BaseStyles>
    )
}

export default wrapPageElement
