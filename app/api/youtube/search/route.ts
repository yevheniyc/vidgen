import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  try {
    // First search for videos
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(
        query
      )}&type=video&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to fetch YouTube results');
    }

    const searchData = await searchResponse.json();
    
    // Get video IDs for statistics
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
    
    // Fetch statistics for all videos in one request
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!statsResponse.ok) {
      throw new Error('Failed to fetch video statistics');
    }

    const statsData = await statsResponse.json();
    
    // Combine search results with statistics
    const videosWithStats = searchData.items.map((item: any) => {
      const stats = statsData.items.find((stat: any) => stat.id === item.id.videoId);
      return {
        ...item,
        statistics: stats?.statistics
      };
    });

    return NextResponse.json(videosWithStats);
  } catch (error) {
    console.error('YouTube API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch YouTube results' },
      { status: 500 }
    );
  }
} 