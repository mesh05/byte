"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Problem({ problemid }: any) {
  const [problem, setProblem]: any = useState(null);
  const router = useRouter();
  useEffect(() => {
    axios.get(`/api/problem/${problemid}`).then((res) => {
      try {
        if (res.data.problem) {
          setProblem(res.data.problem);
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
      >
        back
      </button>
      <h1 className="mb-4 font-bold leading-none tracking-tight lg:text-5xl">
        {problem.problem_title}
      </h1>
      <p>{problem.problem_description}</p>
    </div>
  );
}
