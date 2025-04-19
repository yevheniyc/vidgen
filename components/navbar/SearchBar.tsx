'use client';
import { Input } from '../ui/input';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

export interface YouTubeSearchResult {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
    publishedAt: string;
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
  };
}

interface NavSearchProps {
  onSearchResults: (results: YouTubeSearchResult[]) => void;
}

function NavSearch({ onSearchResults }: NavSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useDebouncedCallback(async (term: string) => {
    if (!term.trim()) {
      onSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(
          term
        )}&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch YouTube results');
      }

      const data = await response.json();
      
      // Fetch additional statistics for each video
      const videosWithStats = await Promise.all(
        (data.items || []).map(async (item: YouTubeSearchResult) => {
          const statsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${item.id.videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
          );
          const statsData = await statsResponse.json();
          return {
            ...item,
            statistics: statsData.items[0]?.statistics
          };
        })
      );
      
      onSearchResults(videosWithStats);
    } catch (error) {
      console.error('Error searching YouTube:', error);
      onSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 1000); 

  return (
    <div className="relative w-full max-w-xl">
      <Input 
        type="search" 
        placeholder="Search YouTube videos" 
        className="w-full dark:bg-[hsl(var(--muted))] dark:text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] px-4 py-2"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-500 border-t-transparent"></div>
        </div>
      )}
    </div>
  );
}

export default NavSearch;
