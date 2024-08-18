"use client";
import ContestCreation from "@/components/contests/ContestCreation";
import { useSession } from "next-auth/react";
export default function ContestCreator() {
  return (
    <div>
      <ContestCreation />
    </div>
  );
}
