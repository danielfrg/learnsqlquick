import React from "react"
import { Context as DBContext } from "../components/db-context"
import SQLTable from "../components/SQLTable"
import { BorderBox, Flex, ButtonPrimary } from "@primer/components"

import Editor from "@monaco-editor/react"

export default class SQLEditor extends React.Component {
    constructor() {
        super()

        this.editor = null
        this.state = {
            result: null,
        }
    }

    handleEditorDidMount = (editor, monaco) => {
        this.editor = editor
    }

    onRun = () => {
        const { db } = this.context

        try {
            const result = db.exec(this.editor.getValue())
            this.setState({ result: result, err: null })
        } catch (err) {
            this.setState({ result: null, err: err })
        }
    }

    render() {
        const { result, err } = this.state

        let results = null
        if (err) {
            results = err.message
        } else {
            results = <SQLTable table={result}></SQLTable>
        }

        return (
            <Flex className="editor" flexDirection="rows">
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
                            onMount={this.handleEditorDidMount}
                            width="100%"
                            height="200px"
                            defaultLanguage="sql"
                            defaultValue="SELECT * FROM states;"
                            // defaultValue="SELECT 1, 222222, 3;"
                        />
                    </BorderBox>
                    <ButtonPrimary onClick={this.onRun}>Run</ButtonPrimary>
                </Flex>
                <Flex
                    className="item"
                    flexDirection="column"
                    flexBasis="0"
                    flexGrow="1"
                >
                    {results}
                </Flex>
            </Flex>
        )
    }
}

SQLEditor.contextType = DBContext
