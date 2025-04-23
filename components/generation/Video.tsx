'use client';

import React from 'react'
import Image from 'next/image'

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
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 hover:text-purple-600"
        >
          Generate New Video
        </a>
      </div>
      <div className="text-center">
        
      </div>
    </div>
  )
}

export default Video