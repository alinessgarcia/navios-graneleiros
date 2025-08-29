import React, { useState } from 'react'
import { Download, X, FileText, Ship, Anchor, BarChart3 } from 'lucide-react'

const ExportMenu = ({ onClose, ships, ports }) => {
  const [isExporting, setIsExporting] = useState(false)
  const [exportType, setExportType] = useState('')

  const exportOptions = [
    {
      id: 'ships',
      title: 'Dados dos Navios',
      description: `${ships?.length || 0} navios disponíveis`,
      icon: Ship,
      data: ships || []
    },
    {
      id: 'ports',
      title: 'Dados dos Portos',
      description: `${ports?.length || 0} portos disponíveis`,
      icon: Anchor,
      data: ports || []
    },
    {
      id: 'dashboard',
      title: 'Dashboard Completo',
      description: 'Todos os dados em um arquivo',
      icon: BarChart3,
      data: { ships: ships || [], ports: ports || [] }
    }
  ]

  const handleExport = async (dataType, format) => {
    setIsExporting(true)
    setExportType(`${dataType}_${format}`)

    try {
      const option = exportOptions.find(opt => opt.id === dataType)
      if (!option) return

      let csvContent = ''
      let filename = ''

      if (dataType === 'ships') {
        csvContent = 'Nome,IMO,Status,Origem,Destino,Porto,Carga,Tonelagem,ETA,Progresso\n'
        option.data.forEach(ship => {
          csvContent += `"${ship.name}","${ship.imo}","${ship.status}","${ship.origin}","${ship.destination}","${ship.port}","${ship.cargo}","${ship.tonnage}","${ship.eta}","${ship.progress || 0}"\n`
        })
        filename = 'navios_graneleiros.csv'
      } else if (dataType === 'ports') {
        csvContent = 'Nome,Localização,Status,Navios Atracados,Capacidade,Eficiência\n'
        option.data.forEach(port => {
          csvContent += `"${port.name}","${port.location}","${port.status}","${port.shipsCount || 0}","${port.capacity || 'N/A'}","${port.efficiency || 'N/A'}"\n`
        })
        filename = 'portos_graneleiros.csv'
      } else if (dataType === 'dashboard') {
        csvContent = 'Tipo,Nome,Detalhes\n'
        option.data.ships.forEach(ship => {
          csvContent += `"Navio","${ship.name}","${ship.status} - ${ship.port}"\n`
        })
        option.data.ports.forEach(port => {
          csvContent += `"Porto","${port.name}","${port.status} - ${port.location}"\n`
        })
        filename = 'dashboard_completo.csv'
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTimeout(() => {
        setIsExporting(false)
        setExportType('')
      }, 1000)
    } catch (error) {
      console.error('Erro ao exportar:', error)
      setIsExporting(false)
      setExportType('')
    }
  }

  const formatOptions = [
    {
      id: 'csv',
      title: 'CSV',
      description: 'Compatível com Excel',
      icon: FileText,
      extension: '.csv'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg border border-gray-200 shadow-lg">
        <div className="flex flex-row items-center justify-between p-6 border-b border-gray-200">
          <div>
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span className="text-lg font-semibold">Exportar Dados</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Escolha os dados e o formato para exportação
            </p>
          </div>
          <button 
            onClick={onClose}
            className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportOptions.map((option) => {
              const IconComponent = option.icon
              const hasData = Array.isArray(option.data) ? option.data.length > 0 : Object.keys(option.data).length > 0
              
              return (
                <div 
                  key={option.id} 
                  className={`bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-200 ${
                    hasData 
                      ? 'hover:shadow-lg cursor-pointer' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="p-4 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold">{option.title}</h4>
                        <p className="text-xs text-gray-600">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {hasData && (
                    <div className="px-4 pb-4">
                      <div className="flex flex-wrap gap-2">
                        {formatOptions.map((format) => {
                          const FormatIcon = format.icon
                          const isLoading = isExporting && exportType === `${option.id}_${format.id}`
                          
                          return (
                            <button
                              key={format.id}
                              onClick={() => handleExport(option.id, format.id)}
                              disabled={isExporting}
                              className="flex items-center space-x-2 text-xs px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                            >
                              {isLoading ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                              ) : (
                                <FormatIcon className="h-3 w-3" />
                              )}
                              <span>{format.title}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2 text-blue-900">
              Como usar os dados exportados:
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• <strong>CSV:</strong> Abra diretamente no Excel ou Google Sheets</li>
              <li>• Os dados incluem informações completas dos navios e portos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportMenu
