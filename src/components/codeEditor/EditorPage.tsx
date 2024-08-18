import CodeMirror from "@uiw/react-codemirror";
import { javascriptLanguage } from "@codemirror/lang-javascript";
// import { cppLanguage } from "@codemirror/lang-cpp";
// import { javaLanguage } from "@codemirror/lang-java";
// import { pythonLanguage } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useState,useEffect } from "react";
import axios from "axios";
import LanguageSelector from "./LanguageSelector";
import { useRecoilState, useRecoilValue } from "recoil";
import { recoilLanguage, recoilProblem } from "../recoil/atom";
import { version } from "os";
import { Output } from "../ui/Output";
import Split from "react-split";
import "../../app/globals.css";

// TODO: remember the code for each language and problem

export default function EditorPage({ problemid }: any) {
  const [language, setLanguage]: any = useRecoilState(recoilLanguage);
  const [selectedLanguage, setSelectedLanguage] = useState("c");
  const [code, setCode] = useState(language[selectedLanguage].code);
  const [output, setOutput] = useState({ run: { output: "" } });
  const [problem, setProblem]: any = useRecoilState(recoilProblem);
  let extensions = [language[selectedLanguage].lang];
  useEffect(() => {

    console.log(problem);
    console.log("fvgbhnjmk,l");
    if(localStorage.getItem(`code-${problem.problem_id}-${selectedLanguage}`)){
      setCode(localStorage.getItem(`code-${problem.problem_id}-${selectedLanguage}`));
    }
  }, [selectedLanguage]);
  return (
    <div style={{ height: "100vh" }}>
      <div>
        <LanguageSelector
          setSelectedLanguage={setSelectedLanguage}
          setCode={setCode}
        />

        <Split
          className="split-vertical"
          direction="vertical"
          minSize={60}
          sizes={[60, 40]}
          style={{ height: "94vh" }}
        >
          <div className="w-full overflow-auto">
            <CodeMirror
              value={code}
              theme={vscodeDark}
              extensions={extensions}
              style={{ fontSize: 18 }}
              minHeight="90vh"
              onChange={(editor, change) => {
                setCode(editor);
                localStorage.setItem(`code-${problem.problem_id}-${selectedLanguage}`, editor);
              }}
            />
          </div>
          <Output output={output} />
        </Split>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
          onClick={() => {
            axios
              .post("/api/run", {
                language: selectedLanguage,
                code: code,
                stdin: problem.problem_test_case,
              })
              .then((res) => {
                setOutput(res.data.output);
              });
          }}
        >
          RUN
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
          onClick={() => {
            axios
              .post("/api/submit", {
                language: selectedLanguage,
                code: code,
                problem_id: problem.problem_id,
              })
              .then((res) => {
                // TODO: Handle code submission
                window.alert(res.data.result);
              });
          }}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
