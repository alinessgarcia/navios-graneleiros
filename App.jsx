import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Ship, Anchor, TrendingUp, MapPin, Calendar, Clock, Truck, BarChart3, LogOut } from 'lucide-react'
import ShipCard from './components/ShipCard.jsx'
import PortCard from './components/PortCard.jsx'
import ProductChart from './components/ProductChart.jsx'
import StatsCard from './components/StatsCard.jsx'
import ConnectionStatus from './components/ConnectionStatus.jsx'
import LoginPage from './components/LoginPage.jsx'
import ExportMenu from './components/ExportMenu.jsx'
import { useDataService } from './hooks/useDataService.js'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  
  // Use the data service hook for real-time data
  const {
    ships,
    ports,
    products,
    market,
    loading,
    error,
    lastUpdate,
    isConnected,
    refresh,
    filterShips,
    getShipsByPort
  } = useDataService(isAuthenticated, 30000) // Auto-update every 30 seconds only if authenticated

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Check if user is already logged in (localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem('navios_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true)
      localStorage.setItem('navios_auth', 'true')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('navios_auth')
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Ship className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Navios Graneleiros Brasil
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Dados em Tempo Real
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ConnectionStatus
                isConnected={isConnected}
                lastUpdate={lastUpdate}
                loading={loading}
                error={error}
                onRefresh={refresh}
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Monitoramento de Navios Graneleiros
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
            Acompanhe em tempo real o movimento de navios graneleiros nos principais portos brasileiros. 
            Dados atualizados sobre soja, milho, farelo de soja e outros produtos agrícolas.
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatsCard 
              icon={Ship} 
              value={market.totalShips || 0} 
              label="Navios Ativos" 
              color="blue" 
            />
            <StatsCard 
              icon={Truck} 
              value={market.totalTonnage || "0M"} 
              label="Toneladas" 
              color="green" 
            />
            <StatsCard 
              icon={Anchor} 
              value={market.activeOperations || 0} 
              label="Operações Ativas" 
              color="orange" 
            />
            <StatsCard 
              icon={Clock} 
              value={market.avgWaitTime || "N/A"} 
              label="Tempo Médio" 
              color="purple" 
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-12">
        <div className="container mx-auto">
          <Tabs defaultValue="ships" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="ships" className="flex items-center space-x-2">
                <Ship className="h-4 w-4" />
                <span>Navios</span>
              </TabsTrigger>
              <TabsTrigger value="ports" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Portos</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Análises</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ships">
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Navios em Operação
                  </h3>
                  <Button variant="outline" size="sm" onClick={() => setShowExportMenu(true)}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Exportar Dados
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {loading && ships.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-slate-600 dark:text-slate-400">Carregando dados dos navios...</p>
                    </div>
                  ) : ships.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-slate-600 dark:text-slate-400">Nenhum navio encontrado.</p>
                    </div>
                  ) : (
                    ships.map((ship, index) => (
                      <ShipCard key={ship.id || index} ship={ship} />
                    ))
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ports">
              <div className="grid gap-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Principais Portos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loading && ports.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-slate-600 dark:text-slate-400">Carregando dados dos portos...</p>
                    </div>
                  ) : (
                    ports.map((port) => (
                      <PortCard key={port.id} port={port} />
                    ))
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid gap-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Análises e Tendências
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {loading && products.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-slate-600 dark:text-slate-400">Carregando análises...</p>
                    </div>
                  ) : (
                    <>
                      <ProductChart products={products} />
                      
                      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                        <CardHeader>
                          <CardTitle>Eficiência Portuária</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="text-center">
                              <p className="text-3xl font-bold text-green-600">{market.efficiency || 0}%</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Taxa de Ocupação Média</p>
                            </div>
                            <div className="text-center">
                              <p className="text-3xl font-bold text-blue-600">{market.avgOperationTime || 0}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Dias Médios de Operação</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Export Menu */}
      <ExportMenu
        isOpen={showExportMenu}
        onClose={() => setShowExportMenu(false)}
        ships={ships}
        ports={ports}
        products={products}
        market={market}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">
            © 2025 Navios Graneleiros Brasil. Dados coletados de fontes públicas e atualizados em tempo real.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Fontes: APPA, Porto de Santos, ANTAQ, Supabase
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

