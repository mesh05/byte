"use client";

import { signIn, signOut } from "next-auth/react";
import { useState } from "react";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h2>Sign In</h2>
      <div>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="Username"
        />
        <br></br>
        <br></br>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Password"
        />
        <br></br>
        <br></br>
        <button
          onClick={() => {
            signIn("credentials", {
              username,
              password,
            });
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
