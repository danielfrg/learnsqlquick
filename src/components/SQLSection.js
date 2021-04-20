import Editor from "@monaco-editor/react"
import { Button, ButtonGroup, ButtonPrimary, Flex } from "@primer/components"
import React from "react"
import { DBContext, SQLTable } from "../components"

export default class SQLSection extends React.Component {
    constructor() {
        super()

        this.editor = null
        this.state = {
            queryResult: null,
            queryError: null,
        }
    }

    handleEditorDidMount = (editor, monaco) => {
        this.editor = editor

        const { autoRun } = this.props

        if (autoRun) {
            this.onRun()
        }
    }

    onRun = () => {
        const { db } = this.context

        if (db) {
            try {
                db.exec(this.editor.getValue())
                    .then(result =>
                        this.setState({
                            queryResult: result,
                            queryError: null,
                        })
                    )
                    .catch(err =>
                        this.setState({ queryResult: null, queryError: err })
                    )
            } catch (err) {
                this.setState({ queryResult: null, queryError: err })
            }
        }
    }

    onShowSolution = () => {
        if (this.editor) {
            this.editor.setValue(this.props.solution.trim())
        }
    }

    render() {
        const { defaultValue, solution } = this.props
        const { queryResult, queryError, madeOneQuery } = this.state

        let resultComponents = null

        if (queryError) {
            resultComponents = (
                <div className="flash flash-error">
                    <b>Error: </b>
                    {queryError.message}
                </div>
            )
        } else if (queryResult) {
            if (queryResult.length == 0) {
                resultComponents = (
                    <div className="flash flash-error">
                        <b>Error: </b>Empty table
                    </div>
                )
            } else {
                resultComponents = <SQLTable table={queryResult}></SQLTable>
            }
        } else {
            resultComponents = (
                <div className="blankslate">
                    <h3 className="mb-1">No results yet</h3>
                    <p>Click the run button</p>
                </div>
            )
        }

        return (
            <div className="sqlsection">
                <Flex
                    className={`editor-group ${this.props.classes}`}
                    flexDirection="rows"
                    flexGrow="1"
                    flexShrink="1"
                    flexBasis="0px"
                >
                    <Flex
                        className="item"
                        flexDirection="column"
                        flexGrow="1"
                        flexShrink="1"
                        flexBasis="0px"
                    >
                        <Editor
                            options={{
                                minimap: {
                                    enabled: false,
                                },
                            }}
                            className="editor"
                            width="100%"
                            height="100%"
                            // theme="vs-dark"
                            defaultLanguage="sql"
                            defaultValue={
                                defaultValue ? defaultValue.trim() : null
                            }
                            onMount={this.handleEditorDidMount}
                        />

                        <ButtonGroup className="buttons">
                            <ButtonPrimary onClick={this.onRun}>
                                Run
                            </ButtonPrimary>
                            {solution ? (
                                <Button onClick={this.onShowSolution}>
                                    Show solution
                                </Button>
                            ) : null}
                        </ButtonGroup>
                    </Flex>
                    <Flex
                        className="item results"
                        flexDirection="column"
                        flexGrow="1"
                        flexShrink="1"
                        flexBasis="0px"
                    >
                        {resultComponents}
                    </Flex>
                </Flex>
            </div>
        )
    }
}

SQLSection.contextType = DBContext
