// Persistence service for automatic data synchronization with Supabase

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cljmddqpxpfoywgwmtkz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsam1kZHFweHBmb3l3Z3dtdGt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NzEzNjQsImV4cCI6MjA3MTA0NzM2NH0.LUI_ZuoDdDkun6zFWsQBs-RDnXnbik86_lBtkR204_4';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Persistence Service for automatic data synchronization
 */
class PersistenceService {
  constructor() {
    this.isOnline = navigator.onLine;
    this.syncQueue = [];
    this.lastSyncTime = null;
    this.syncInterval = null;
    
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processSyncQueue();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  /**
   * Start automatic synchronization
   * @param {number} intervalMs - Sync interval in milliseconds (default: 5 minutes)
   */
  startAutoSync(intervalMs = 5 * 60 * 1000) {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
    
    this.syncInterval = setInterval(() => {
      this.syncAllData();
    }, intervalMs);
    
    // Initial sync
    this.syncAllData();
  }

  /**
   * Stop automatic synchronization
   */
  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  /**
   * Sync all data to Supabase
   */
  async syncAllData() {
    if (!this.isOnline) {
      console.log('Offline - sync queued');
      return;
    }

    try {
      console.log('Starting data synchronization...');
      
      // Get current data from localStorage or generate fresh data
      const currentData = this.getCurrentData();
      
      // Sync vessels
      if (currentData.vessels && currentData.vessels.length > 0) {
        await this.syncVessels(currentData.vessels);
      }
      
      // Sync port operations
      if (currentData.portOperations && currentData.portOperations.length > 0) {
        await this.syncPortOperations(currentData.portOperations);
      }
      
      // Sync port metrics
      if (currentData.portMetrics && currentData.portMetrics.length > 0) {
        await this.syncPortMetrics(currentData.portMetrics);
      }
      
      this.lastSyncTime = new Date();
      console.log('Data synchronization completed successfully');
      
    } catch (error) {
      console.error('Sync failed:', error);
      this.addToSyncQueue('syncAllData', []);
    }
  }

  /**
   * Get current data from various sources
   */
  getCurrentData() {
    // This would normally fetch from your data service
    // For now, we'll generate sample data based on the mock structure
    return {
      vessels: this.generateVesselData(),
      portOperations: this.generatePortOperationData(),
      portMetrics: this.generatePortMetricData()
    };
  }

  /**
   * Generate vessel data for sync
   */
  generateVesselData() {
    const vessels = [];
    const ports = ['Paranaguá', 'Santos', 'Rio Grande', 'Vitória', 'São Luís'];
    const products = ['SOJA', 'MILHO', 'FARELO DE SOJA', 'FERTILIZANTES', 'CLORETOS DE POTASSIO'];
    const statuses = ['Atracado', 'Programado', 'Aguardando'];
    
    for (let i = 1; i <= 30; i++) {
      vessels.push({
        id: `vessel_${i}`,
        name: `VESSEL ${i}`,
        imo: `90${String(i).padStart(5, '0')}`,
        vessel_type: 'Bulk Carrier',
        flag: 'Brazil',
        dwt: Math.floor(Math.random() * 50000) + 30000,
        loa: Math.floor(Math.random() * 100) + 180,
        beam: Math.floor(Math.random() * 20) + 25,
        draft: Math.floor(Math.random() * 5) + 10,
        year_built: Math.floor(Math.random() * 20) + 2000,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        current_port: ports[Math.floor(Math.random() * ports.length)],
        cargo_type: products[Math.floor(Math.random() * products.length)],
        cargo_quantity: Math.floor(Math.random() * 80000) + 20000,
        eta: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        etd: new Date(Date.now() + Math.random() * 45 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
    
    return vessels;
  }

  /**
   * Generate port operation data for sync
   */
  generatePortOperationData() {
    const operations = [];
    const ports = ['Paranaguá', 'Santos', 'Rio Grande', 'Vitória', 'São Luís'];
    const operationTypes = ['Loading', 'Unloading', 'Bunkering', 'Maintenance'];
    
    for (let i = 1; i <= 20; i++) {
      operations.push({
        id: `operation_${i}`,
        vessel_id: `vessel_${Math.floor(Math.random() * 30) + 1}`,
        port_name: ports[Math.floor(Math.random() * ports.length)],
        berth_number: `Berth ${Math.floor(Math.random() * 10) + 1}`,
        operation_type: operationTypes[Math.floor(Math.random() * operationTypes.length)],
        cargo_type: 'SOJA',
        quantity_planned: Math.floor(Math.random() * 80000) + 20000,
        quantity_actual: Math.floor(Math.random() * 80000) + 20000,
        start_time: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
    
    return operations;
  }

  /**
   * Generate port metric data for sync
   */
  generatePortMetricData() {
    const metrics = [];
    const ports = ['Paranaguá', 'Santos', 'Rio Grande', 'Vitória', 'São Luís'];
    
    ports.forEach((port, index) => {
      metrics.push({
        id: `metric_${index + 1}`,
        port_name: port,
        date: new Date().toISOString().split('T')[0],
        vessels_in_port: Math.floor(Math.random() * 15) + 5,
        vessels_waiting: Math.floor(Math.random() * 8) + 2,
        average_waiting_time: Math.floor(Math.random() * 48) + 12,
        throughput_tons: Math.floor(Math.random() * 100000) + 50000,
        efficiency_percentage: Math.floor(Math.random() * 20) + 80,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    });
    
    return metrics;
  }

  /**
   * Sync vessel data to Supabase
   */
  async syncVessels(vessels) {
    try {
      // Upsert vessels (insert or update)
      const { data, error } = await supabase
        .from('vessels')
        .upsert(vessels, { onConflict: 'id' });
      
      if (error) throw error;
      console.log(`Synced ${vessels.length} vessels`);
      return data;
    } catch (error) {
      console.error('Error syncing vessels:', error);
      throw error;
    }
  }

  /**
   * Sync port operations to Supabase
   */
  async syncPortOperations(operations) {
    try {
      const { data, error } = await supabase
        .from('port_operations')
        .upsert(operations, { onConflict: 'id' });
      
      if (error) throw error;
      console.log(`Synced ${operations.length} port operations`);
      return data;
    } catch (error) {
      console.error('Error syncing port operations:', error);
      throw error;
    }
  }

  /**
   * Sync port metrics to Supabase
   */
  async syncPortMetrics(metrics) {
    try {
      const { data, error } = await supabase
        .from('port_metrics')
        .upsert(metrics, { onConflict: 'id' });
      
      if (error) throw error;
      console.log(`Synced ${metrics.length} port metrics`);
      return data;
    } catch (error) {
      console.error('Error syncing port metrics:', error);
      throw error;
    }
  }

  /**
   * Add failed operations to sync queue
   */
  addToSyncQueue(operation, data) {
    this.syncQueue.push({
      operation,
      data,
      timestamp: new Date(),
      retries: 0
    });
  }

  /**
   * Process queued sync operations
   */
  async processSyncQueue() {
    if (!this.isOnline || this.syncQueue.length === 0) {
      return;
    }

    const queue = [...this.syncQueue];
    this.syncQueue = [];

    for (const item of queue) {
      try {
        if (item.retries < 3) {
          await this[item.operation](item.data);
        }
      } catch (error) {
        item.retries++;
        if (item.retries < 3) {
          this.syncQueue.push(item);
        }
      }
    }
  }

  /**
   * Get sync status
   */
  getSyncStatus() {
    return {
      isOnline: this.isOnline,
      lastSyncTime: this.lastSyncTime,
      queuedOperations: this.syncQueue.length,
      autoSyncActive: !!this.syncInterval
    };
  }

  /**
   * Force immediate sync
   */
  async forcSync() {
    return await this.syncAllData();
  }
}

// Export singleton instance
export const persistenceService = new PersistenceService();
export default persistenceService;

