// pages/api/doctors/update-document.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId, governmentIssuedIdDocument } = req.body;

    // Update the doctor's record with the document URL
    const updatedDoctor = await db.doctor.update({
      where: { userId: userId },
      data: { governmentIssuedIdDocument: governmentIssuedIdDocument },
    });

    return res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error("Error updating document:", error);
    return res.status(500).json({ message: "Error updating document" });
  }
}
