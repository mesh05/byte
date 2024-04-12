"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Contest({ params }: any) {
  const [contest, setContest] = useState([]);
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
    </div>
  );
}
