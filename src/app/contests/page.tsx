"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Contests() {
  const [contests, setContests] = useState<ContestProp[]>([]);
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/contests").then((res) => {
      if (res.data) {
        setContests(res.data.contests);
      }
    });
  }, []);
  return (
    <div>
      <h2>Contests</h2>
      {contests.map((contest: ContestProp) => {
        return (
          <div key={contest.contest_id}>
            Contest name: {contest.contest_name}
            <button
              onClick={() => router.push(`/contest/${contest.contest_id}`)}
            >
              Attempt
            </button>
            <br></br>
            <div>Status: {contest.status}</div>
            <br></br>
          </div>
        );
      })}
    </div>
  );
}
