import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const user = {
      id: payload.id,
      firstName: payload.firstName,
      role: payload.role,
    };

    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
