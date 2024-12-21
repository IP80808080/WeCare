"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4 overflow-hidden">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-6xl md:text-7xl font-bold text-blue-600 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Oops! This page seems to be feeling under the weather.
        </motion.p>
        <motion.div
          className="w-64 h-64 md:w-96 md:h-96 mx-auto mb-8 relative"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Background circle */}
            <circle cx="100" cy="100" r="90" fill="#E0F2FE" />
            {/* Doctor body */}
            <rect x="70" y="80" width="60" height="80" fill="#60A5FA" rx="30" />
            <circle cx="100" cy="60" r="30" fill="#F3F4F6" />
            {/* Face */}
            <circle cx="90" cy="55" r="5" fill="#1E40AF" /> {/* Left eye */}
            <circle cx="110" cy="55" r="5" fill="#1E40AF" /> {/* Right eye */}
            <motion.path
              d="M85 70 Q100 80 115 70"
              stroke="#1E40AF"
              strokeWidth="3"
              fill="none"
              animate={{
                d: [
                  "M85 70 Q100 80 115 70",
                  "M85 75 Q100 85 115 75",
                  "M85 70 Q100 80 115 70",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 500,
                ease: "easeInOut",
              }}
            />{" "}
            {/* Smile */}
            {/* Stethoscope */}
            <motion.path
              d="M70 100 Q60 110 70 120 T90 130"
              stroke="#1E40AF"
              strokeWidth="3"
              fill="none"
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.circle
              cx="90"
              cy="130"
              r="5"
              fill="#1E40AF"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            />
            {/* Clipboard */}
            <motion.rect
              x="120"
              y="90"
              width="30"
              height="40"
              fill="#F3F4F6"
              stroke="#60A5FA"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
            <motion.path
              d="M125 100 L145 100 M125 110 L145 110 M125 120 L135 120"
              stroke="#60A5FA"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            />
            {/* Floating pills */}
            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={i}
                cx={40 + i * 30}
                cy={160 + (i % 2) * 20}
                r="5"
                fill={i % 2 === 0 ? "#EF4444" : "#10B981"}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  y: { repeat: Infinity, duration: 2, delay: i * 0.2 },
                  rotate: { repeat: Infinity, duration: 3, delay: i * 0.2 },
                }}
              />
            ))}
          </svg>
        </motion.div>
        <motion.p
          className="text-lg md:text-xl text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Don&#39;t worry! Our digital doctor is on the case.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/login" passHref>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              aria-label="Go to login page"
            >
              Return to Health (Login)
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
