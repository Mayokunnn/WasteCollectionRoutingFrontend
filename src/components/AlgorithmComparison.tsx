import React, { useState, useEffect } from 'react';
import { AlgorithmComparisonResponse } from '../types/types';
import { compareAlgorithms } from '../api/routeService';

interface AlgorithmComparisonProps {
  bins: number;
  threshold: number;
}

const AlgorithmComparison: React.FC<AlgorithmComparisonProps> = ({ bins, threshold }) => {
  const [comparisonData, setComparisonData] = useState<AlgorithmComparisonResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('metrics');

  useEffect(() => {
    const fetchComparison = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await compareAlgorithms(bins, threshold);
        setComparisonData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchComparison();
  }, [bins, threshold]);

  const getWinnerByMetric = (metric: 'distance' | 'bins') => {
    if (!comparisonData) return null;

    const algorithms = ['dijkstra', 'astar', 'naive', 'Main'] as const;
    
    if (metric === 'distance') {
      // For distance, lower is better
      return algorithms.reduce((winner, current) => {
        return comparisonData[current].distance < comparisonData[winner].distance ? current : winner;
      }, algorithms[0]);
    }
  };

  const getAlgorithmName = (key: string): string => {
    switch (key) {
      case 'dijkstra': return 'Dijkstra';
      case 'astar': return 'A*';
      case 'naive': return 'Naive';
      case 'Main': return 'Main';
      default: return key;
    }
  };

  console.log(comparisonData);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-gray-600">Loading algorithm comparison...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!comparisonData) {
    return null;
  }

  const distanceWinner = getWinnerByMetric('distance');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Algorithm Comparison
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Comparison of different routing algorithms with bins: {bins}, threshold: {threshold}
        </p>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'metrics'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Performance Metrics
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'routes'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Routes
          </button>
        </nav>
      </div>

      <div className="p-4">
        {activeTab === 'metrics' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Algorithm
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bins Covered
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(comparisonData).map(([key, value]) => (
                  <tr key={key} className={`${key === 'Main' ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getAlgorithmName(key)}
                      {key === 'Main' && <span className="ml-2 text-xs text-blue-600">(Primary)</span>}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      key === distanceWinner ? 'font-bold text-green-600' : 'text-gray-500'
                    }`}>
                      {value.distance}
                      {key === distanceWinner && <span className="ml-2">🏆</span>}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      key === distanceWinner ? 'font-bold text-green-600' : 'text-gray-500'
                    }`}>
                      {value.bins}
                      {key === distanceWinner && <span className="ml-2">🏆</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'routes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(comparisonData).map(([key, value]) => (
              <div key={key} className={`p-4 rounded-lg ${key === 'Main' ? 'border-2 border-blue-400' : 'border border-gray-200'}`}>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {getAlgorithmName(key)}
                  {key === 'Main' && <span className="ml-2 text-xs text-blue-600">(Primary)</span>}
                </h3>
                <div className="flex justify-between mb-3 text-sm text-gray-500">
                  <span>Distance: <strong className={key === distanceWinner ? 'text-green-600' : ''}>{value.distance}</strong></span>
                  <span>Bins: <strong className={key === distanceWinner ? 'text-green-600' : ''}>{value.bins}</strong></span>
                </div>
                <div className="bg-gray-50 p-3 rounded-md max-h-48 overflow-y-auto">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Route:</h4>
                  <div className="flex flex-wrap gap-1">
                    {value.route.map((bin: number, index: number) => (
                      <div key={index} className="bg-gray-200 px-2 py-1 rounded text-xs">
                      {index > 0 && <span className="text-gray-400 mr-1">→</span>}
                      {bin}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmComparison;
