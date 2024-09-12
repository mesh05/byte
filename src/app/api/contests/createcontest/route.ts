import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { contestTable,contestProblemTable } from "@/db/schema";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const {
    contest_title,
    contest_start_time,
    contest_end_time,
    contest_problems,
    user_id,
  } = data;

  const startTime = new Date(contest_start_time);
  const endTime = new Date(contest_end_time);

  try {
    const result = await db.insert(contestTable).values({
      name: contest_title,
      status: 'Upcoming',
      creatorId: user_id,
      startTime: startTime,
      endTime: endTime,
    }).returning({ contest_id: contestTable.id});
    console.log(result)
    const contest_id = result[0].contest_id;
    const contestProblemEntries = contest_problems.map((problem_id:number, index:number) => ({
      contestId: contest_id,
      problemId: problem_id,
      contestProblemId: index + 1,
    }));
    
    try {
      const result = await db.insert(contestProblemTable).values(contestProblemEntries);
      console.log(result);
    } catch (error) {
      console.error(`Error inserting problems into contest ${contest_id}:`, error);
      return NextResponse.json({ success: false, error: error });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}