"use client";
import EditorPage from "@/components/codeEditor/EditorPage";
import axios from "axios";
import { useEffect, useState } from "react";

// TODO: Error when user tries to access a problem that doesnt exist

export default function Problem({ params }: any) {
  const [problem, setProblem]: any = useState({});
  useEffect(() => {
    axios.get(`/api/problem/${params.problemid}`).then((res) => {
      if (res.data.problem) {
        setProblem(res.data.problem);
      }
    });
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <h1>{problem.problem_title}</h1>
        <p>{problem.problem_description}</p>
      </div>
      <EditorPage />
    </div>
  );
}
