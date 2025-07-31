import { NextResponse } from "next/server";
import { fetchGitHubStats } from "@/lib/github";

export async function GET() {
  try {
    const stats = await fetchGitHubStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An internal error occurred",
      },
      { status: 500 }
    );
  }
}
