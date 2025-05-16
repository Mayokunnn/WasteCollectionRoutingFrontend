import React from 'react';
import { RouteResponse } from '../types/types';

interface RouteResultsProps {
  routeData: RouteResponse | null;
  onVisualizeClick: () => void;
}

const RouteResults: React.FC<RouteResultsProps> = ({ routeData, onVisualizeClick }) => {
  if (!routeData) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Optimized Route Results</h2>
      
      <div className="mb-4">
        <h3 className="text-gray-700 font-medium mb-2">Bin`s to Visit:</h3>
        <div className="bg-gray-100 p-3 rounded-md">
          {routeData.optimized_route.length > 0 ? (
            <ul className="list-disc pl-5">
              {routeData.optimized_route.map((bin, index) => (
                <li key={index} className="mb-1">
                  {bin}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No bins to visit.</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-gray-700 font-medium mb-2">Total Distance:</h3>
          <p className="bg-gray-100 p-3 rounded-md">
            {routeData.total_distance.toFixed(2)} units
          </p>
        </div>
        <div>
          <h3 className="text-gray-700 font-medium mb-2">Bins Covered:</h3>
          <p className="bg-gray-100 p-3 rounded-md">
            {routeData.bins_covered}
          </p>
        </div>
      </div>
      
      <button
        onClick={onVisualizeClick}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Visualize Route Graph
      </button>
    </div>
  );
};

export default RouteResults;