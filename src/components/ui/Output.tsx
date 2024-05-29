import { useRecoilState } from "recoil";
import { recoilProblem } from "../recoil/atom";
import { useState } from "react";
import autosize from "autosize";

export function Output({ output }: any) {
  const [problem, setProblem]: any = useRecoilState(recoilProblem);
  const [firstRun, setFirstRun] = useState(true);
  function autoSize() {
    autosize(document.querySelectorAll("textarea"));
  }
  return (
    <div style={{ minHeight: "20vh" }}>
      {/* TODO: Write a proper comparison function for the output */}
      {problem.problem_output === output.run.output ? "Correct" : "Incorrect"}
      <br></br>
      OUTPUT:
      <br></br>
      <textarea
        onLoad={autoSize}
        readOnly
        style={{ resize: "none", height: "auto" }}
        value={output.run.output}
      ></textarea>
      {/* {selectedLanguage} */}
    </div>
  );
}
