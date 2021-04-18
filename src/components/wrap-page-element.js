import { BaseStyles } from "@primer/components"
import React from "react"
import SiteHeader from "../components/site-header"
import SiteFooter from "../components/site-footer"
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
