import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { aiTools, AITool } from './data';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Root route - API documentation
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to AI Tools API',
    version: '1.0',
    endpoints: {
      tools: '/api/tools',
      toolsByCategory: '/api/tools?category=Writing',
      categories: '/api/categories',
      favorites: '/api/favorites',
      health: '/api/health'
    }
  });
});

// In-memory storage for favorites (resets on server restart)
let favorites: number[] = [];

// GET /api/tools - Return all AI tools or filter by category
app.get('/api/tools', (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    if (category) {
      // Case-insensitive category filtering
      const filteredTools = aiTools.filter(tool => 
        tool.category.toLowerCase() === (category as string).toLowerCase()
      );
      return res.json(filteredTools);
    }
    
    // Return all tools if no category filter
    res.json(aiTools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    res.status(500).json({ error: 'Failed to fetch tools' });
  }
});

// POST /api/favorites - Save a tool to favorites
app.post('/api/favorites', (req: Request, res: Response) => {
  try {
    const { toolId } = req.body;
    
    if (!toolId || typeof toolId !== 'number') {
      return res.status(400).json({ error: 'Valid toolId is required' });
    }
    
    // Check if tool exists
    const tool = aiTools.find(t => t.id === toolId);
    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    
    // Check if already favorited (prevent duplicates)
    if (favorites.includes(toolId)) {
      return res.status(409).json({ 
        error: 'Tool is already in favorites',
        message: `${tool.name} is already in your favorites!`
      });
    }
    
    // Add to favorites
    favorites.push(toolId);
    res.status(201).json({ 
      message: `${tool.name} added to favorites!`,
      toolId: toolId
    });
  } catch (error) {
    console.error('Error saving favorite:', error);
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});

// GET /api/favorites - List all saved favorites
app.get('/api/favorites', (req: Request, res: Response) => {
  try {
    // Get full tool objects for favorited IDs
    const favoriteTools = aiTools.filter(tool => favorites.includes(tool.id));
    res.json(favoriteTools);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// DELETE /api/favorites/:id - Remove tool from favorites
app.delete('/api/favorites/:id', (req: Request, res: Response) => {
  try {
    const toolId = parseInt(req.params.id);
    
    if (isNaN(toolId)) {
      return res.status(400).json({ error: 'Valid tool ID is required' });
    }
    
    const index = favorites.indexOf(toolId);
    if (index === -1) {
      return res.status(404).json({ error: 'Tool not found in favorites' });
    }
    
    // Remove from favorites
    favorites.splice(index, 1);
    
    const tool = aiTools.find(t => t.id === toolId);
    res.json({ 
      message: `${tool?.name || 'Tool'} removed from favorites`,
      toolId: toolId
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

// GET /api/categories - Get all unique categories
app.get('/api/categories', (req: Request, res: Response) => {
  try {
    const categories = [...new Set(aiTools.map(tool => tool.category))].sort();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'AI Tools API is running',
    timestamp: new Date().toISOString(),
    stats: {
      totalTools: aiTools.length,
      favoriteCount: favorites.length
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Tools API server running on port ${PORT}`);
  console.log(`📊 Loaded ${aiTools.length} AI tools`);
  console.log(`🔗 API endpoints available at http://localhost:${PORT}/api`);
});

export default app;