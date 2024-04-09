"use client";
import { SignIn } from "@/components/Signin";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  if (session.status === "loading")
    return <div>{JSON.stringify(session)}Loading...</div>;
  if (session.status === "authenticated")
    return (
      <div>
        {JSON.stringify(session)}
        <button
          onClick={() => {
            signOut();
          }}
        >
          Signout
        </button>
      </div>
    );
  return (
    <div>
      <div>{JSON.stringify(session)}</div>
      <SignIn />
    </div>
  );
}
