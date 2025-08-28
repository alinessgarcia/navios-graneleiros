// Utility functions for data export

/**
 * Convert data to CSV format
 * @param {Array} data - Array of objects to convert
 * @param {string} filename - Name of the file to download
 */
export const exportToCSV = (data, filename = 'navios_graneleiros_data.csv') => {
  if (!data || data.length === 0) {
    alert('Nenhum dado disponível para exportar');
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    // Headers row
    headers.join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    )
  ].join('\n');

  // Create and download file
  downloadFile(csvContent, filename, 'text/csv');
};

/**
 * Convert data to Excel-compatible format (CSV with UTF-8 BOM)
 * @param {Array} data - Array of objects to convert
 * @param {string} filename - Name of the file to download
 */
export const exportToExcel = (data, filename = 'navios_graneleiros_data.csv') => {
  if (!data || data.length === 0) {
    alert('Nenhum dado disponível para exportar');
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content with UTF-8 BOM for Excel compatibility
  const csvContent = [
    // Headers row
    headers.join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    )
  ].join('\n');

  // Add UTF-8 BOM for Excel compatibility
  const BOM = '\uFEFF';
  const contentWithBOM = BOM + csvContent;

  // Create and download file
  downloadFile(contentWithBOM, filename, 'text/csv;charset=utf-8');
};

/**
 * Export data in Power BI compatible format (JSON)
 * @param {Array} data - Array of objects to convert
 * @param {string} filename - Name of the file to download
 */
export const exportToPowerBI = (data, filename = 'navios_graneleiros_data.json') => {
  if (!data || data.length === 0) {
    alert('Nenhum dado disponível para exportar');
    return;
  }

  // Create Power BI compatible JSON structure
  const powerBIData = {
    metadata: {
      title: 'Dados de Navios Graneleiros Brasil',
      description: 'Dados em tempo real sobre navios graneleiros nos portos brasileiros',
      source: 'Sistema de Monitoramento Portuário',
      exportDate: new Date().toISOString(),
      recordCount: data.length
    },
    data: data
  };

  const jsonContent = JSON.stringify(powerBIData, null, 2);
  downloadFile(jsonContent, filename, 'application/json');
};

/**
 * Export ships data with all relevant information
 * @param {Array} ships - Array of ship objects
 * @param {string} format - Export format ('csv', 'excel', 'powerbi')
 */
export const exportShipsData = (ships, format = 'csv') => {
  if (!ships || ships.length === 0) {
    alert('Nenhum dado de navios disponível para exportar');
    return;
  }

  // Flatten ship data for export
  const exportData = ships.map(ship => ({
    'Nome do Navio': ship.name || '',
    'IMO': ship.imo || '',
    'Produto': ship.product || '',
    'Tonelagem': ship.tonnage || '',
    'Porto': ship.port || '',
    'Status': ship.status || '',
    'Operador': ship.operator || '',
    'Agência': ship.agency || '',
    'DWT': ship.dwt || '',
    'LOA': ship.loa || '',
    'Chegada': ship.arrival || '',
    'Atracação': ship.docking || '',
    'Janela Operacional': ship.window || ''
  }));

  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  
  switch (format) {
    case 'excel':
      exportToExcel(exportData, `navios_graneleiros_${timestamp}.csv`);
      break;
    case 'powerbi':
      exportToPowerBI(exportData, `navios_graneleiros_${timestamp}.json`);
      break;
    default:
      exportToCSV(exportData, `navios_graneleiros_${timestamp}.csv`);
  }
};

/**
 * Export ports data
 * @param {Array} ports - Array of port objects
 * @param {string} format - Export format ('csv', 'excel', 'powerbi')
 */
export const exportPortsData = (ports, format = 'csv') => {
  if (!ports || ports.length === 0) {
    alert('Nenhum dado de portos disponível para exportar');
    return;
  }

  const exportData = ports.map(port => ({
    'Nome do Porto': port.name || '',
    'Código': port.code || '',
    'Estado': port.state || '',
    'Navios Atracados': port.docked || 0,
    'Navios Programados': port.scheduled || 0,
    'Status': port.status || '',
    'Eficiência (%)': port.efficiency || 0
  }));

  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  
  switch (format) {
    case 'excel':
      exportToExcel(exportData, `portos_${timestamp}.csv`);
      break;
    case 'powerbi':
      exportToPowerBI(exportData, `portos_${timestamp}.json`);
      break;
    default:
      exportToCSV(exportData, `portos_${timestamp}.csv`);
  }
};

/**
 * Export products/analytics data
 * @param {Array} products - Array of product objects
 * @param {string} format - Export format ('csv', 'excel', 'powerbi')
 */
export const exportProductsData = (products, format = 'csv') => {
  if (!products || products.length === 0) {
    alert('Nenhum dado de produtos disponível para exportar');
    return;
  }

  const exportData = products.map(product => ({
    'Produto': product.product || '',
    'Percentual (%)': product.percentage || 0,
    'Tonelagem': product.tonnage || '',
    'Cor': product.color || ''
  }));

  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  
  switch (format) {
    case 'excel':
      exportToExcel(exportData, `produtos_${timestamp}.csv`);
      break;
    case 'powerbi':
      exportToPowerBI(exportData, `produtos_${timestamp}.json`);
      break;
    default:
      exportToCSV(exportData, `produtos_${timestamp}.csv`);
  }
};

/**
 * Export complete dashboard data
 * @param {Object} dashboardData - Complete dashboard data object
 * @param {string} format - Export format ('csv', 'excel', 'powerbi')
 */
export const exportDashboardData = (dashboardData, format = 'powerbi') => {
  const { ships, ports, products, market } = dashboardData;
  
  if (format === 'powerbi') {
    const completeData = {
      metadata: {
        title: 'Dashboard Completo - Navios Graneleiros Brasil',
        description: 'Dados completos do sistema de monitoramento portuário',
        source: 'Sistema de Monitoramento Portuário',
        exportDate: new Date().toISOString(),
        sections: ['ships', 'ports', 'products', 'market_stats']
      },
      ships: ships || [],
      ports: ports || [],
      products: products || [],
      marketStats: market || {}
    };

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const jsonContent = JSON.stringify(completeData, null, 2);
    downloadFile(jsonContent, `dashboard_completo_${timestamp}.json`, 'application/json');
  } else {
    // For CSV/Excel, export each section separately
    if (ships && ships.length > 0) exportShipsData(ships, format);
    if (ports && ports.length > 0) exportPortsData(ports, format);
    if (products && products.length > 0) exportProductsData(products, format);
  }
};

/**
 * Helper function to download file
 * @param {string} content - File content
 * @param {string} filename - File name
 * @param {string} mimeType - MIME type
 */
const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  window.URL.revokeObjectURL(url);
  
  // Show success message
  console.log(`Arquivo ${filename} exportado com sucesso!`);
};

