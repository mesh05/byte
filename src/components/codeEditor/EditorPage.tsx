import CodeMirror from "@uiw/react-codemirror";
import { javascriptLanguage } from "@codemirror/lang-javascript";
// import { cppLanguage } from "@codemirror/lang-cpp";
// import { javaLanguage } from "@codemirror/lang-java";
// import { pythonLanguage } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useState } from "react";
import axios from "axios";
import LanguageSelector from "./LanguageSelector";
import { useRecoilState, useRecoilValue } from "recoil";
import { recoilLanguage } from "../recoil/atom";
import { version } from "os";

export default function EditorPage() {
  // function changeLang(){
  //   setSelectedLanguage()
  // }

  const [language, setLanguage]: any = useRecoilState(recoilLanguage);
  const [selectedLanguage, setSelectedLanguage] = useState("c");
  const [code, setCode] = useState(language[selectedLanguage].code);
  const [output, setOutput] = useState({ run: { output: "" } });
  let extensions = [language[selectedLanguage].lang];

  return (
    <>
      <div>
        <LanguageSelector
          setSelectedLanguage={setSelectedLanguage}
          setCode={setCode}
        />
        <button
          onClick={() => {
            axios
              .post("/api/run", { language: selectedLanguage, code: code })
              .then((res) => {
                console.log(res.data);
                setOutput(res.data.output);
              });
          }}
        >
          RUN
        </button>
        <button>SUBMIT</button>
        <CodeMirror
          value={code}
          width="750px"
          height="500px"
          theme={vscodeDark}
          extensions={extensions}
          style={{ fontSize: 18 }}
          onChange={(editor, change) => {
            setCode(editor);
          }}
        />
        <br></br>
        <br></br>
        OUTPUT:<br></br>
        {output.run.output}
        {/* {selectedLanguage} */}
      </div>
    </>
  );
}
