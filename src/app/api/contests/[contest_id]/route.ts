import getConnection from "@/components/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { contest_id: string } },
  res: NextApiResponse
) {
  console.log(params);
  const conn = await getConnection();
  const contestid = params.contest_id;
  const contest = await conn.query(
    "SELECT * FROM contest WHERE contest_id = $1",
    [contestid]
  );
  const problem_set = await conn.query(
    `SELECT c.problem_id, p.problem_title, c.contest_problem_id 
     FROM problems AS p 
     INNER JOIN contest_problems AS c 
     ON c.problem_id = p.problem_id 
     WHERE contest_id = $1`,
    [contestid]
  );
  if (contest) {
    // If contest exists then its problem set will definitely exist(maybe)
    return NextResponse.json({
      status: "success",
      contest: contest.rows[0],
      problem_set: problem_set.rows,
    });
  }
  // return NextResponse.json({ status: "error", message: "Contest not found" });
}
