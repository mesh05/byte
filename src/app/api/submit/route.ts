import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { stdin } from "process";
import conn from "@/components/db/db";

const LANG: any = {
  c: "10.2.0",
  "c++": "10.2.0",
  java: "15.0.2",
  python: "3.12.0",
};

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const code = data.code;
  const language = data.language;
  const hidden_case: any = await conn.query(
    "SELECT c.problem_id,p.hidden_test,p.hidden_output FROM problems as p join contest_problems as c ON c.problem_id=p.problem_id WHERE c.problem_id=?",
    [data.problem_id]
  );
  const hidden_test_case = hidden_case[0][0].hidden_test;
  const output = await axios.post("http://localhost:2000/api/v2/execute", {
    language: language,
    version: LANG[language],
    files: [
      {
        content: code,
      },
    ],
    stdin: hidden_test_case,
  });
  if (output.data.run.output === hidden_case[0][0].hidden_output) {
    return NextResponse.json({
      status: "successfully received code",
      result: "correct",
    });
  } else {
    return NextResponse.json({
      status: "successfully received code",
      result: "incorrect",
    });
  }
}
//   return NextResponse.json({
//     status: "successfully received code",
//     output: output.data,
//   });
