import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const code = data.code;
  console.log(code);
  return NextResponse.json({ status: "successfully received code" });
}
