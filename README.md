# VidGen - Video Generation Platform

A modern web application built with Next.js for video generation and management.

## Features

- **Modern UI/UX**: Built with Next.js, Tailwind CSS, and Radix UI components
- **Authentication**: Integrated with Clerk for secure user authentication
- **Database**: Uses Prisma with Supabase for data management
- **Video Generation**: Integration with Google APIs for video processing
- **Responsive Design**: Mobile-friendly interface
- **Dark Mode**: Built-in theme support with next-themes

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Lucide Icons
- **Authentication**: Clerk
- **Database**: Prisma, Supabase
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Hooks
- **Animation**: Embla Carousel, tw-animate-css

## Project Structure

```
vidgen/
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # React components
│   ├── navbar/         # Navigation components
│   └── ui/             # Reusable UI components
├── lib/                 # Utility functions and configurations
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
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
