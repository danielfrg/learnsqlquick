import React from "react"
import { Context as DBContext } from "../components/db-context"
import SQLTable from "../components/SQLTable"
import {
    BorderBox,
    Flex,
    ButtonGroup,
    Button,
    ButtonPrimary,
} from "@primer/components"

import Editor from "@monaco-editor/react"

export default class SQLEditor extends React.Component {
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
            this.editor.setValue(this.props.solution)
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

        let bg = null
        if (!solution) {
            bg = "editor-greygb"
        }

        return (
            <Flex className={`editor-group ${bg}`} flexDirection="rows">
                <Flex
                    className="item"
                    flexDirection="column"
                    flexBasis="0"
                    flexGrow="4"
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
                        defaultValue={defaultValue}
                        onMount={this.handleEditorDidMount}
                    />

                    <ButtonGroup my={2}>
                        <ButtonPrimary onClick={this.onRun}>Run</ButtonPrimary>
                        {solution ? (
                            <Button onClick={this.onShowSolution}>
                                Show solution
                            </Button>
                        ) : null}
                    </ButtonGroup>
                </Flex>
                <Flex
                    className="item"
                    flexDirection="column"
                    flexBasis="0"
                    flexGrow="6"
                >
                    {resultComponents}
                </Flex>
            </Flex>
        )
    }
}

SQLEditor.contextType = DBContext
