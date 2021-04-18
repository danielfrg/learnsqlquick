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
            result: null,
            madeOneQuery: false,
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

        try {
            const result = db.exec(this.editor.getValue())
            this.setState({ result: result, err: null, madeOneQuery: true })
        } catch (err) {
            this.setState({ result: null, err: err, madeOneQuery: true })
        }
    }

    onShowSolution = () => {
        if (this.editor) {
            this.editor.setValue(this.props.solution)
        }
    }

    render() {
        const { defaultValue, solution } = this.props
        const { result, err, madeOneQuery } = this.state

        let resultComponents = null
        if (madeOneQuery) {
            if (err) {
                resultComponents = (
                    <div class="flash flash-error">{err.message}</div>
                )
            } else if (result.length == 0) {
                resultComponents = (
                    <div class="flash flash-error">Empty table</div>
                )
            } else {
                resultComponents = <SQLTable table={result}></SQLTable>
            }
        }

        let bg = null
        if (!solution) {
            bg = "editor-greygb"
        }

        return (
            <Flex className={`sqleditor ${bg}`} flexDirection="rows">
                <Flex
                    className="item"
                    flexDirection="column"
                    flexBasis="0"
                    flexGrow="1"
                >
                    <BorderBox>
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
                    </BorderBox>
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
                    flexGrow="1"
                >
                    {resultComponents}
                </Flex>
            </Flex>
        )
    }
}

SQLEditor.contextType = DBContext
