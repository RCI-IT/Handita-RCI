"use client";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center w-full transition-all duration-300 font-mono text-2xl space-x-4">
      <span className="animate-spin ">⏳</span>
      <p>Loading...</p>
    </div>
  );
}
