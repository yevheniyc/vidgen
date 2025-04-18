"use server";

import { getTrendingMusicVideos } from "@/lib/youtube";

// Define the shape of the data returned by the action
// Matches the YouTubeVideo interface in youtube.ts
export interface TrendingVideoData {
  id: string;
  title: string;
  views: number | string;
  likes: number | string;
  thumbnailUrl: string | null;
  publishedAt: string;
}

export async function fetchTrendingMusicVideos(): Promise<{
  data: TrendingVideoData[] | null;
  error: string | null;
}> {
  try {
    const videos = await getTrendingMusicVideos();
    return { data: videos, error: null };
  } catch (error) {
    console.error("Server action error fetching videos:", error);
    // Return a generic error message to the client
    return {
      data: null,
      error: "Failed to fetch trending videos. Please check server logs.",
    };
  }
}
