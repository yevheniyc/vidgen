import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Home() {
  // Sample data - in a real app, this would come from your database
  const videos = [
    {
      id: "1",
      title: "How to Build a Next.js App",
      views: 1000,
      likes: 100,
      uploadDate: "2024-04-17",
    },
    {
      id: "2",
      title: "Introduction to TypeScript",
      views: 800,
      likes: 80,
      uploadDate: "2024-04-16",
    },
    {
      id: "3",
      title: "React Hooks Explained",
      views: 600,
      likes: 60,
      uploadDate: "2024-04-15",
    },
  ]

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Most Popular Videos</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Upload Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => (
              <TableRow key={video.id}>
                <TableCell className="font-medium">{video.title}</TableCell>
                <TableCell>{video.views.toLocaleString()}</TableCell>
                <TableCell>{video.likes.toLocaleString()}</TableCell>
                <TableCell>{video.uploadDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}
