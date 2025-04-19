# VidGen - Video Generation Platform

A modern web application built with Next.js for video generation and management.

## Features

- **Modern UI/UX**: Built with Next.js, Tailwind CSS, and Radix UI components
- **Authentication**: Integrated with Clerk for secure user authentication
- **Database**: Uses Prisma with Supabase for data management
- **Video Generation**: Integration with Google APIs for video processing
- **Responsive Design**: Mobile-friendly interface
- **Dark Mode**: Built-in theme support with next-themes
- **Video Generation API**: Custom API endpoints for video processing
- **Video Management**: Upload, process, and manage video content
- **API Documentation**: Swagger/OpenAPI documentation for all endpoints
- **Error Handling**: Comprehensive error handling and logging
- **Rate Limiting**: API rate limiting for security
- **Video Processing**: Support for various video formats and processing options

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Lucide Icons
- **Authentication**: Clerk
- **Database**: Prisma, Supabase
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Hooks
- **Animation**: Embla Carousel, tw-animate-css
- **API Documentation**: Swagger/OpenAPI
- **Video Processing**: FFmpeg, Google Cloud Video Intelligence API
- **API Security**: Rate limiting, CORS protection

## Project Structure

```
vidgen/
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   │   ├── videos/     # Video-related endpoints
│   │   ├── auth/       # Authentication endpoints
│   │   └── docs/       # API documentation
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # React components
│   ├── navbar/         # Navigation components
│   ├── video/          # Video-related components
│   └── ui/             # Reusable UI components
├── lib/                 # Utility functions and configurations
│   ├── api/            # API client and utilities
│   └── video/          # Video processing utilities
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── utils/              # Helper functions
```

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   DATABASE_URL=your_database_url
   GOOGLE_CLOUD_PROJECT=your_google_cloud_project
   GOOGLE_APPLICATION_CREDENTIALS=path_to_your_credentials.json
   API_RATE_LIMIT=100
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Documentation

The API documentation is available at `/api/docs` when running the development server. It provides detailed information about:

- Available endpoints
- Request/response formats
- Authentication requirements
- Rate limiting details
- Error codes and handling

## Video Processing

The platform supports various video processing features:

1. Video Upload

   - Support for multiple video formats
   - Progress tracking
   - Error handling

2. Video Processing

   - Format conversion
   - Quality adjustment
   - Thumbnail generation
   - Metadata extraction

3. Video Management
   - List and search videos
   - Update video details
   - Delete videos
   - View processing status

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run generate-docs` - Generate API documentation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
