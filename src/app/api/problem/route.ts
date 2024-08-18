import { NextRequest, NextResponse } from "next/server";
import getConnection from "@/components/db/db";

export async function GET(req: NextRequest, res: NextResponse) {
    console.log("GET request received");
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM problems");
  return NextResponse.json({ status: "success", problems: result.rows });
}