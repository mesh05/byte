import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/db/db";
import { pages } from "next/dist/build/templates/app-page";
import { signIn } from "next-auth/react";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import { userTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        // Add logic here to look up the user from the DB
        const loginDetails = req.body;

        if (loginDetails) {
          const user = await db
            .select({
              id: userTable.id,
              username: userTable.username,
              email: userTable.email,
            })
            .from(userTable)
            .where(
              and(
                eq(loginDetails.username, userTable.username),
                eq(loginDetails.password, userTable.password),
              ),
            );
          if (user[0]) {
            return user[0];
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
