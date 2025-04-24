'use client';

import React from 'react'
import Video from '@/components/generation/Video'
import { useSearchParams } from 'next/navigation'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function GenerationContent() {
  const searchParams = useSearchParams()
  const videoParam = searchParams.get('video')
  const videoData = videoParam ? JSON.parse(decodeURIComponent(videoParam)) : null

  return (
    <div className="container mx-auto py-10">
      <Breadcrumbs currentPage="Video Generation" />
      {videoData ? (
        <div>
          <h1 className="text-3xl font-bold mb-8">{videoData.title}</h1>
          <Video videoData={videoData} />
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">No video selected</h1>
          <p>Please select a video from the home page to generate content.</p>
        </div>
      )}
    </div>
  )
}

function Page() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    router.push('/');
    return null;
  }

  return <GenerationContent />;
}

export default Page