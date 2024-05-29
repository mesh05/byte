import { useRecoilState } from "recoil";
import { recoilProblem } from "../recoil/atom";
import { useState } from "react";

export function Output({ output }: any) {
  const [problem, setProblem]: any = useRecoilState(recoilProblem);
  const [firstRun, setFirstRun] = useState(true);
  return (
    <div style={{ minHeight: "20vh" }}>
      {/* TODO: Write a proper comparison function for the output */}
      {problem.problem_output === output.run.output ? "Correct" : "Incorrect"}
      <br></br>
      OUTPUT:
      <br></br>
      <textarea
        readOnly
        style={{ resize: "none", height: "auto" }}
        value={output.run.output}
      ></textarea>
      <textarea
        readOnly
        style={{ resize: "none", height: "auto" }}
        value={problem.problem_output}
      ></textarea>
      {/* {selectedLanguage} */}
    </div>
  );
}
