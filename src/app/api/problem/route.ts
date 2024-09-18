import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";
import { problemTable } from "@/db/schema";


export async function GET(req: NextRequest, res: NextResponse) {
  const result = await db.select().from(problemTable);
  return NextResponse.json({ status: "success", problems: result });
}
