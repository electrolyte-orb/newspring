import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/middleware";

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);
    const { error } = await supabase.auth.getSession();

    if (error) console.error("MIDDLEWARE ERROR WITH GET_SESSION ", error);

    return response;
  } catch (e) {
    console.error("MIDDLEWARE ERROR ", e);

    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}
