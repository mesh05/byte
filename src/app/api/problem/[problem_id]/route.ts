import { NextRequest, NextResponse } from "next/server";
import conn from "@/components/db/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { problem_id: string } },
  res: NextResponse
) {
  const problem: any = await conn.query(
    "SELECT c.contest_problem_id,c.problem_id,p.problem_title,p.problem_description,p.problem_difficulty FROM problems as p inner join contest_problems as c on c.problem_id=p.problem_id where c.contest_problem_id=?",
    [params.problem_id]
  );
  if (problem[0].length === 0)
    return NextResponse.json({ status: "400", error: "Problem not found" });
  return NextResponse.json({ status: "success", problem: problem[0][0] });
}
