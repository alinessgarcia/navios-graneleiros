import React from 'react'
import { Ship, MapPin, Calendar, Package, Anchor } from 'lucide-react'

const ShipCard = ({ ship }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Em Trânsito': 'bg-blue-100 text-blue-800 border-blue-200',
      'Atracado': 'bg-green-100 text-green-800 border-green-200',
      'Aguardando': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Carregando': 'bg-orange-100 text-orange-800 border-orange-200',
      'Descarregando': 'bg-purple-100 text-purple-800 border-purple-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const formatTonnage = (tonnage) => {
    if (tonnage >= 1000) {
      return `${(tonnage / 1000).toFixed(1)}k t`
    }
    return `${tonnage} t`
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Ship className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {ship.name}
              </h3>
              <p className="text-sm text-gray-600">
                IMO: {ship.imo}
              </p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(ship.status)}`}>
            {ship.status}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span>{ship.origin} → {ship.destination}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Anchor className="h-4 w-4 mr-2 text-gray-400" />
            <span>Porto: {ship.port}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Package className="h-4 w-4 mr-2 text-gray-400" />
            <span>{ship.cargo} - {formatTonnage(ship.tonnage)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>ETA: {formatDate(ship.eta)}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Progresso</span>
            <span className="font-medium text-gray-900">{ship.progress || 0}%</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${ship.progress || 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShipCard
