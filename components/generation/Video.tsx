'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import TranscriptDisplay from './TranscriptDisplay'

interface VideoData {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  videoUrl: string;
}

interface VideoProps {
  videoData: VideoData;
}

function Video({ videoData }: VideoProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  const handleGenerate = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // First, download the video using the existing yt_downloader.py script
      const downloadResponse = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl: videoData.videoUrl }),
      });

      if (!downloadResponse.ok) {
        throw new Error('Failed to download video');
      }

      const { videoPath } = await downloadResponse.json();

      // Then, process the video with Whisper AI
      const whisperResponse = await fetch('/api/whisper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoPath }),
      });

      if (!whisperResponse.ok) {
        throw new Error('Failed to process video with Whisper');
      }

      const { transcript } = await whisperResponse.json();
      setTranscript(transcript);
      setShowTranscript(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {videoData.thumbnailUrl && (
        <div className="relative w-full max-w-2xl aspect-video">
          <Image
            src={videoData.thumbnailUrl}
            alt={videoData.title}
            fill
            quality={100}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">{videoData.title}</h2>
        <button
          onClick={handleGenerate}
          disabled={isProcessing}
          className="text-purple-500 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Generate New Video'}
        </button>
      </div>
      {error && (
        <div className="text-red-500 mt-2">
          {error}
        </div>
      )}
      {transcript && showTranscript && (
        <TranscriptDisplay
          transcript={transcript}
          onClose={() => setShowTranscript(false)}
        />
      )}
    </div>
  )
}

export default Video