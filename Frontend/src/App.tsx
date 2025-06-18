import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Filter, BarChart3, Heart, Home, Zap, Moon, Sun, ExternalLink, Loader2, AlertCircle, ArrowLeft, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { toolsApi } from './api';
import { AITool } from './types';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

// Context for app state
interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  favoriteIds: number[];
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// App Provider
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const addToFavorites = (id: number) => setFavoriteIds(prev => [...prev, id]);
  const removeFromFavorites = (id: number) => setFavoriteIds(prev => prev.filter(fav => fav !== id));
  const isFavorite = (id: number) => favoriteIds.includes(id);

  const value = { darkMode, toggleDarkMode, favoriteIds, addToFavorites, removeFromFavorites, isFavorite };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Navigation Component
const Navigation: React.FC = () => {
  const { darkMode, toggleDarkMode, favoriteIds } = useApp();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">AI Tools Hub</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button variant={isActive('/') ? 'default' : 'ghost'} size="sm" asChild>
            <Link to="/">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Browse Tools</span>
            </Link>
          </Button>
          

          <Button variant={isActive('/favorites') ? 'default' : 'ghost'} size="sm" asChild className="relative">
            <Link to="/favorites">
              <Heart className={cn("h-4 w-4", favoriteIds.length > 0 && "fill-current text-red-500")} />
              <span className="hidden sm:inline ml-2">Favorites</span>
              {favoriteIds.length > 0 && (
                <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white border-2 border-background">
                  {favoriteIds.length > 99 ? '99+' : favoriteIds.length}
                </Badge>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline ml-2">{darkMode ? 'Light' : 'Dark'}</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

// Tool Card Component
const ToolCard: React.FC<{
  tool: AITool;
  onFavorite: (tool: AITool) => void;
  onRemoveFavorite?: (tool: AITool) => void;
  loading?: boolean;
  showRemove?: boolean;
}> = ({ tool, onFavorite, onRemoveFavorite, loading = false, showRemove = false }) => {
  const { isFavorite } = useApp();
  const isToolFavorited = isFavorite(tool.id);

  const handleFavoriteClick = () => {
    if (showRemove && onRemoveFavorite) {
      onRemoveFavorite(tool);
    } else {
      onFavorite(tool);
    }
  };

  const getPricingColor = (pricing: string) => {
    switch (pricing.toLowerCase()) {
      case 'free': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'freemium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'paid': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className="group h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-border/50 backdrop-blur-sm bg-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {tool.name}
            </CardTitle>
            <CardDescription className="mt-1 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">{tool.category}</Badge>
              <Badge variant="outline" className={cn("text-xs border-0", getPricingColor(tool.pricing))}>
                {tool.pricing}
              </Badge>
            </CardDescription>
          </div>
          <Button
            variant={isToolFavorited || showRemove ? "default" : "outline"}
            size="sm"
            onClick={handleFavoriteClick}
            disabled={loading}
            className={cn(
              "shrink-0 transition-all duration-200",
              isToolFavorited || showRemove
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950"
            )}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Heart className={cn("h-4 w-4 transition-transform duration-200", (isToolFavorited || showRemove) && "fill-current scale-110")} />
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {tool.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {tool.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs px-2 py-1 bg-muted/50 hover:bg-muted transition-colors">
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-1 bg-muted/50">
              +{tool.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <Button variant="ghost" size="sm" asChild className="w-full justify-center gap-2 text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-200">
          <a href={tool.url} target="_blank" rel="noopener noreferrer">
            <span>Visit Tool</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

// Category Chart Component
const CategoryChart: React.FC<{ tools: AITool[] }> = ({ tools }) => {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6b7280'];
  
  const categoryData = tools.reduce((acc, tool) => {
    acc[tool.category] = (acc[tool.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryData)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  const pieData = chartData.map((item, index) => ({ ...item, color: COLORS[index % COLORS.length] }));

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tools Count by Category</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px' }} />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{tools.length}</div>
          <div className="text-sm text-muted-foreground">Total Tools</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{Object.keys(categoryData).length}</div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{chartData[0]?.category || 'N/A'}</div>
          <div className="text-sm text-muted-foreground">Top Category</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{Math.round(tools.length / Object.keys(categoryData).length)}</div>
          <div className="text-sm text-muted-foreground">Avg per Category</div>
        </div>
      </div>
    </div>
  );
};

// Tools Page
const ToolsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loadingFavorite, setLoadingFavorite] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  
  const { addToFavorites, isFavorite } = useApp();
  const queryClient = useQueryClient();

  const { data: tools = [], isLoading: toolsLoading, error: toolsError } = useQuery({
    queryKey: ['tools'],
    queryFn: () => toolsApi.getTools(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => toolsApi.getCategories(),
    staleTime: 10 * 60 * 1000,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: (toolId: number) => toolsApi.addToFavorites(toolId),
    onMutate: (toolId) => { setLoadingFavorite(toolId); setError(''); },
    onSuccess: (data, toolId) => {
      addToFavorites(toolId);
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setLoadingFavorite(null);
    },
    onError: (error: any, toolId) => {
      setLoadingFavorite(null);
      if (error.response?.status === 409) {
        setError(error.response.data.message || 'This tool is already in your favorites!');
      } else {
        setError('Failed to add to favorites. Please try again.');
      }
    },
  });

  const filteredTools = useMemo(() => {
    let filtered = tools;
    if (selectedCategory) {
      filtered = filtered.filter(tool => tool.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchLower) ||
        tool.category.toLowerCase().includes(searchLower) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        tool.excerpt.toLowerCase().includes(searchLower)
      );
    }
    return filtered;
  }, [tools, selectedCategory, searchTerm]);

  const handleFavorite = (tool: AITool) => {
    if (isFavorite(tool.id)) {
      setError(`${tool.name} is already in your favorites!`);
      return;
    }
    addFavoriteMutation.mutate(tool.id);
  };

  const clearFilters = () => { setSearchTerm(''); setSelectedCategory(''); };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (toolsLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 flex-1" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
        </div>
      </div>
    );
  }

  if (toolsError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load AI tools. Please check if the backend server is running on port 3001.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">AI Tools Directory</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover and favorite the best AI tools for your workflow. Browse by category or search for specific tools.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline">{tools.length} Tools Available</Badge>
          <Badge variant="outline">{categories.length} Categories</Badge>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tools by name, category, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="default">
              <BarChart3 className="h-4 w-4 mr-2" />
              Stats
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>AI Tools by Category</DialogTitle>
            </DialogHeader>
            <CategoryChart tools={tools} />
          </DialogContent>
        </Dialog>

        {(searchTerm || selectedCategory) && (
          <Button variant="ghost" onClick={clearFilters}>Clear Filters</Button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredTools.length === tools.length 
            ? `Showing all ${tools.length} tools`
            : `Showing ${filteredTools.length} of ${tools.length} tools`
          }
          {selectedCategory && ` in ${selectedCategory}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {filteredTools.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No tools found</h3>
            <p className="text-muted-foreground">No tools match your current filters. Try adjusting your search or category selection.</p>
            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onFavorite={handleFavorite}
              loading={loadingFavorite === tool.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Favorites Page
const FavoritesPage: React.FC = () => {
  const [loadingRemove, setLoadingRemove] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  
  const { removeFromFavorites } = useApp();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading: favoritesLoading, error: favoritesError } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => toolsApi.getFavorites(),
    staleTime: 2 * 60 * 1000,
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (toolId: number) => toolsApi.removeFromFavorites(toolId),
    onMutate: (toolId) => { setLoadingRemove(toolId); setError(''); },
    onSuccess: (data, toolId) => {
      removeFromFavorites(toolId);
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      setLoadingRemove(null);
    },
    onError: () => { setLoadingRemove(null); setError('Failed to remove from favorites. Please try again.'); },
  });

  const handleRemoveFavorite = (tool: AITool) => {
    removeFavoriteMutation.mutate(tool.id);
  };

  if (favoritesLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
        </div>
      </div>
    );
  }

  if (favoritesError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/"><ArrowLeft className="h-4 w-4 mr-2" />Back to Tools</Link>
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load your favorites. Please check if the backend server is running.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/"><ArrowLeft className="h-4 w-4 mr-2" />Back to Tools</Link>
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Heart className="h-8 w-8 text-red-500 fill-current" />
              My Favorites
            </h1>
            <p className="text-muted-foreground mt-1">Your curated collection of AI tools</p>
          </div>
        </div>
        
        <Badge variant="outline" className="text-lg px-3 py-1">
          {favorites.length} {favorites.length === 1 ? 'Tool' : 'Tools'}
        </Badge>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">No favorites yet</h3>
              <p className="text-muted-foreground">
                Start exploring AI tools and add them to your favorites by clicking the heart icon.
              </p>
            </div>
            <Button asChild><Link to="/">Browse AI Tools</Link></Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-sm text-muted-foreground">
            Click the heart icon to remove tools from your favorites.
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onFavorite={() => {}}
                onRemoveFavorite={handleRemoveFavorite}
                loading={loadingRemove === tool.id}
                showRemove={true}
              />
            ))}
          </div>
          
          <div className="border-t pt-6">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                You have {favorites.length} favorite {favorites.length === 1 ? 'tool' : 'tools'} in your collection.
              </p>
              <Button variant="outline" asChild><Link to="/">Discover More Tools</Link></Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, refetchOnWindowFocus: false },
  },
});

// Main App
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<ToolsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AppProvider>
    </QueryClientProvider>
  );
}