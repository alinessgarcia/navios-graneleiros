import React from 'react'
import { Anchor, MapPin, Users, TrendingUp } from 'lucide-react'

const PortCard = ({ port }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Ativo': 'bg-green-100 text-green-800 border-green-200',
      'Congestionado': 'bg-red-100 text-red-800 border-red-200',
      'Moderado': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Inativo': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 80) return 'text-green-600'
    if (efficiency >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Anchor className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {port.name}
              </h3>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {port.location}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Navios Atracados:</span>
            <span className="font-medium text-gray-900 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {port.shipsCount || 0}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Capacidade:</span>
            <span className="font-medium text-gray-900">
              {port.capacity || 'N/A'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status:</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(port.status)}`}>
              {port.status}
            </span>
          </div>
          
          {port.efficiency && (
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Eficiência:</span>
              </div>
              <span className={`font-medium ${getEfficiencyColor(port.efficiency)}`}>
                {port.efficiency}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PortCard
