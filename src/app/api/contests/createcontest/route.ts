import getConnection from "@/components/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const conn = await getConnection();
   const data = await req.json();
  const { contest_title, contest_start_time, contest_end_time, contest_problems, user_id } = data;
   
  const query = `
    INSERT INTO contest (
      contest_name, status, creator_user_id, start_time, end_time, date, contest_id
    ) VALUES (
      $1, 'upcoming', $4, $2, $3, CURRENT_DATE, gen_random_uuid()
    )
  `;
  try {
    const result=await conn.query(query, [
      contest_title,
      contest_start_time,
      contest_end_time,
      user_id,
    ]);
    console.log(result);
    const  get_new_contest_id = await conn.query(
        `SELECT contest_id FROM contest WHERE contest_name = $1 AND creator_user_id = $2`,
        [contest_title, user_id]
        );
    const contest_id = get_new_contest_id.rows[0].contest_id;
    for (let i = 0; i < contest_problems.length; i++) {
      const problem_id = contest_problems[i];
      const query = `
        INSERT INTO contest_problems (
          contest_id, problem_id, contest_problem_id
        ) VALUES (
          $1, $2, ${i + 1}
        )
      `;
      await conn.query(query, [contest_id, problem_id]);
    }

    return NextResponse.json({ status: 200, message: "Contest created successfully" });
  } catch (error) {
    console.error("Error creating contest:", error);
    return NextResponse.json({ status: 500, message: "Error creating contest" });
  } finally {
    conn.release();
  }
}