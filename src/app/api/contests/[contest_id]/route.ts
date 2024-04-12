import conn from "@/components/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { contest_id: string } },
  res: NextApiResponse
) {
  const contestid = params.contest_id;
  const contest: any = await conn.query(
    "SELECT * FROM contest where contest_id = ?",
    [contestid]
  );
  if (contest) {
    return NextResponse.json({ status: "success", contest: contest[0][0] });
  }
  // return NextResponse.json({ status: "error", message: "Contest not found" });
}
