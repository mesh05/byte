import { useRecoilState } from "recoil";
import { recoilProblem } from "../recoil/atom";
import { useRef, useState } from "react";
import { TextArea } from "./TextArea";

export function Output({ output }: any) {
  const outputRef = useRef(null);
  const [problem, setProblem]: any = useRecoilState(recoilProblem);
  const [firstRun, setFirstRun] = useState(true);
  console.log(problem.problem_output);
  console.log(output.run.output);

  return (
    <div style={{ minHeight: "20vh" }}>
      {/* TODO: Write a proper comparison component for the output */}
      {problem.problem_output === output.run.output.trim("\n")
        ? "Correct"
        : "Incorrect"}
      <br></br>
      OUTPUT:
      <br></br>
      <TextArea value={output.run.output} ref={outputRef} />
      {/* {selectedLanguage} */}
    </div>
  );
}
