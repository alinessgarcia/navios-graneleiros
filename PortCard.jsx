import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { MapPin, Ship, Calendar, TrendingUp } from 'lucide-react'

const PortCard = ({ port }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'operacional':
        return 'default'
      case 'manutenção':
        return 'secondary'
      case 'fechado':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return 'text-green-600'
    if (efficiency >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <span>{port.name}</span>
        </CardTitle>
        {port.code && (
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Código: {port.code} • {port.state}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Ship className="h-4 w-4 text-slate-500" />
              <span className="text-slate-600 dark:text-slate-400">Navios Atracados:</span>
            </div>
            <span className="font-medium text-slate-900 dark:text-white">
              {port.dockedShips}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span className="text-slate-600 dark:text-slate-400">Programados:</span>
            </div>
            <span className="font-medium text-slate-900 dark:text-white">
              {port.scheduledShips}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400">Status:</span>
            <Badge variant={getStatusColor(port.status)}>
              {port.status}
            </Badge>
          </div>
          
          {port.efficiency && (
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-slate-500" />
                <span className="text-slate-600 dark:text-slate-400">Eficiência:</span>
              </div>
              <span className={`font-medium ${getEfficiencyColor(port.efficiency)}`}>
                {port.efficiency}%
              </span>
            </div>
          )}
          
          {port.avgWaitTime && (
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Tempo Médio:</span>
              <span className="font-medium text-slate-900 dark:text-white">
                {port.avgWaitTime} dias
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PortCard

