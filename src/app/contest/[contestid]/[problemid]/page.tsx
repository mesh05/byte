"use client";
import EditorPage from "@/components/codeEditor/EditorPage";
import { Problem } from "@/components/ui/Problem";
import Split from "react-split";
import "../../../globals.css";
import axios from "axios";

export default function Workspace({ params }: any) {
  if(!localStorage.getItem("byte")){
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
        <Problem problemid={params.problemid} />
        <EditorPage problemid={params.problemid} contestid={params.contestid}/>
      </Split>
    </div>
  );
}
