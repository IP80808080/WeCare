import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/auth";
import { db } from "@/lib/db";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { file, userId, documentType } = req.body;

    if (!file || !userId || !documentType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("documents")
      .upload(
        `${userId}/${documentType}-${Date.now()}.pdf`,
        Buffer.from(file, "base64"),
        {
          contentType: "application/pdf",
        }
      );

    if (error) throw error;

    // Save document reference in database
    const document = await db.document.create({
      data: {
        userId,
        type: documentType,
        fileUrl: data.path,
      },
    });

    res
      .status(200)
      .json({ message: "Document uploaded successfully", document });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ message: "Error uploading document" });
  }
}
