"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Contest({ params }: any) {
  const [contest, setContest]: any = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios.get(`/api/contests/${params.contestid}`).then((res) => {
      if (res.data.contest) {
        setContest(res.data.contest);
      }
    });
  }, []);
  return (
    <div>
      <div>Contest {params.contestid}</div>
      <div>{JSON.stringify(contest)}</div>
      Problem Statements
      <button onClick={() => router.push(`/contest/${contest.contest_id}/1`)}>
        problem 1
      </button>
      
    </div>
  );
}
