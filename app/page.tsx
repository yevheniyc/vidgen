import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchTrendingMusicVideos, TrendingVideoData } from "./actions";
import Image from "next/image";

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

// Make the component async to use await for the server action
export default async function Home() {
  // Fetch data using the server action
  const { data: videos, error } = await fetchTrendingMusicVideos();

  // Handle potential errors during data fetching
  if (error) {
    return (
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
    );
  }

  // Handle the case where data might be null or empty even without an error
  if (!videos || videos.length === 0) {
    return (
      <main className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Most Popular Music Videos</h1>
        <p>No trending music videos found at the moment.</p>
      </main>
    );
  }

  return (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
