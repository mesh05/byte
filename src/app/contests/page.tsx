"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Contests() {
  const [contests, setContests] = useState([]);
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
      {contests.map((contest) => {
        return (
          <div key={contest.contest_id}>
            Contest name:{" "}
            <button
              onClick={() => router.push(`/contest/${contest.contest_id}`)}
            >
              {contest.contest_name}
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
