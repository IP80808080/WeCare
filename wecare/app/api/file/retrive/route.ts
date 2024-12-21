import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { documentId } = req.query;

    if (!documentId) {
      return res.status(400).json({ message: "Missing documentId" });
    }

    // Fetch document from database
    const document = await db.document.findUnique({
      where: { id: documentId as string },
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Generate signed URL for document
    const { data, error } = await supabase.storage
      .from("documents")
      .createSignedUrl(document.fileUrl, 60); // URL valid for 60 seconds

    if (error) throw error;

    res.status(200).json({ signedUrl: data.signedUrl });
  } catch (error) {
    console.error("Error retrieving document:", error);
    res.status(500).json({ message: "Error retrieving document" });
  }
}
