'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchTrendingMusicVideos, TrendingVideoData } from "@/utils/actions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { YouTubeSearchResult } from "@/components/navbar/SearchBar";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

// Helper function to format date
function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    return "Invalid Date";
  }
}

// Helper function to format numbers
function formatNumber(num: number | string): string {
  try {
    const number = typeof num === "string" ? parseInt(num, 10) : num;
    if (isNaN(number)) return "N/A";
    return number.toLocaleString();
  } catch (e) {
    console.error("Error formatting number:", e);
    return "N/A";
  }
}

// Convert search result to trending video format
function convertSearchToTrendingFormat(searchResult: YouTubeSearchResult): TrendingVideoData {
  return {
    id: searchResult.id.videoId,
    title: searchResult.snippet.title,
    views: searchResult.statistics?.viewCount || "0",
    likes: searchResult.statistics?.likeCount || "0",
    publishedAt: searchResult.snippet.publishedAt,
    thumbnailUrl: searchResult.snippet.thumbnails.default.url,
    videoUrl: `https://www.youtube.com/watch?v=${searchResult.id.videoId}`,
  };
}

export default function Home() {
  const [videos, setVideos] = useState<TrendingVideoData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTrendingMusicVideos()
      .then(({ data, error }) => {
        if (error) {
          setError(error);
        } else if (data) {
          setVideos(data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleSearchResults = (results: YouTubeSearchResult[]) => {
    if (results.length === 0) {
      // If no search results, revert to trending videos
      fetchTrendingMusicVideos().then(({ data, error }) => {
        if (error) {
          setError(error);
        } else if (data) {
          setVideos(data);
        }
      });
    } else {
      // Convert search results to trending format
      const formattedResults = results.map(convertSearchToTrendingFormat);
      setVideos(formattedResults);
    }
  };

  if (error) {
    return (
      <>
        <Navbar onSearchResults={handleSearchResults} />
        <main className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-8 text-red-600">
            Error Fetching Videos
          </h1>
          <p>{error}</p>
          <p>
            Please ensure your YOUTUBE_API_KEY is set correctly in your .env file
            and the server has restarted.
          </p>
        </main>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Navbar onSearchResults={handleSearchResults} />
        <main className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-8">Loading...</h1>
        </main>
      </>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <>
        <Navbar onSearchResults={handleSearchResults} />
        <main className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-8">Most Popular Music Videos</h1>
          <p>No videos found at the moment.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar onSearchResults={handleSearchResults} />
      <main className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Most Popular Music Videos</h1>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videos.map((video: TrendingVideoData) => (
                <TableRow key={video.id}>
                  <TableCell>
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-80 transition-opacity"
                    >
                      {video.thumbnailUrl !== null ? (
                        <Image
                          src={video.thumbnailUrl as string}
                          alt={`Thumbnail for ${video.title}`}
                          width={120}
                          height={90}
                          className="rounded"
                        />
                      ) : (
                        <div className="w-[120px] h-[90px] bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                          No Thumbnail
                        </div>
                      )}
                    </a>
                  </TableCell>
                  <TableCell className="font-medium">
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 hover:underline transition-colors"
                    >
                      {video.title}
                    </a>
                  </TableCell>
                  <TableCell>{formatNumber(video.views)}</TableCell>
                  <TableCell>{formatNumber(video.likes)}</TableCell>
                  <TableCell>{formatDate(video.publishedAt)}</TableCell>
                  <TableCell>
                    <button
                      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                      onClick={() => {
                        const videoData = {
                          id: video.id,
                          title: video.title,
                          thumbnailUrl: video.thumbnailUrl,
                          videoUrl: video.videoUrl
                        };
                        router.push(`/generation?video=${encodeURIComponent(JSON.stringify(videoData))}`);
                      }}
                    >
                      Generate
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
