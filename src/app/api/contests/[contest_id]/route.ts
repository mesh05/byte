import db from "@/db/db";
import { contestProblemTable, contestTable, problemTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
 
export async function GET(
  req: NextApiRequest,
  { params }: { params: { contest_id: string } },
  res: NextApiResponse,
) {
  const contestid = params.contest_id;
  const contest = await db
    .select()
    .from(contestTable)
    .where(eq(contestTable.id, contestid));
  const problemSetResult = await db
    .select()
    .from(problemTable)
    .leftJoin(
      contestProblemTable,
      eq(problemTable.id, contestProblemTable.problemId),
    )
    .where(eq(contestProblemTable.contestId, contestid))
    .orderBy(contestProblemTable.contestProblemId);
  var problemSet: any = [];
  problemSetResult.map((prob) => {
    const { problem, contest_problem } = prob;
    problemSet.push({ ...problem, ...contest_problem });
  });
  if (contest[0]) {
    // If contest exists then its problem set will definitely exist(maybe)
    return NextResponse.json({
      status: "success",
      contest: contest[0],
      problem_set: problemSet,
    });
  }
  // return NextResponse.json({ status: "error", message: "Contest not found" });
}
