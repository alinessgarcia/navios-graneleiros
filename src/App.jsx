import React, { useState, useEffect } from 'react';
import { Anchor, Ship, BarChart3, Settings, LogOut, Users, TrendingUp, AlertCircle } from 'lucide-react';
import './App.css';
import ShipCard from './components/ShipCard';
import PortCard from './components/PortCard';
import StatsCard from './components/StatsCard';
import ProductChart from './components/ProductChart';
import ExportMenu from './components/ExportMenu';
import ConnectionStatus from './components/ConnectionStatus';
import LoginPage from './components/LoginPage';
import { useDataService } from './services/useDataService';

function App() {
  const [activeTab, setActiveTab] = useState('ships');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  
  const {
    ships,
    ports,
    stats,
    productionData,
    loading,
    error,
    lastUpdate,
    connectionStatus,
    refreshData
  } = useDataService();

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('navios_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true);
      localStorage.setItem('navios_auth', 'true');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('navios_auth');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Carregando dados...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={refreshData}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'ships':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ships.map(ship => (
              <ShipCard key={ship.id} ship={ship} />
            ))}
          </div>
        );
      
      case 'ports':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ports.map(port => (
              <PortCard key={port.id} port={port} />
            ))}
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Total de Navios"
                value={stats.totalShips}
                icon={Ship}
                color="blue"
              />
              <StatsCard
                title="Portos Ativos"
                value={stats.activePorts}
                icon={Anchor}
                color="green"
              />
              <StatsCard
                title="Carga Total (mil t)"
                value={stats.totalCargo}
                icon={TrendingUp}
                color="purple"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Produção por Produto</h3>
              <ProductChart data={productionData} />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Ship className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">
                Navios Graneleiros Brasil
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <ConnectionStatus status={connectionStatus} lastUpdate={lastUpdate} />
              
              <button
                onClick={() => setShowExportMenu(true)}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <Settings className="h-4 w-4 mr-1" />
                Exportar
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-800"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('ships')}
              className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'ships'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Ship className="h-4 w-4 mr-2" />
              Navios ({ships.length})
            </button>
            
            <button
              onClick={() => setActiveTab('ports')}
              className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'ports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Anchor className="h-4 w-4 mr-2" />
              Portos ({ports.length})
            </button>
            
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>

      {/* Export Menu Modal */}
      {showExportMenu && (
        <ExportMenu
          onClose={() => setShowExportMenu(false)}
          ships={ships}
          ports={ports}
        />
      )}
    </div>
  );
}

export default App;
