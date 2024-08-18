import CredentialsProvider from "next-auth/providers/credentials";
import getConnection from "../db/db";
import { pages } from "next/dist/build/templates/app-page";
import { signIn } from "next-auth/react";

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
        if (req.body) {
            const queryText = `
              SELECT id, username, email, contest_id 
              FROM auth_user 
              WHERE username = $1 AND password = $2
            `;
          const queryValues = [req.body.username, req.body.password];
          const result = await conn.query({
            text: queryText,
            values: queryValues,
          });
          conn.release();
          const user = result.rows[0];
          if (user) {
            return {
              id: user.id,
              name: user.username,
              email: user.email,
              contest: user.contest_id,
            };
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          contest: user.contest,
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          email: token.email,
          contest: token.contest,
        },
      };
    },
  },
  pages: {
    signIn:"/"
  }
};
