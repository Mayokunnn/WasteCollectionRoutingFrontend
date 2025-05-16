import React, { useState } from 'react';
import RouteForm from './components/RouteForm';
import RouteResults from './components/RouteResults';
import VisualizationModal from './components/VisualizationModal';
import ErrorMessage from './components/ErrorMessage';
import AlgorithmComparison from './components/AlgorithmComparison';
import { fetchOptimizedRoute, getLastRouteVisualizationUrl } from './api/routeService';
import { RouteResponse } from './types/types';

const App: React.FC = () => {
  const [routeData, setRouteData] = useState<RouteResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [bins, setBins] = useState<number>(10);
  const [threshold, setThreshold] = useState<number>(0.7);

  const handleFormSubmit = async (formBins: number, formThreshold: number) => {
    setLoading(true);
    setError(null);
    setBins(formBins);
    setThreshold(formThreshold);
    
    try {
      const data = await fetchOptimizedRoute(formBins, formThreshold);
      setRouteData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVisualizeClick = () => {
    setModalOpen(true);
  };

  const clearError = () => {
    setError(null);
  };

  const toggleComparison = () => {
    setShowComparison(!showComparison);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`mx-auto ${showComparison ? 'max-w-6xl' : 'max-w-md'}`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Waste Collection Route Optimizer
          </h1>
          <p className="mt-2 text-gray-600">
            Optimize and visualize waste collection routes based on bin fill levels
          </p>
          <button
            onClick={toggleComparison}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            {showComparison ? 'Hide Algorithm Comparison' : 'Compare Algorithms'}
          </button>
        </div>

        <div className={`flex flex-col ${showComparison ? 'lg:flex-row gap-8' : ''}`}>
          <div className={showComparison ? 'lg:w-1/3' : 'w-full'}>
            {error && <ErrorMessage message={error} onDismiss={clearError} />}
            
            <RouteForm onSubmit={handleFormSubmit} isLoading={loading} />
            
            {loading && (
              <div className="text-center my-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-600">Optimizing route...</p>
              </div>
            )}
            
            {!loading && routeData && (
              <RouteResults 
                routeData={routeData} 
                onVisualizeClick={handleVisualizeClick} 
              />
            )}
          </div>
          
          {showComparison && (
            <div className="lg:w-2/3">
              <AlgorithmComparison bins={bins} threshold={threshold} />
            </div>
          )}
        </div>
      </div>
      
      <VisualizationModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        visualizationUrl={getLastRouteVisualizationUrl()}
      />
    </div>
  );
};

export default App;
