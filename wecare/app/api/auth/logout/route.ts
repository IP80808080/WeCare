import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  response.cookies.set({
    name: "token",
    value: "",
    expires: new Date(0),
    path: "/",
  });

  response.headers.set("Set-Session-Token", "");

  response.headers.set("Set-Local-Token", "");

  return response;
}
