"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  CheckCircle,
  AlertCircle,
  FilePlus,
  FileQuestion,
  Activity,
  Heart,
  Stethoscope,
} from "lucide-react";

export default function PendingApproval() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");

  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
    setUploadStatus("idle");
    setTimeout(() => {
      setUploadStatus(Math.random() > 0.5 ? "success" : "error");
    }, 2000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "application/pdf": [] },
    maxFiles: 1,
  });

  const floatingSvgs = [
    { Icon: Heart, color: "#FF6B6B" },
    { Icon: Activity, color: "#4ECDC4" },
    { Icon: Stethoscope, color: "#45B7D1" },
    { Icon: FilePlus, color: "#FFA07A" },
    { Icon: FileQuestion, color: "#98D8C8" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-800 to-white relative overflow-hidden">
      {floatingSvgs.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <item.Icon size={32} color={item.color} opacity={0.3} />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-2xl bg-gray-900 shadow-2xl relative z-10"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Welcome, Doctor!
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Please upload your credentials or license for verification
        </p>

        <motion.div
          {...getRootProps()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors duration-300 ${
            isDragActive
              ? "border-purple-500 bg-purple-500 bg-opacity-10"
              : "border-gray-600 hover:border-purple-500"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-purple-500 mb-4" />
          <p className="text-gray-300">
            {isDragActive
              ? "Drop your file here"
              : "Drag 'n' drop your file here, or click to select"}
          </p>
        </motion.div>

        {file && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-gray-800 rounded-lg"
          >
            <p className="text-sm text-gray-300 truncate">{file.name}</p>
          </motion.div>
        )}

        {uploadStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-green-800 bg-opacity-30 rounded-lg flex items-center"
          >
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-500">
              Upload successful! We&#39;ll review your documents shortly.
            </p>
          </motion.div>
        )}

        {uploadStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-800 bg-opacity-30 rounded-lg flex items-center"
          >
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-500">
              Upload failed. Please try again or contact support.
            </p>
          </motion.div>
        )}

        <div className="mt-8">
          <motion.svg
            width="100%"
            height="8"
            viewBox="0 0 400 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.rect
              width="0%"
              height="8"
              rx="4"
              fill="url(#gradient)"
              animate={{ width: uploadStatus === "idle" ? "0%" : "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient
                id="gradient"
                x1="0"
                y1="0"
                x2="400"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#D946EF" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>

        <h5 className="mt-6 text-sm text-gray-400 text-center">
          Wait for Admin to Verify it{" "}
          <p className="text-purple-400 ">You will get to know via Email</p>
        </h5>
      </motion.div>
    </div>
  );
}
