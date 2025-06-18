# AI Tools Browser - Full Stack Web Application

A comprehensive full-stack web application for browsing, filtering, and favoriting AI tools. Built with Node.js/Express backend and React frontend with modern UI components.

## 🚀 Live Demo

**Frontend**: https://a13b96ad-2cca-4928-a7d0-3a6491264a58.scout.page

**Note**: The backend API server needs to be running locally on port 3001 for full functionality.

## ✨ Features

### Core Requirements
- ✅ **Browse All Tools**: Display 20 AI tools in responsive card layout
- ✅ **Category Filtering**: Filter tools by category with dropdown
- ✅ **Search Functionality**: Search by tool name, category, tags, or description
- ✅ **Favorites System**: Add/remove tools from favorites with heart icons
- ✅ **Favorites Page**: Dedicated page to view and manage favorite tools
- ✅ **Responsive Design**: Mobile-friendly interface with loading states
- ✅ **Error Handling**: Comprehensive error messages and edge cases

### Backend API (Express.js)
- ✅ `GET /api/tools` - Return all AI tools
- ✅ `GET /api/tools?category=Writing` - Filter tools by category (case-insensitive)
- ✅ `POST /api/favorites` - Save tool to favorites (prevents duplicates)
- ✅ `GET /api/favorites` - List all saved favorites
- ✅ `DELETE /api/favorites/:id` - Remove tool from favorites
- ✅ `GET /api/categories` - Get all unique categories
- ✅ `GET /api/health` - Health check endpoint

### Bonus Features Implemented
1. ✅ **Dark Mode Toggle** - Complete dark/light theme switching
2. ✅ **Interactive Charts** - Bar charts and pie charts showing tools by category
3. ✅ **Advanced Search** - Search across multiple fields (name, tags, description)
4. ✅ **Confetti Animation** - Celebration animation when adding favorites
5. ✅ **Real-time Favorites Counter** - Badge showing number of favorites
6. ✅ **Category Statistics** - Charts with detailed category breakdowns
7. ✅ **Loading States** - Skeleton loaders and spinner animations
8. ✅ **Edge Case Handling** - Empty states, duplicate prevention, error recovery

## 🛠 Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **CORS** for cross-origin requests
- **In-memory storage** for favorites (resets on restart)

### Frontend
- **React 19** with **TypeScript**
- **React Router** for navigation
- **TanStack Query** for data fetching and caching
- **Tailwind CSS V4** for styling
- **ShadCN UI** components library
- **Lucide React** for icons
- **Recharts** for data visualization
- **Canvas Confetti** for animations
- **Axios** for HTTP requests

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and Bun (or npm/yarn)
- Git

### Backend Setup
```bash
# Navigate to backend directory
cd ai-tools-backend

# Install dependencies
bun install

# Start the server (runs on port 3001)
bun run index.ts
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ai-tools-app

# Install dependencies
bun install

# Start development server (runs on port 8001)
bun dev

# Build for production
bun run build
```

## 🗂 Project Structure

```
ai-tools-backend/
├── index.ts              # Express server with API routes
├── data.ts               # Sample AI tools data (20 tools)
├── package.json          # Backend dependencies
└── README.md

ai-tools-app/
├── src/
│   ├── App.tsx           # Main application with all components
│   ├── api.ts            # API service functions
│   ├── types.ts          # TypeScript interfaces
│   └── components/ui/    # ShadCN UI components
├── package.json          # Frontend dependencies
├── vite.config.ts        # Vite configuration
└── README.md
```

## 🔌 API Endpoints

### Tools
- `GET /api/tools` - Get all tools
- `GET /api/tools?category=Writing` - Filter by category
- `GET /api/categories` - Get unique categories

### Favorites
- `POST /api/favorites` - Add to favorites
  ```json
  { "toolId": 1 }
  ```
- `GET /api/favorites` - Get all favorites
- `DELETE /api/favorites/:id` - Remove from favorites

### Utility
- `GET /api/health` - Server health check

## 💾 Sample Data

The application includes 20 AI tools across 8 categories:
- **Writing** (5 tools): ChatGPT, Claude, Grammarly, Jasper, Copy.ai
- **Image Generation** (3 tools): DALL-E 3, Midjourney, Stable Diffusion
- **Coding** (3 tools): GitHub Copilot, Cursor, Replit AI
- **Video** (3 tools): Loom AI, RunwayML, Synthesia
- **Audio** (2 tools): Eleven Labs, Otter.ai
- **Productivity** (2 tools): Notion AI, Zapier AI
- **Research** (1 tool): Perplexity
- **Design** (1 tool): Canva AI

## 🎨 UI/UX Features

### Design System
- **Modern gradient backgrounds** with glass morphism effects
- **Responsive grid layouts** adapting to screen sizes
- **Hover animations** and smooth transitions
- **Color-coded pricing** badges (Free, Freemium, Paid)
- **Accessible color contrast** in both light and dark modes

### User Experience
- **Instant search** with real-time filtering
- **Visual feedback** for all interactions
- **Loading states** for better perceived performance
- **Empty states** with helpful guidance
- **Error recovery** with clear action buttons

## 🚀 Deployment

The frontend is deployed to Scout's hosting platform and can be accessed at:
https://a13b96ad-2cca-4928-a7d0-3a6491264a58.scout.page

For full functionality, run the backend server locally:
```bash
cd ai-tools-backend
bun run index.ts
```

## 📊 Performance & Quality

### Frontend Metrics
- **Fast Loading**: Optimized bundle size with code splitting
- **Responsive**: Mobile-first design with breakpoints
- **Accessible**: Semantic HTML and ARIA attributes
- **Type Safe**: Full TypeScript coverage

### Backend Quality
- **Error Handling**: Comprehensive error responses
- **Validation**: Input validation for all endpoints
- **CORS**: Proper cross-origin configuration
- **Logging**: Server startup and error logging

## 🔧 Development Notes

### Key Implementation Details
1. **State Management**: React Context for global state (dark mode, favorites)
2. **Data Fetching**: TanStack Query for caching and synchronization
3. **Component Architecture**: Single-file components for rapid development
4. **API Design**: RESTful endpoints with proper HTTP status codes
5. **Error Boundaries**: Graceful error handling throughout the app

### Edge Cases Handled
- Duplicate favorite prevention with user feedback
- Empty search results with clear messaging
- Network errors with retry suggestions
- Category filtering with case-insensitive matching
- Mobile touch interactions and responsive layouts

## 📈 Future Enhancements

Potential improvements for production use:
- **Database Integration**: Replace in-memory storage with PostgreSQL/MongoDB
- **User Authentication**: Login system with personal favorites
- **Tool Submissions**: Allow users to submit new AI tools
- **Reviews & Ratings**: User reviews and star ratings
- **Advanced Filtering**: Price range, popularity, date added
- **Tool Categories**: Hierarchical category system
- **Search Analytics**: Track popular searches and tools

## 👨‍💻 Development Experience

This project demonstrates:
- **Full-stack development** with modern TypeScript/React stack
- **API design** following RESTful principles
- **UI/UX design** with attention to detail and user experience
- **State management** with React patterns and external state
- **Data visualization** with responsive charts and graphics
- **Error handling** and edge case management
- **Performance optimization** with caching and lazy loading

Built with ❤️ using modern web technologies and best practices.