import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import getConnection from "@/components/db/db";

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
  const conn = await getConnection();
    const result: any = await conn.query(
    `SELECT c.problem_id, p.hidden_test, p.hidden_output 
     FROM problems AS p 
     JOIN contest_problems AS c 
     ON c.problem_id = p.problem_id 
     WHERE c.problem_id = $1`,
    [data.problem_id]
  );
  const hidden_case= result.rows;
  const hidden_test_case = hidden_case[0].hidden_test;
  const data_to_send = {
    language: language,
    version: LANG[language],
    files: [
      {
        content: code,
      },
    ],
    stdin: hidden_test_case,
  };
  const output = await axios.post("http://54.252.187.225:2000/api/v2/execute", data_to_send);
  if (
    output.data.run.output.trim("\n") ===
    hidden_case[0].hidden_output.trim("\n")
  ) {
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
