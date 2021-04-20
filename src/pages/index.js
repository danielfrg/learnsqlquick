import { Flex } from "@primer/components"
import { Link } from "gatsby"
import * as React from "react"
import { SEO, SQLSection } from "../components"

const IndexPage = () => {
    const defaultQuery =
        'SELECT SUM(total_population) AS "Total Population"\nFROM states;'

    return (
        <>
            <SEO title="Home" />
            <div className="index">
                <div className="jumbo" data-color-mode="dark">
                    <Flex className="content">
                        <div>
                            <h1>Learn SQL quick</h1>
                            <h2>
                                Prepare for a job interview, an exam, homework,
                                whatever.
                            </h2>
                            <h2>No subscription, no registration.</h2>
                            <p>
                                Our <Link to="/lessons">lessons</Link> go
                                straight to the point and are designed to help
                                you learn or remember concepts and prepare for
                                your next SQL interview or exam.
                            </p>
                            <p>
                                The interactive inline SQL Editor allows you to
                                quickly iterate and test queries.
                            </p>
                            <p>
                                All the content on this website is{" "}
                                <a href="https://github.com/danielfrg/learnsqlquick">
                                    Open Source
                                </a>{" "}
                                and available to anyone.
                            </p>
                        </div>
                    </Flex>
                </div>
                <div className="get-started">
                    <div className="container-xl">
                        <h2>Getting started</h2>
                        <Flex className="items">
                            <div className="item">
                                <Link to="/lessons">
                                    <h3>Lessons</h3>
                                </Link>
                                <p>
                                    Remember and practice SQL concepts going
                                    from basic basic to advanced.
                                </p>
                            </div>
                            <div className="item">
                                <Link to="/questions">
                                    <h3>Questions</h3>
                                </Link>
                                <p>
                                    Prepare with real life interview questions.
                                </p>
                            </div>
                        </Flex>
                    </div>
                </div>
                <div className="container-xl editor-demo">
                    <h2>Try the interactive editor</h2>
                    <SQLSection
                        defaultValue={defaultQuery}
                        classes="editor-wrapper"
                    ></SQLSection>
                </div>
            </div>
        </>
    )
}

export default IndexPage
