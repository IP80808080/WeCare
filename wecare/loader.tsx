import React from "react";
import "@/app/globals.css";

interface LoaderProps {
  isLoading: boolean;
}
const Loader = ({ isLoading }: LoaderProps) => {
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
