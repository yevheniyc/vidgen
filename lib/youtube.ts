import { google } from "googleapis";

// Define an interface for the video data we expect
interface YouTubeVideo {
  id: string;
  title: string;
  views: number | string; // View count can be large, string might be safer from API
  likes: number | string; // Like count can also be large
  thumbnailUrl: string | null; // Can be null if no thumbnail is available
  publishedAt: string;
  videoUrl: string; // Add video URL
}

export async function getTrendingMusicVideos(): Promise<YouTubeVideo[]> {
  if (!process.env.YOUTUBE_API_KEY) {
    throw new Error(
      "YouTube API key is missing. Please set YOUTUBE_API_KEY environment variable."
    );
  }

  try {
    const youtube = google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API_KEY,
    });

    const response = await youtube.videos.list({
      part: ["snippet", "statistics", "id"], // Include id, snippet for title/thumbnail, statistics for counts
      chart: "mostPopular",
      regionCode: "US", // You can change this to a different region if needed
      videoCategoryId: "10", // Category ID for Music
      maxResults: 100, // Fetch top 25 popular music videos
    });

    const videos =
      response.data.items?.map((item) => ({
        id: item.id ?? "", // Use nullish coalescing for safety
        title: item.snippet?.title ?? "No Title",
        views: item.statistics?.viewCount ?? 0,
        likes: item.statistics?.likeCount ?? 0,
        thumbnailUrl: item.snippet?.thumbnails?.default?.url ?? null, // Explicitly handle null case
        publishedAt: item.snippet?.publishedAt ?? "",
        videoUrl: `https://www.youtube.com/watch?v=${item.id}`, // Add YouTube video URL
      })) || [];

    return videos;
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    // In a real app, you might want more sophisticated error handling
    throw new Error("Failed to fetch trending music videos from YouTube.");
  }
}
