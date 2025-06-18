import axios from 'axios';
import { AITool } from './types';

const API_BASE_URL = 'http://localhost:3001/api';
const api = axios.create({ baseURL: API_BASE_URL, timeout: 10000 });

export const toolsApi = {
  getTools: async (category?: string): Promise<AITool[]> => {
    const params = category ? { category } : {};
    const response = await api.get<AITool[]>('/tools', { params });
    return response.data;
  },
  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/categories');
    return response.data;
  },
  addToFavorites: async (toolId: number) => {
    const response = await api.post('/favorites', { toolId });
    return response.data;
  },
  getFavorites: async (): Promise<AITool[]> => {
    const response = await api.get<AITool[]>('/favorites');
    return response.data;
  },
  removeFromFavorites: async (toolId: number) => {
    const response = await api.delete(`/favorites/${toolId}`);
    return response.data;
  },
};