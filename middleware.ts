import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/lib/middleware";
import { ServerRuntime } from "next";

export const config = {
  matcher: "/app/:path*",
};
export const runtime: ServerRuntime = "experimental-edge";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  const sessionRes = await supabase.auth.getSession();
  console.log(request.url);
  const loginUrl = new URL("/login", request.url);

  if (sessionRes.error || sessionRes.data.session === null) {
    if (sessionRes.error) console.error("MIDDLEWARE ERROR ", sessionRes.error);

    loginUrl.searchParams.set(
      "error",
      sessionRes.error ? sessionRes.error.name : "LoggedOut"
    );
    return NextResponse.redirect(loginUrl);
  }

  return response;
}
