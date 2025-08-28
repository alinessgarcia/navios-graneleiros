// Data service for fetching real-time ship data from various port APIs
import { mockShipData, portData, productStats, marketStats } from '../data/mockData.js'

class DataService {
  constructor() {
    this.cache = new Map()
    this.cacheTimeout = 5 * 60 * 1000 // 5 minutes
    this.updateInterval = null
    this.subscribers = []
  }

  // Subscribe to data updates
  subscribe(callback) {
    this.subscribers.push(callback)
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback)
    }
  }

  // Notify all subscribers of data updates
  notifySubscribers(data) {
    this.subscribers.forEach(callback => callback(data))
  }

  // Check if cached data is still valid
  isCacheValid(key) {
    const cached = this.cache.get(key)
    if (!cached) return false
    return Date.now() - cached.timestamp < this.cacheTimeout
  }

  // Get cached data or fetch new data
  async getCachedData(key, fetchFunction) {
    if (this.isCacheValid(key)) {
      return this.cache.get(key).data
    }

    try {
      const data = await fetchFunction()
      this.cache.set(key, {
        data,
        timestamp: Date.now()
      })
      return data
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error)
      // Return cached data if available, even if expired
      const cached = this.cache.get(key)
      return cached ? cached.data : null
    }
  }

  // Fetch data from APPA (Porto de Paranaguá)
  async fetchAppaData() {
    // In a real implementation, this would make HTTP requests to the APPA API
    // For now, we'll simulate the API call with mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const appaShips = mockShipData.filter(ship => ship.port === 'Paranaguá')
        resolve(appaShips)
      }, 1000) // Simulate network delay
    })
  }

  // Fetch data from Porto de Santos
  async fetchSantosData() {
    // Simulate API call to Porto de Santos
    return new Promise((resolve) => {
      setTimeout(() => {
        // In real implementation, this would parse Santos port data
        const santosShips = [
          {
            id: 'santos_1',
            name: "BULK SANTOS",
            imo: "9123456",
            product: "SOJA",
            tonnage: "75.000,000",
            arrival: "22/08/2025 14:30",
            docking: "23/08/2025 08:15",
            window: "23/08/2025 08:15 - 26/08/2025 18:00",
            port: "Santos",
            status: "Atracado",
            operator: "SANTOS BRASIL",
            agency: "AGENCIA MARITIMA",
            dwt: "85.000,00",
            loa: "235,00"
          }
        ]
        resolve(santosShips)
      }, 1200)
    })
  }

  // Fetch data from Porto do Rio Grande
  async fetchRioGrandeData() {
    // Simulate API call to Porto do Rio Grande
    return new Promise((resolve) => {
      setTimeout(() => {
        const rioGrandeShips = [
          {
            id: 'rg_1',
            name: "RIO TRADER",
            imo: "9654321",
            product: "MILHO",
            tonnage: "68.500,000",
            arrival: "21/08/2025 09:45",
            docking: "22/08/2025 16:30",
            window: "22/08/2025 16:30 - 25/08/2025 12:00",
            port: "Rio Grande",
            status: "Atracado",
            operator: "SUPER TERMINAIS",
            agency: "WILSON SONS",
            dwt: "78.500,00",
            loa: "225,50"
          }
        ]
        resolve(rioGrandeShips)
      }, 800)
    })
  }

  // Get all ship data from all ports
  async getAllShipData() {
    return await this.getCachedData('all_ships', async () => {
      try {
        const [appaData, santosData, rioGrandeData] = await Promise.all([
          this.fetchAppaData(),
          this.fetchSantosData(),
          this.fetchRioGrandeData()
        ])

        const allShips = [...appaData, ...santosData, ...rioGrandeData]
        return allShips
      } catch (error) {
        console.error('Error fetching ship data:', error)
        return mockShipData // Fallback to mock data
      }
    })
  }

  // Get port statistics
  async getPortData() {
    return await this.getCachedData('port_data', async () => {
      // In real implementation, this would aggregate data from all ports
      return portData
    })
  }

  // Get product statistics
  async getProductStats() {
    return await this.getCachedData('product_stats', async () => {
      const ships = await this.getAllShipData()
      
      // Calculate real statistics from ship data
      const productCounts = {}
      let totalTonnage = 0

      ships.forEach(ship => {
        const product = ship.product.toLowerCase()
        if (!productCounts[product]) {
          productCounts[product] = { count: 0, tonnage: 0 }
        }
        productCounts[product].count++
        
        // Parse tonnage (remove commas and convert to number)
        const tonnage = parseFloat(ship.tonnage.replace(/[,\.]/g, ''))
        if (!isNaN(tonnage)) {
          productCounts[product].tonnage += tonnage
          totalTonnage += tonnage
        }
      })

      // Convert to percentage and format
      const stats = Object.entries(productCounts).map(([product, data]) => {
        const percentage = Math.round((data.tonnage / totalTonnage) * 100)
        return {
          product: product.charAt(0).toUpperCase() + product.slice(1),
          percentage,
          tonnage: `${(data.tonnage / 1000000).toFixed(1)}M`,
          color: this.getProductColor(product)
        }
      }).sort((a, b) => b.percentage - a.percentage)

      return stats
    })
  }

  // Get color for product visualization
  getProductColor(product) {
    const colors = {
      'soja': '#10b981',
      'milho': '#f59e0b',
      'farelo de soja': '#f97316',
      'fertilizantes': '#8b5cf6',
      'cloretos de potassio': '#06b6d4',
      'superfosfato': '#84cc16'
    }
    return colors[product.toLowerCase()] || '#6b7280'
  }

  // Get market statistics
  async getMarketStats() {
    return await this.getCachedData('market_stats', async () => {
      const ships = await this.getAllShipData()
      const ports = await this.getPortData()

      const totalShips = ships.length
      const activeOperations = ships.filter(ship => ship.status === 'Atracado').length
      
      // Calculate total tonnage
      let totalTonnage = 0
      ships.forEach(ship => {
        const tonnage = parseFloat(ship.tonnage.replace(/[,\.]/g, ''))
        if (!isNaN(tonnage)) {
          totalTonnage += tonnage
        }
      })

      return {
        totalShips,
        totalTonnage: `${(totalTonnage / 1000000).toFixed(1)}M`,
        activeOperations,
        avgWaitTime: "2.3 dias",
        efficiency: 92,
        avgOperationTime: 2.1,
        lastUpdate: new Date().toLocaleString('pt-BR')
      }
    })
  }

  // Start automatic data updates
  startAutoUpdate(intervalMs = 30000) { // Default: 30 seconds
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }

    this.updateInterval = setInterval(async () => {
      try {
        // Clear cache to force fresh data
        this.cache.clear()
        
        const [ships, ports, products, market] = await Promise.all([
          this.getAllShipData(),
          this.getPortData(),
          this.getProductStats(),
          this.getMarketStats()
        ])

        const updatedData = {
          ships,
          ports,
          products,
          market,
          timestamp: Date.now()
        }

        this.notifySubscribers(updatedData)
      } catch (error) {
        console.error('Error during auto-update:', error)
      }
    }, intervalMs)
  }

  // Stop automatic updates
  stopAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
  }

  // Manual refresh of all data
  async refreshAllData() {
    this.cache.clear()
    return {
      ships: await this.getAllShipData(),
      ports: await this.getPortData(),
      products: await this.getProductStats(),
      market: await this.getMarketStats()
    }
  }
}

// Export singleton instance
export const dataService = new DataService()
export default dataService

