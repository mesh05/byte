import CodeMirror from "@uiw/react-codemirror";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import { cppLanguage } from "@codemirror/lang-cpp";
import { javaLanguage } from "@codemirror/lang-java";
import { pythonLanguage } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useState } from "react";
import axios from "axios";
import LanguageSelector from "./LanguageSelector";
import { useRecoilState, useRecoilValue } from "recoil";
import { recoilLanguage } from "../recoil/atom";

// TODO: Add more languages

const Languages: any = {
  C: cppLanguage,
  "C++": cppLanguage,
  Java: javaLanguage,
  Python: pythonLanguage,
};

export default function EditorPage() {
  const [code, setCode] = useState("console.log('hello world!');");
  const language = useRecoilValue(recoilLanguage);
  let extensions = [Languages[language]];

  return (
    <>
      <div>
        <LanguageSelector />
        <CodeMirror
          value={code}
          width="750px"
          height="650px"
          theme={vscodeDark}
          extensions={extensions}
          style={{ fontSize: 18 }}
          onChange={(editor, change) => {
            setCode(editor);
          }}
        />
        <button
          onClick={() => {
            axios.post("/api/run", { code: code }).then((res) => {
              console.log(res.data);
            });
          }}
        >
          RUN
        </button>
        <button>SUBMIT</button>
        {language}
      </div>
    </>
  );
}
