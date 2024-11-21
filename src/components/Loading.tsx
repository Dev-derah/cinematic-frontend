import React from "react";

interface LoadingProps {
  LoadingType?: "Page Load" | "Component Load";
}

export default function Loading({ LoadingType = "Page Load" }: LoadingProps) {
  return (
    <div
      className={`fixed flex justify-center items-center ${
        LoadingType === "Page Load" ? "h-screen w-screen" : "h-full w-full"
      } absolute left-0 top-0 z-20`}
    >
      {LoadingType === "Page Load" ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-[3px] border-b-[2px] border-red-500" />
          <p className="mt-4 text-white text-lg">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-[3px] border-b-[2px] border-red-500" />
        </div>
      )}
    </div>
  );
}
