import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { db } from "./lib/db";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("user", JSON.stringify(payload));

    const path = req.nextUrl.pathname;
    const userId = payload.userId as string;
    const role = payload.role as string;

    if (!userId) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Function to check and update URL
    const checkAndUpdateUrl = (basePath: string) => {
      if (path.startsWith(basePath) && !path.includes(userId)) {
        const newUrl = new URL(
          `${basePath}/${userId}${path.slice(basePath.length)}`,
          req.url
        );
        return NextResponse.redirect(newUrl);
      }
      return null;
    };

    // Check and redirect based on role
    if (payload.role === "PATIENT") {
      const redirectResponse = checkAndUpdateUrl("/dashboard");
      if (redirectResponse) return redirectResponse;
      if (!path.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard/" + userId, req.url));
      }
    } else if (payload.role === "DOCTOR") {
      // const doctor = await db.doctor.findUnique({
      //   where: { userId: userId },
      //   select: { isApproved: true },
      // });
      // console.log("Doctor approval status:", doctor);

      // if (!doctor || !doctor.isApproved) {
      //   const redirectResponse = checkAndUpdateUrl("/pending-approval");
      //   if (redirectResponse) return redirectResponse;
      //   if (!path.startsWith("/pending-approval")) {
      //     return NextResponse.redirect(
      //       new URL("/pending-approval/" + userId, req.url)
      //     );
      //   }
      // }
      const redirectResponse = checkAndUpdateUrl("/doctor-dashboard");
      if (redirectResponse) return redirectResponse;
      if (!path.startsWith("/doctor-dashboard")) {
        return NextResponse.redirect(
          new URL("/doctor-dashboard/" + userId, req.url)
        );
      }
    } else if (payload.role === "ADMIN") {
      const redirectResponse = checkAndUpdateUrl("/admin-dashboard");
      if (redirectResponse) return redirectResponse;
      if (!path.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(
          new URL("/admin-dashboard/" + userId, req.url)
        );
      }
    } else {
      // If role is not recognized, redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (e) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/apis/:path*",
    "/admin-dashboard/:path*",
    "/doctor-dashboard/:path*",
    // "/pending-approval/:path*",
  ],
};
