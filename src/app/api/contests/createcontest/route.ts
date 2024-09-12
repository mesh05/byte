import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { contestTable } from "@/db/schema";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const {
    contest_title,
    contest_start_time,
    contest_end_time,
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
    });
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}