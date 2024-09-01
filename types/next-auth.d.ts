import NextAuth, { User } from "next-auth";

declare module "next-auth" {
  interface DefaultUser {
    user: {
      id: string;
      username: string;
      email: string;
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
