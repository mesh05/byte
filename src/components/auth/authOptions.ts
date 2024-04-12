import CredentialsProvider from "next-auth/providers/credentials";
import conn from "../db/db";

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
        if (req.body) {
          const user: any = await conn.query(
            "SELECT id,username,email,contest_id FROM auth_user WHERE username = ? AND password = ?",
            [req.body.username, req.body.password]
          );
          if (user) {
            return {
              id: user[0][0].id,
              name: user[0][0].username,
              email: user[0][0].email,
              contest: user[0][0].contest_id,
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
    signIn: "/",
  },
};
