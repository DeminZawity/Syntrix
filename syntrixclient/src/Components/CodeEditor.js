import React, {useState} from "react";
import styled from "styled-components";
import Editor, { loader } from '@monaco-editor/react';
import { Container, Spacer, TextField } from "../UI/Models";


function handleEditorWillMount(monaco) {
    monaco.editor.defineTheme('myCustomTheme', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: '', foreground: '#ffffff' },
        { token: 'comment', foreground: '#ffa500', fontStyle: 'italic underline' },
        { token: 'comment.js', foreground: '#53B348', fontStyle: 'bold' },
        { token: 'keyword', foreground: '#9720FF', fontStyle: 'bold' },
        { token : 'delimiter', foreground : "#9720FF"},
        { token : 'delimiter.parenthesis', foreground : "#9720FF"},
        { token : 'delimiter.bracket', foreground : "#9720FF"}
        // 
        // comment
        // string
        // keyword
        // number
        // type
        // function
        // variable
        // tag (for markup languages like HTML and XML)
        // attribute.name and attribute.value (also for markup languages)
      ],
      colors: {
        'editor.foreground': '#FFFFFF',
        'editor.background': '#212121',
        'editor.cursor': '#FFFFFF',
        'editor.lineHighlightBackground': '#212121',
        'editorLineNumber.foreground': '#FFFFFF',
        'editorSuggestWidget.background': '#6b6b6b',
        'editorSuggestWidget.foreground': '#FFFFFF'
        // And more colors. See https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecolordata.html
      }
    });
  }

function CodeEditor() {
    const [code, setCode] = useState("// Your initial C# code here");
  
  
    const handleEditorChange = (newValue, e) => {
      setCode(newValue);
    };
  
    const options = {
      selectOnLineNumbers: true,
      renderIndentGuides: true,
      colorDecorators: true,
      cursorBlinking: 'blink',
      autoClosingQuotes: 'always',
      find: {
        autoFindInSelection: 'always',
      },
      snippetSuggestions: 'inline',
    };
  
    return (
      <EditorWrapper>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={code}
          theme="myCustomTheme"
          options={options}
          onChange={handleEditorChange}
          beforeMount={handleEditorWillMount}
        />
      </EditorWrapper>
    );
  }
  
  export default CodeEditor;


const EditorWrapper = styled.div`
    height:100%;
    width:100%;
    border-radius:5px;

    .monaco-editor {
        border-radius: 190px;  // Adjust this value to your preference
      }
`;
