import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Database, 
  TrendingUp,
  Ship,
  MapPin,
  BarChart3,
  X
} from 'lucide-react';
import { 
  exportShipsData, 
  exportPortsData, 
  exportProductsData, 
  exportDashboardData 
} from '../utils/exportUtils.js';

const ExportMenu = ({ 
  isOpen, 
  onClose, 
  ships = [], 
  ports = [], 
  products = [], 
  market = {} 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState(null);

  if (!isOpen) return null;

  const handleExport = async (dataType, format) => {
    setIsExporting(true);
    setExportType(`${dataType}_${format}`);

    try {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));

      switch (dataType) {
        case 'ships':
          exportShipsData(ships, format);
          break;
        case 'ports':
          exportPortsData(ports, format);
          break;
        case 'products':
          exportProductsData(products, format);
          break;
        case 'dashboard':
          exportDashboardData({ ships, ports, products, market }, format);
          break;
        default:
          throw new Error('Tipo de dados não reconhecido');
      }

      // Show success message
      setTimeout(() => {
        alert(`Dados exportados com sucesso!`);
      }, 100);

    } catch (error) {
      console.error('Erro na exportação:', error);
      alert('Erro ao exportar dados. Tente novamente.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const exportOptions = [
    {
      id: 'ships',
      title: 'Dados de Navios',
      description: `${ships.length} navios disponíveis`,
      icon: Ship,
      color: 'blue',
      data: ships
    },
    {
      id: 'ports',
      title: 'Dados de Portos',
      description: `${ports.length} portos disponíveis`,
      icon: MapPin,
      color: 'green',
      data: ports
    },
    {
      id: 'products',
      title: 'Análise de Produtos',
      description: `${products.length} produtos analisados`,
      icon: BarChart3,
      color: 'purple',
      data: products
    },
    {
      id: 'dashboard',
      title: 'Dashboard Completo',
      description: 'Todos os dados consolidados',
      icon: Database,
      color: 'orange',
      data: { ships, ports, products, market }
    }
  ];

  const formatOptions = [
    {
      id: 'csv',
      title: 'CSV',
      description: 'Compatível com Excel',
      icon: FileText,
      extension: '.csv'
    },
    {
      id: 'excel',
      title: 'Excel',
      description: 'Formato Excel otimizado',
      icon: FileSpreadsheet,
      extension: '.csv'
    },
    {
      id: 'powerbi',
      title: 'Power BI',
      description: 'JSON para Power BI',
      icon: TrendingUp,
      extension: '.json'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border border-slate-200 dark:border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Exportar Dados</span>
            </CardTitle>
            <CardDescription>
              Escolha os dados e o formato para exportação
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Export Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportOptions.map((option) => {
              const IconComponent = option.icon;
              const hasData = Array.isArray(option.data) ? option.data.length > 0 : Object.keys(option.data).length > 0;
              
              return (
                <Card 
                  key={option.id} 
                  className={`transition-all duration-200 ${
                    hasData 
                      ? 'hover:shadow-lg cursor-pointer border-slate-200 dark:border-slate-700' 
                      : 'opacity-50 cursor-not-allowed border-slate-100 dark:border-slate-800'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                        <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{option.title}</CardTitle>
                        <CardDescription className="text-xs">
                          {option.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  {hasData && (
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {formatOptions.map((format) => {
                          const FormatIcon = format.icon;
                          const isLoading = isExporting && exportType === `${option.id}_${format.id}`;
                          
                          return (
                            <Button
                              key={format.id}
                              variant="outline"
                              size="sm"
                              onClick={() => handleExport(option.id, format.id)}
                              disabled={isExporting}
                              className="flex items-center space-x-2 text-xs"
                            >
                              {isLoading ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                              ) : (
                                <FormatIcon className="h-3 w-3" />
                              )}
                              <span>{format.title}</span>
                            </Button>
                          );
                        })}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Format Information */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-3 flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Formatos Disponíveis</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {formatOptions.map((format) => (
                <div key={format.id} className="flex items-start space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {format.extension}
                  </Badge>
                  <div>
                    <p className="font-medium">{format.title}</p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {format.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2 text-blue-900 dark:text-blue-100">
              Como usar os dados exportados:
            </h4>
            <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
              <li>• <strong>CSV/Excel:</strong> Abra diretamente no Excel ou Google Sheets</li>
              <li>• <strong>Power BI:</strong> Importe o arquivo JSON como fonte de dados</li>
              <li>• <strong>Dashboard Completo:</strong> Inclui todos os dados em um único arquivo</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportMenu;

