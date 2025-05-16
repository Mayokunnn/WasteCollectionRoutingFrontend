import { AlgorithmComparisonResponse, RouteResponse } from '../types/types';

const API_BASE_URL = 'http://localhost:8000';

export const fetchOptimizedRoute = async (bins: number, threshold: number): Promise<RouteResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/optimize-route?bins=${bins}&threshold=${threshold}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch optimized route:', error);
    throw error;
  }
};

export const getLastRouteVisualizationUrl = (): string => {
  return `${API_BASE_URL}/view-last-route`;
};

export const compareAlgorithms = async (bins: number, threshold: number): Promise<AlgorithmComparisonResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/compare-algorithms?bins=${bins}&threshold=${threshold}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch algorithm comparison:', error);
    throw error;
  }
};
