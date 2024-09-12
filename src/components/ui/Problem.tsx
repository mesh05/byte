"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { recoilProblem, recoilProblemSet } from "../recoil/atom";
import { TextArea } from "@/components/ui/TextArea";

// TODO: Make this a server side rendered page (if thats possible)

export function Problem(params: any) {
  const router = useRouter();
  const testCaseRef = useRef(null);
  const testOutputRef = useRef(null);

  if (!params.problem) return <div>Loading...</div>;

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
        {params.problem.title}
      </h1>
      <p>{params.problem.description}</p>
      <br></br>
      Test Case:
      <br></br>
      <TextArea value={params.problem.testCase} ref={testCaseRef} />
      <br></br>
      Output:
      <br></br>
      <TextArea value={params.problem.output} ref={testOutputRef} />
    </div>
  );
}
