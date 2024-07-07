import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

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
  const output = await axios.post("http://localhost:2000/api/v2/execute", {
    language: language,
    version: LANG[language],
    files: [
      {
        content: code,
      },
    ],
    stdin: data.stdin,
  });
  return NextResponse.json({
    status: "successfully received code",
    output: output.data,
  });
}
