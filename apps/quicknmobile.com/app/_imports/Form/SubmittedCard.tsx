import React from "react";

interface SubmittedCardProps {
  onDismiss?: () => void;
}

export default function SubmittedCard({ onDismiss }: SubmittedCardProps) {
  return (
    <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-bg-light/85 backdrop-blur-md shadow-primary text-center transition-all duration-300">
      {/* Visual Success Indicator (Custom Checkmark SVG) */}
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-highlight/10 mb-6">
        <svg
          className="h-10 w-10 text-primary animate-pulse"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.75"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <span className="absolute inline-flex h-full w-full rounded-full bg-highlight/5 opacity-75 animate-ping" />
      </div>

      {/* Main Header Message */}
      <h2 className="text-2xl font-sans font-bold text-primary tracking-tight mb-3">
        Your Request Has Been Submitted!
      </h2>

      {/* Instructional Description (Custom Chat Message SVG) */}
      <div className="flex items-start justify-center gap-2.5 text-secondary font-sans text-sm mb-8 max-w-xs mx-auto text-left">
        <svg
          className="h-5 w-5 shrink-0 opacity-80 mt-0.5 text-highlight"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.75"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
        <p className="leading-relaxed">
          Expect a text message to confirm a date shortly.
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={onDismiss}
        className="w-full py-3 px-4 font-sans font-medium text-sm text-bg-dark bg-primary rounded-xl hover:bg-highlight focus:outline-hidden focus:ring-2 focus:ring-border transition-colors shadow-xs cursor-pointer"
      >
        Got it, thanks
      </button>

      {/* Subtle Transmission Flag */}
      <div className="mt-5 text-[10px] font-mono text-secondary/30 tracking-widest uppercase">
        Transmission Success • encrypted
      </div>
    </div>
  );
}
