import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useState } from "react";

const extensions = [javascript({ jsx: true })];

export default function EditorPage() {
  const [code, setCode] = useState("console.log('hello world!');");
  return (
    <>
      <CodeMirror
        value={code}
        width="750px"
        height="650px"
        theme={vscodeDark}
        extensions={extensions}
        onChange={(editor, change) => {
          setCode(editor);
          console.log(editor);
        }}
      />
    </>
  );
}
