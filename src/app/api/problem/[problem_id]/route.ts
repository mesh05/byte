import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";
import { contestProblemTable, problemTable } from "@/db/schema";
import { eq } from "drizzle-orm";

async function handler(
  req: NextRequest,
  { params }: { params: { problem_id: string } },
  res: NextResponse,
) {
  const problem = await db
    .select()
    .from(problemTable)
    .innerJoin(
      contestProblemTable,
      eq(contestProblemTable.problemId, problemTable.id),
    )
    .where(eq(contestProblemTable.contestProblemId, Number(params.problem_id)));
  const problemResult = {
    ...problem[0].problem,
    ...problem[0].contest_problem,
  };
  // const problem = await conn.query(
  //   `SELECT c.contest_problem_id, c.problem_id, p.problem_title, p.problem_description,
  //           p.problem_difficulty, p.problem_test_case, p.problem_output
  //    FROM problems AS p
  //    INNER JOIN contest_problems AS c
  //    ON c.problem_id = p.problem_id
  //    WHERE c.contest_problem_id = $1`,
  //   [params.problem_id],
  // );
  if (!problemResult)
    return NextResponse.json({ status: "400", error: "Problem not found" });
  return NextResponse.json({ status: "success", problem: problemResult });
}

export { handler as GET };
