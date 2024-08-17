import { NextRequest, NextResponse } from "next/server";
import getConnection from "@/components/db/db";

async function handler(
  req: NextRequest,
  { params }: { params: { problem_id: string } },
  res: NextResponse
) {
  const conn = await getConnection();
  const problem: any = await conn.query(
    `SELECT c.contest_problem_id, c.problem_id, p.problem_title, p.problem_description, 
            p.problem_difficulty, p.problem_test_case, p.problem_output 
     FROM problems AS p 
     INNER JOIN contest_problems AS c 
     ON c.problem_id = p.problem_id 
     WHERE c.contest_problem_id = $1`,
    [params.problem_id]
  );
  console.log(problem);
  if (problem.rows.length === 0)
    return NextResponse.json({ status: "400", error: "Problem not found" });
  return NextResponse.json({ status: "success", problem: problem.rows[0] });
}

export { handler as GET };
