'use client';

import React from 'react';

interface TranscriptDisplayProps {
  transcript: string;
  onClose: () => void;
}

export default function TranscriptDisplay({ transcript, onClose }: TranscriptDisplayProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-4xl mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="bg-black p-8 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Video Transcript</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-white whitespace-pre-wrap leading-relaxed">
              {transcript}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 