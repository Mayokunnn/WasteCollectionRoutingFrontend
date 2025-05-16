export interface RouteResponse {
  optimized_route: string[];
  total_distance: number;
  bins_covered: number;
}

export interface AlgorithmResult {
  distance: number;
  bins: number;
  route: string[];
}

export interface AlgorithmComparisonResponse {
  dijkstra: AlgorithmResult;
  astar: AlgorithmResult;
  naive: AlgorithmResult;
  Main: AlgorithmResult;
}