import CredentialsProvider from "next-auth/providers/credentials";
import getConnection from "../db/db";
import { pages } from "next/dist/build/templates/app-page";
import { signIn } from "next-auth/react";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        const conn = await getConnection();
        // Add logic here to look up the user from the DB
        const loginDetails = req.body;
        if (loginDetails) {
          const queryText = `
              SELECT id, username, email, contest_id
              FROM auth_user
              WHERE username = $1 AND password = $2
            `;
          const queryValues = [loginDetails.username, loginDetails.password];
          const result = await conn.query({
            text: queryText,
            values: queryValues,
          });

          const user: User = result.rows[0];
          if (user) {
            return user;
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }): Promise<JWT> {
      if (user) {
        return {
          ...token,
          user: user,
        };
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      return {
        ...session,
        user: token.user,
      };
    },
  },
  pages: {
    signIn: "/",
  },
};
