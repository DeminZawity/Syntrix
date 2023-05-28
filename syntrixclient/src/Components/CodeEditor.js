import React, {useState,useEffect} from "react";
import styled from "styled-components";
import Editor, { loader } from '@monaco-editor/react';
import { Container, Spacer, TextField } from "../UI/Models";


function handleEditorWillMount(monaco) {
    monaco.editor.defineTheme('DeminTheme', {
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

function CodeEditor(props) {
    const [code, setCode] = useState(props.content ? props.content : null);
    const [codeLang, setCodeLang] = useState(null)
  
    const handleEditorChange = (newValue, e) => {
      setCode(newValue);
      props.onChange(newValue)
    };
  



    const CodeLanguage = (language) => {


      if(language.toLowerCase() == "javascript") {
        return("javascript")
      } else if(language.toLowerCase() == "typescript"){
        return("typescript")
      } else if(language.toLowerCase() == "json"){
        return("json")
      } else if(language.toLowerCase() == "html"){
        return("html")
      } else if(language.toLowerCase() == "css"){
        return("css")
      } else if(language.toLowerCase() == "scss"){
        return("scss")
      } else if(language.toLowerCase() == "less"){
        return("less")
      } else if(language.toLowerCase() == "csharp" || language == "C#" || language == "c#"){
        return("csharp")
      } else if(language.toLowerCase() == "cpp" || language == "C++" || language == "c++"){
        return("cpp")
      } else if(language.toLowerCase() == "markdown"){
        return("markdown")
      } else if(language.toLowerCase() == "python"){
        return("python")
      } else if(language.toLowerCase() == "php"){
        return("php")
      } else if(language.toLowerCase() == "java"){
        return("java")
      } else if(language.toLowerCase() == "powershell"){
        return("powershell")
      } else if(language.toLowerCase() == "powerrshell"){
        return("r")
      } else if(language.toLowerCase() == "go"){
        return("go")
      } else if(language.toLowerCase() == "ruby"){
        return("ruby")
      } else if(language.toLowerCase() == "swift"){
        return("swift")
      } else if(language.toLowerCase() == "objective-c" || language == "objectivec"){
        return("objective-c")
      } else if(language.toLowerCase() == "sql"){
        return("sql")
      } else if(language.toLowerCase() == "yaml"){
        return("yaml")
      } else if(language.toLowerCase() == "xml"){
        return("xml")
      } else if(language.toLowerCase() == "dockerfile"){
        return("dockerfile")
      } else if(language.toLowerCase() == "handlebars"){
        return("handlebars")
      } else if(language.toLowerCase() == "fsharp" || language == "F#" || language == "f#"){
        return("csharp")
      } else if(language.toLowerCase() == "kotlin"){
        return("kotlin")
      } else if(language.toLowerCase() == "perl"){
        return("perl")
      } else if(language.toLowerCase() == "rust"){
        return("rust")
      } else if(language.toLowerCase() == "groovy"){
        return("groovy")
      } else {
        return(false)
      }

    }



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
          defaultLanguage={CodeLanguage(props.type)}
          defaultValue={code}
          theme="DeminTheme"
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
