"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { recoilProblemSet } from "@/components/recoil/atom";

// TODO: Fix the contest problem and normal prolem bug (Use recoil)

export default function Contest({ params }: { params: { contestid: string } }) {
  const [contest, setContest] = useState<ContestProp>();
  const [problemSet, setProblemSet] = useRecoilState<any[]>(recoilProblemSet);
  // const [problemSet, setProblemSet] = useState<ContestProblemProp[]>([]);
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
        {problemSet.map((problem: any) => {
          return (
            <div key={problem.id}>
              <p>{problem.title}</p>
              <button
                className="btn bg-yellow-500 hover:bg-yellow-600 text-white"
                onClick={() => {
                  router.push(
                    `/contest/${contest.id}/${problem.contestProblemId}`,
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
