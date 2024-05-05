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
  const problem_set: any = await conn.query(
    "SELECT c.problem_id,p.problem_title,c.contest_problem_id FROM problems as p inner join contest_problems as c on c.problem_id=p.problem_id where contest_id=?",
    [contestid]
  );
  if (contest) {
    // If contest exists then its problem set will definitely exist(maybe)
    return NextResponse.json({
      status: "success",
      contest: contest[0][0],
      problem_set: problem_set[0],
    });
  }
  // return NextResponse.json({ status: "error", message: "Contest not found" });
}
