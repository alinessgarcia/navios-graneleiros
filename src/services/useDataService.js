// React hook for managing real-time data updates
import { useState, useEffect, useCallback } from 'react'
import { mockShipData, portData, productStats, marketStats } from './mockData.js'

export const useDataService = (autoUpdate = true, updateInterval = 30000) => {
  const [data, setData] = useState({
    ships: [],
    ports: [],
    products: [],
    stats: {
      totalShips: 0,
      activePorts: 0,
      totalCargo: 0
    },
    productionData: [],
    loading: true,
    error: null,
    lastUpdate: null
  })

  const [connectionStatus, setConnectionStatus] = useState('connected')

  // Load initial data
  const loadInitialData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }))
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const dockedShips = mockShipData.filter(ship => ship.status === 'Atracado').length
      const totalCargo = mockShipData.reduce((sum, ship) => {
        const tonnage = parseFloat(ship.tonnage.replace(/[^0-9.,]/g, '').replace(',', '.'))
        return sum + (isNaN(tonnage) ? 0 : tonnage)
      }, 0)
      
      setData({
        ships: mockShipData,
        ports: portData,
        products: productStats,
        stats: {
          totalShips: mockShipData.length,
          activePorts: portData.length,
          totalCargo: Math.round(totalCargo / 1000) // Convert to thousands
        },
        productionData: productStats,
        loading: false,
        error: null,
        lastUpdate: new Date()
      })
      
      setConnectionStatus('connected')
    } catch (error) {
      console.error('Error loading initial data:', error)
      setData(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Erro ao carregar dados'
      }))
      setConnectionStatus('disconnected')
    }
  }, [])

  // Handle data updates from service
  const handleDataUpdate = useCallback((updatedData) => {
    setData(prev => ({
      ...prev,
      ...updatedData,
      loading: false,
      error: null,
      lastUpdate: new Date()
    }))
    setConnectionStatus('connected')
  }, [])

  // Manual refresh function
  const refreshData = useCallback(async () => {
    await loadInitialData()
  }, [loadInitialData])

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

    // Auto-update if enabled
    let interval
    if (autoUpdate) {
      interval = setInterval(() => {
        loadInitialData()
      }, updateInterval)
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [loadInitialData, autoUpdate, updateInterval])

  // Connection status monitoring
  useEffect(() => {
    const checkConnection = () => {
      setConnectionStatus(navigator.onLine ? 'connected' : 'disconnected')
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
    stats: data.stats,
    productionData: data.productionData,
    
    // State
    loading: data.loading,
    error: data.error,
    lastUpdate: data.lastUpdate,
    connectionStatus,
    
    // Actions
    refreshData,
    filterShips,
    getShipsByPort,
    getProductStats
  }
}

export default useDataService

