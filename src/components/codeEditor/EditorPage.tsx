"use client";
import CodeMirror from "@uiw/react-codemirror";
import { javascriptLanguage } from "@codemirror/lang-javascript";
// import { cppLanguage } from "@codemirror/lang-cpp";
// import { javaLanguage } from "@codemirror/lang-java";
// import { pythonLanguage } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useState, useEffect } from "react";
import axios from "axios";
import LanguageSelector from "./LanguageSelector";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  recoilLanguage,
  recoilProblem,
  recoilProblemSet,
} from "../recoil/atom";
import { version } from "os";
import { Output } from "../ui/Output";
import Split from "react-split";
import "../../app/globals.css";

// TODO: remember the code for each language and problem

export default function EditorPage(params: any) {
  const [language, setLanguage]: any = useRecoilState(recoilLanguage);
  const [selectedLanguage, setSelectedLanguage] = useState("c");
  const [code, setCode] = useState(language[selectedLanguage].code);
  const [output, setOutput] = useState({ run: { output: "" } });
  const [problem, setProblem] = useRecoilState(recoilProblem);
  const problem_id = params.problem.contestProblemId;
  const contest_id = params.problem.contestId;
  let extensions = [language[selectedLanguage].lang];
  useEffect(() => {
    if (!localStorage.getItem("byte")) {
      localStorage.setItem("byte", `{"contest":{},"non_contest":{}}`);
    }
    const byteString = localStorage.getItem("byte");
    let byte;
    if (byteString) {
      byte = JSON.parse(byteString);
    }
    if (byte.contest[`${contest_id}-${problem_id}`]) {
      if (byte.contest[`${contest_id}-${problem_id}`][selectedLanguage]) {
        setCode(byte.contest[`${contest_id}-${problem_id}`][selectedLanguage]);
      }
    }
  }, [selectedLanguage, contest_id, problem_id]);
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
                const byteString = localStorage.getItem("byte");
                let byte;

                if (byteString) {
                  byte = JSON.parse(byteString);
                } else {
                  return;
                }
                if (
                  typeof byte.contest[`${contest_id}-${problem_id}`] ===
                  "undefined"
                ) {
                  byte.contest[`${contest_id}-${problem_id}`] = {};
                }
                byte.contest[`${contest_id}-${problem_id}`][selectedLanguage] =
                  editor;

                localStorage.setItem("byte", JSON.stringify(byte));
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
                stdin: problem.testCase,
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
                problem_id: problem.problemId,
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
