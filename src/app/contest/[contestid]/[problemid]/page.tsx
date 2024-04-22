"use client";
import EditorPage from "@/components/codeEditor/EditorPage";
import axios from "axios";
import { useEffect } from "react";

// TODO: Add problem fetching

export default function Problem({ params }: any) {
  // useEffect(() => {
  //   axios.get(`/api/problem/${params.problemid}`).then((res) => {
  //     if (res.data.problem) {
  //       console.log(res.data.problem);
  //     }
  //   });
  // }, []);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>Problem {params.problemid}</div>
      <EditorPage />
    </div>
  );
}
