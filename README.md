# AI Tool Explorer

A comprehensive full-stack web application for browsing, filtering, and favoriting AI tools. Built with an Express.js backend and a React frontend featuring modern UI components.

🌟 **Last Updated:** June 18, 2025

## Project Overview

AI Tool Explorer is designed to help users discover and manage AI tools efficiently. It consists of:

- **Backend:** An Express.js server providing RESTful API endpoints.
- **Frontend:** A React-based client with a responsive and intuitive interface.

Users can browse a curated list of 20 AI tools, filter by category, search across multiple fields, and save favorites for quick access.

## Features

### Core Functionality

- Browse 20 AI tools in a responsive card layout.
- Filter tools by category using a dropdown menu.
- Search by tool name, category, tags, or description.
- Add/remove tools from favorites with heart icons.
- View and manage favorite tools on a dedicated page.
- Responsive design optimized for mobile and desktop.
- Comprehensive error handling and loading states.

### Enhanced User Experience

- Dark/light mode toggle for accessibility.
- Interactive charts displaying tools by category.
- Advanced search across multiple tool attributes.
- Confetti animation when adding tools to favorites.
- Real-time favorites counter.
- Skeleton loaders during data fetching.
- Robust error handling with user feedback.

## Tech Stack

### Backend

- **Node.js with Express.js:** Core server framework.
- **TypeScript:** Ensures type safety.
- **CORS:** Enables cross-origin requests.
- **In-memory Storage:** Manages favorites (resets on server restart).

### Frontend

- **React with TypeScript:** UI framework with type safety.
- **React Router:** Handles navigation.
- **TanStack Query:** Manages data fetching and caching.
- **Tailwind CSS:** Styling framework.
- **ShadCN UI:** Modern UI components library.
- **Lucide React:** Icon library.
- **Recharts:** Data visualization.
- **Canvas Confetti:** Celebration animations.
- **Axios:** HTTP requests.

## Installation & Setup

### Prerequisites

- Node.js 18+
- Bun (or npm/yarn)
- Git

### Backend Setup

1. Navigate to the backend directory:

   ```sh
   cd ai-tools-backend
   ```
2. Install dependencies:

   ```sh
   bun install
   ```
3. Start the server (runs on port 3001):

   ```sh
   bun run index.ts
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd client
   ```
2. Install dependencies:

   ```sh
   bun install
   ```
3. Start the development server:

   ```sh
   bun dev
   ```

## Usage

- **Browsing:** Explore all 20 AI tools displayed in a card layout.
- **Filtering:** Select a category from the dropdown to narrow down tools.
- **Searching:** Enter keywords to search tool names, categories, tags, or descriptions.
- **Managing Favorites:** Click the heart icon to add/remove tools; visit the favorites page to review them.

## API Documentation

- **Get All Tools**\
  `GET /api/tools`\
  Returns all AI tools.

- **Filter Tools by Category**\
  `GET /api/tools?category=Writing`\
  Returns tools in the specified category (case-insensitive).

- **Get All Categories**\
  `GET /api/categories`\
  Returns a list of unique categories.

- **Add to Favorites**\
  `POST /api/favorites`\
  Content-Type: application/json\
  Body: `{ "toolId": 1 }`\
  Adds a tool to favorites, preventing duplicates.

- **Get Favorites**\
  `GET /api/favorites`\
  Returns all favorited tools.

- **Remove from Favorites**\
  `DELETE /api/favorites/:id`\
  Removes a tool from favorites by ID.

- **Health Check**\
  `GET /api/health`\
  Returns server status and statistics.

## Project Structure

```
AI Tool Explorer/
├── ai-tools-backend/       # Backend API server
│   ├── index.ts            # Express server with API routes
│   ├── data.ts             # Sample AI tools data (20 tools)
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend-specific documentation
│
├── client/                 # React frontend application
│   ├── src/
│   │   ├── App.tsx         # Main application with components
│   │   ├── api.ts          # API service functions
│   │   ├── types.ts        # TypeScript interfaces
│   │   └── components/ui/  # ShadCN UI components
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.ts      # Build configuration
│   └── README.md           # Frontend-specific documentation
│
└── README.md               # Project documentation (this file)
```

## Sample Data

The application includes 20 AI tools across 8 categories:

- **Writing (5):** ChatGPT, Claude, Grammarly, Jasper, Copy.ai
- **Image Generation (3):** DALL-E 3, Midjourney, Stable Diffusion
- **Coding (3):** GitHub Copilot, Cursor, Replit AI
- **Video (3):** Loom AI, RunwayML, Synthesia
- **Audio (2):** Eleven Labs, Otter.ai
- **Productivity (2):** Notion AI, Zapier AI
- **Research (1):** Perplexity
- **Design (1):** Canva AI

## Contributing

1. Fork the repository at https://github.com/x0lg0n/AI-Explorer-Tools.
2. Create a branch for your feature or bug fix.
3. Commit your changes with clear messages.
4. Push your branch to your fork.
5. Submit a pull request to the main repository.

## License

This project is for educational purposes only. All AI tools mentioned are property of their respective owners. Licensed under the MIT License.

## Contact

For questions or issues, please open an issue on the GitHub repository.
