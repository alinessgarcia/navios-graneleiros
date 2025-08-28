import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Truck, Calendar, Clock, Anchor, Ship } from 'lucide-react'

const ShipCard = ({ ship, showDetails = true }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'atracado':
        return 'default'
      case 'programado':
        return 'secondary'
      case 'em trânsito':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  const formatTonnage = (tonnage) => {
    if (typeof tonnage === 'string') {
      return tonnage.includes('Tons') ? tonnage : `${tonnage} Tons`
    }
    return `${tonnage} Tons`
  }

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-slate-900 dark:text-white flex items-center space-x-2">
            <Ship className="h-5 w-5 text-blue-600" />
            <span>{ship.name}</span>
          </CardTitle>
          <Badge variant={getStatusColor(ship.status)}>
            {ship.status}
          </Badge>
        </div>
        <CardDescription className="text-slate-600 dark:text-slate-400">
          {ship.product} • {ship.port}
        </CardDescription>
        {ship.imo && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            IMO: {ship.imo}
          </div>
        )}
      </CardHeader>
      
      {showDetails && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Tonelagem</p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {formatTonnage(ship.tonnage)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Chegada</p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {ship.arrival || 'N/A'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Janela Operacional</p>
                <p className="font-medium text-slate-900 dark:text-white text-xs">
                  {ship.window || 'N/A'}
                </p>
              </div>
            </div>
          </div>
          
          {(ship.operator || ship.agency) && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {ship.operator && (
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Operador:</span>
                    <span className="ml-2 font-medium text-slate-900 dark:text-white">
                      {ship.operator}
                    </span>
                  </div>
                )}
                {ship.agency && (
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Agência:</span>
                    <span className="ml-2 font-medium text-slate-900 dark:text-white">
                      {ship.agency}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {(ship.dwt || ship.loa) && (
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {ship.dwt && (
                <div>
                  <span className="text-slate-600 dark:text-slate-400">DWT:</span>
                  <span className="ml-2 font-medium text-slate-900 dark:text-white">
                    {ship.dwt}
                  </span>
                </div>
              )}
              {ship.loa && (
                <div>
                  <span className="text-slate-600 dark:text-slate-400">LOA:</span>
                  <span className="ml-2 font-medium text-slate-900 dark:text-white">
                    {ship.loa}m
                  </span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default ShipCard

