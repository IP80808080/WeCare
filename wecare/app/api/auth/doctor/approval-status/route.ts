import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId } = req.query;

    const doctor = await db.doctor.findUnique({
      where: { userId: userId as string },
      select: { isApproved: true },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json({ isApproved: doctor.isApproved });
  } catch (error) {
    console.error("Error checking approval status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
