import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authOptions } from "./components/auth/authOptions";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/contests/:path*", "/contest/:path*"] };
