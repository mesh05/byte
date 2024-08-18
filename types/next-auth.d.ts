import NextAuth, { User } from "next-auth";

declare module "next-auth" {
  interface DefaultUser {
    user: {
      id: number;
      username: string;
      email: string;
      contest_id: number;
    };
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
