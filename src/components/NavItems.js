import { BorderBox, Flex, Link, themeGet } from "@primer/components"
import { Link as GatsbyLink } from "gatsby"
import React from "react"
import styled from "styled-components"

const NavLink = styled(Link)`
    &.active {
        font-weight: ${themeGet("fontWeights.bold")};
        color: ${themeGet("colors.gray.8")};
    }
`

function NavItems({ items }) {
    return (
        <>
            {items.map(item => (
                <BorderBox
                    key={item.title}
                    borderWidth={0}
                    borderRadius={0}
                    borderTopWidth={1}
                    p={4}
                >
                    <Flex flexDirection="column">
                        <NavLink
                            as={GatsbyLink}
                            to={item.url}
                            activeClassName="active"
                            partiallyActive={true}
                            color="inherit"
                        >
                            {item.title}
                        </NavLink>
                        {item.children ? (
                            <Flex flexDirection="column" mt={2}>
                                {item.children.map(child => (
                                    <NavLink
                                        key={child.title}
                                        as={GatsbyLink}
                                        to={child.url}
                                        activeClassName="active"
                                        display="block"
                                        py={1}
                                        mt={2}
                                        fontSize={1}
                                    >
                                        {child.title}
                                    </NavLink>
                                ))}
                            </Flex>
                        ) : null}
                    </Flex>
                </BorderBox>
            ))}
        </>
    )
}

export default NavItems
