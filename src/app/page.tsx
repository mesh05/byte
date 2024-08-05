"use client";
import { SignIn } from "@/components/ui/Signin";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// TODO: Decide the online judge to use
// TODO: Remove all "any" types (eventually)
// TODO: Work on UI
// TODO: Add loading components

export default function Home() {
  const session = useSession();
  const router = useRouter();
  if (session.status === "loading")
    return <div>{JSON.stringify(session)}Loading...</div>;
  if (session.status === "authenticated")
    return (
      <div>
        {JSON.stringify(session.data)}
        <br></br>
        <br></br>
        <button
          onClick={() => {
            signOut();
          }}
        >
          Signout
        </button>
        <br></br>
        <br></br>
        <button
          onClick={() => {
            router.push("/contests");
          }}
        >
          Contests
        </button>
      </div>
    );
  return (
    <div>
      <SignIn />
    </div>
  );
}
