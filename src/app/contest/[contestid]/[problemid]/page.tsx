"use client";
import EditorPage from "@/components/codeEditor/EditorPage";
import { Problem } from "@/components/ui/Problem";
import Split from "react-split";
import "../../../globals.css";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { recoilProblem } from "@/components/recoil/atom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Workspace({
  params,
}: {
  params: { problemid: number; contestid: string };
}) {
  const [problem, setProblem] = useState({});
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/problem/${params.contestid}/${params.problemid}`)
      .then((res) => {
        try {
          if (res.data.problem) {
            setProblem(res.data.problem);
          } else {
            throw new Error("Problem doesn't exist");
          }
        } catch (err) {
          // router.back();
        }
      });
  }, []);

  if (!localStorage.getItem("byte")) {
    localStorage.setItem("byte", `{"contest":{},"non_contest":{}}`);
  }
  return (
    <div style={{ height: "100vh" }}>
      {/* <div>NAVBAR</div> */}

      <Split
        className="split-horizontal"
        style={{ height: "100vh" }}
        sizes={[50, 50]}
      >
        <Problem problem={problem} />
        <EditorPage problem={problem} />
      </Split>
    </div>
  );
}
