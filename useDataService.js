// React hook for managing real-time data updates
import { useState, useEffect, useCallback } from 'react'
import { dataService } from '../services/dataService.js'
import persistenceService from '../services/persistenceService.js'

export const useDataService = (autoUpdate = true, updateInterval = 30000) => {
  const [data, setData] = useState({
    ships: [],
    ports: [],
    products: [],
    market: {},
    loading: true,
    error: null,
    lastUpdate: null
  })

  const [isConnected, setIsConnected] = useState(true)

  // Load initial data
  const loadInitialData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }))
      
      const initialData = await dataService.refreshAllData()
      
      setData({
        ...initialData,
        loading: false,
        error: null,
        lastUpdate: new Date()
      })
      
      setIsConnected(true)
    } catch (error) {
      console.error('Error loading initial data:', error)
      setData(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Erro ao carregar dados'
      }))
      setIsConnected(false)
    }
  }, [])

  // Handle data updates from service
  const handleDataUpdate = useCallback((updatedData) => {
    setData(prev => ({
      ...prev,
      ...updatedData,
      loading: false,
      error: null,
      lastUpdate: new Date(updatedData.timestamp)
    }))
    setIsConnected(true)
  }, [])

  // Manual refresh function
  const refresh = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true }))
      const refreshedData = await dataService.refreshAllData()
      
      setData(prev => ({
        ...prev,
        ...refreshedData,
        loading: false,
        error: null,
        lastUpdate: new Date()
      }))
      
      setIsConnected(true)
    } catch (error) {
      console.error('Error refreshing data:', error)
      setData(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Erro ao atualizar dados'
      }))
      setIsConnected(false)
    }
  }, [])

  // Filter ships by various criteria
  const filterShips = useCallback((criteria) => {
    const { status, product, port } = criteria
    
    return data.ships.filter(ship => {
      if (status && status !== 'all' && ship.status.toLowerCase() !== status.toLowerCase()) {
        return false
      }
      if (product && product !== 'all' && !ship.product.toLowerCase().includes(product.toLowerCase())) {
        return false
      }
      if (port && port !== 'all' && ship.port !== port) {
        return false
      }
      return true
    })
  }, [data.ships])

  // Get ships by port
  const getShipsByPort = useCallback((portName) => {
    return data.ships.filter(ship => ship.port === portName)
  }, [data.ships])

  // Get statistics for a specific product
  const getProductStats = useCallback((productName) => {
    return data.products.find(p => 
      p.product.toLowerCase() === productName.toLowerCase()
    )
  }, [data.products])

  // Setup effect
  useEffect(() => {
    // Load initial data
    loadInitialData()

    // Subscribe to data service updates
    const unsubscribe = dataService.subscribe(handleDataUpdate)

    // Start auto-update if enabled
    if (autoUpdate) {
      dataService.startAutoUpdate(updateInterval)
    }

    // Start persistence service for automatic sync
    persistenceService.startAutoSync(5 * 60 * 1000) // Sync every 5 minutes

    // Cleanup function
    return () => {
      unsubscribe()
      if (autoUpdate) {
        dataService.stopAutoUpdate()
      }
      persistenceService.stopAutoSync()
    }
  }, [loadInitialData, handleDataUpdate, autoUpdate, updateInterval])

  // Connection status monitoring
  useEffect(() => {
    const checkConnection = () => {
      setIsConnected(navigator.onLine)
    }

    window.addEventListener('online', checkConnection)
    window.addEventListener('offline', checkConnection)

    return () => {
      window.removeEventListener('online', checkConnection)
      window.removeEventListener('offline', checkConnection)
    }
  }, [])

  return {
    // Data
    ships: data.ships,
    ports: data.ports,
    products: data.products,
    market: data.market,
    
    // State
    loading: data.loading,
    error: data.error,
    lastUpdate: data.lastUpdate,
    isConnected,
    
    // Actions
    refresh,
    filterShips,
    getShipsByPort,
    getProductStats,
    
    // Computed values
    totalShips: data.ships.length,
    dockedShips: data.ships.filter(ship => ship.status === 'Atracado').length,
    scheduledShips: data.ships.filter(ship => ship.status === 'Programado').length,
    
    // Persistence functions
    syncStatus: persistenceService.getSyncStatus(),
    forceSync: persistenceService.forcSync.bind(persistenceService),
    
    // Data service instance (for advanced usage)
    dataService,
    persistenceService
  }
}

export default useDataService

