"use client";
import EditorPage from "@/components/codeEditor/EditorPage";
import { Problem } from "@/components/ui/Problem";
import Split from "react-split";
import "../../../globals.css";
import axios from "axios";

// TODO: Problem doesn't exist is handled client side....make it server side (maybe 404 page)

export default function Workspace({ params }: any) {
  return (
    <div style={{ height: "100vh" }}>
      {/* <div>NAVBAR</div> */}
      <Split
        className="split-horizontal"
        style={{ height: "100vh" }}
        sizes={[50, 50]}
      >
        <Problem problemid={params.problemid} />
        <EditorPage />
      </Split>
    </div>
  );
}
