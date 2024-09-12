import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";
import { contestTable } from "@/db/schema";

export async function GET(req: NextRequest, res: NextResponse) {
  const result = await db.select().from(contestTable);
  return NextResponse.json({ status: "success", contests: result });
}
