"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Contest({ params }: { params: { contestid: string } }) {
  const [contest, setContest] = useState<ContestProp>();
  const [problemSet, setProblemSet] = useState<ProblemProp[]>([]);
  const router = useRouter();
  useEffect(() => {
    axios.get(`/api/contests/${params.contestid}`).then((res) => {
      if (res.data.contest) {
        setContest(res.data.contest);
        setProblemSet(res.data.problem_set);
      }
    });
  }, []);
  if (contest) {
    return (
      <div>
        <div>Contest {params.contestid}</div>
        <div>{JSON.stringify(contest)}</div>
        <br></br>
        Problem Statements
        <br></br>
        {problemSet.map((problem: ProblemProp) => {
          return (
            <div key={problem.problem_id}>
              <p>{problem.problem_title}</p>
              <button
                onClick={() => {
                  router.push(
                    `/contest/${contest.contest_id}/${problem.problem_id}`,
                  );
                }}
              >
                Solve
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
