"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { recoilProblem } from "../recoil/atom";
import { TextArea } from "@/components/ui/TextArea";
// import autosize from "autosize";

// TODO: Make this a server side rendered page (if thats possible)

export function Problem({ problemid }: any) {
  const [problem, setProblem]: any = useRecoilState(recoilProblem);
  const router = useRouter();
  const testCaseRef = useRef(null);
  const testOutputRef = useRef(null);

  // function autoSize() {
  //   Array.from(document.querySelectorAll("textarea")).forEach(autosize);
  // }

  useEffect(() => {
    axios.get(`/api/problem/${problemid}`).then((res) => {
      try {
        if (res.data.problem) {
          console.log(res.data.problem.problem_test_case);
          setProblem(res.data.problem);
          // autoSize();
        } else {
          throw new Error("Problem doesn't exist");
        }
      } catch (err) {
        router.back();
      }
    });
  }, []);

  if (!problem) return <div>Loading...</div>;

  return (
    <div>
      <button
        onClick={() => {
          router.back();
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        back
      </button>
      <h1 className="mb-4 font-bold leading-none tracking-tight lg:text-5xl">
        {problem.problem_title}
      </h1>
      <p>{problem.problem_description}</p>
      <br></br>
      Test Case:
      <br></br>
      <TextArea value={problem.problem_test_case} ref={testCaseRef} />
      <br></br>
      Output:
      <br></br>
      <TextArea value={problem.problem_output} ref={testOutputRef} />
    </div>
  );
}
