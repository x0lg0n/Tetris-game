# AI Tools API - Backend Server

Express.js backend API for the AI Tools Browser application.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start server (port 3001)
bun run index.ts
```

## 📡 API Endpoints

### Tools
- `GET /api/tools` - Get all AI tools
- `GET /api/tools?category=Writing` - Filter by category
- `GET /api/categories` - Get unique categories

### Favorites
- `POST /api/favorites` - Add to favorites `{"toolId": 1}`
- `GET /api/favorites` - Get all favorites
- `DELETE /api/favorites/:id` - Remove from favorites

### Health
- `GET /api/health` - Server status and stats

## 📦 Dependencies
- Express.js - Web framework
- CORS - Cross-origin requests
- TypeScript - Type safety

## 💾 Data
Contains 20 AI tools across 8 categories with realistic data for testing.

Favorites are stored in memory and reset on server restart.