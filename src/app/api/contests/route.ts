import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import conn from "@/components/db/db";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const contests = await conn.query("SELECT * FROM contest");
  return NextResponse.json({ status: "success", contests: contests[0] });
}
