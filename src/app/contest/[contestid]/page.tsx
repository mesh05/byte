"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Contest({ params }: any) {
  const [contest, setContest]: any = useState([]);
  const [problemSet, setProblemSet]: any = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios.get(`/api/contests/${params.contestid}`).then((res) => {
      if (res.data.contest) {
        setContest(res.data.contest);
        setProblemSet(res.data.problem_set);
      }
    });
  }, []);
  return (
    <div>
      <div>Contest {params.contestid}</div>
      <div>{JSON.stringify(contest)}</div>
      <br></br>
      Problem Statements
      <br></br>
      {problemSet.map((problem: any) => {
        return (
          <div key={problem.problem_id}>
            <p>
              {problem.problem_id}) {problem.problem_title}
            </p>
            <button
              onClick={() =>
                router.push(
                  `/contest/${contest.contest_id}/${problem.contest_problem_id}`
                )
              }
            >
              Solve
            </button>
          </div>
        );
      })}
    </div>
  );
}
