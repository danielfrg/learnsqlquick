import { BaseStyles, Flex, Grid } from "@primer/components"
import React from "react"
import SiteHeader from "../components/header"
import "../styles/index.scss"

function wrapPageElement({ element }) {
    return (
        <BaseStyles>
            <SiteHeader />
            <Flex className="container markdown-body">
                <Grid className="content">{element}</Grid>
            </Flex>
        </BaseStyles>
    )
}

export default wrapPageElement
