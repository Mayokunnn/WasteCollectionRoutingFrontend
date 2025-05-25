import React, { useState } from 'react';

interface RouteFormProps {
  onSubmit: (bins: number, threshold: number) => void;
  isLoading: boolean;
}

const RouteForm: React.FC<RouteFormProps> = ({ onSubmit, isLoading }) => {
  const [bins, setBins] = useState<number>(20);
  const [threshold, setThreshold] = useState<number>(0.7);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(bins, threshold);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Route Optimization Parameters</h2>
      
      <div className="mb-4">
        <label htmlFor="bins" className="block text-gray-700 font-medium mb-2">
          Number of Bins
        </label>
        <input
          id="bins"
          type="number"
          min="1"
          value={bins}
          onChange={(e) => setBins(parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="threshold" className="block text-gray-700 font-medium mb-2">
          Fill Threshold
        </label>
        <input
          id="threshold"
          type="number"
          min="0.0"
          max="1"
          step="0.1"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
      >
        {isLoading ? 'Optimizing...' : 'Optimize Route'}
      </button>
    </form>
  );
};

export default RouteForm;
