import React from 'react'
import { Wifi, WifiOff, RefreshCw, Clock } from 'lucide-react'

const ConnectionStatus = ({ 
  status = 'connected', 
  lastUpdate, 
  loading, 
  error, 
  onRefresh 
}) => {
  const formatLastUpdate = (date) => {
    if (!date) return 'Nunca'
    
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Agora mesmo'
    if (minutes === 1) return '1 minuto atrás'
    if (minutes < 60) return `${minutes} minutos atrás`
    
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getStatusColor = () => {
    if (error) return 'bg-red-100 text-red-800 border-red-200'
    if (status === 'disconnected') return 'bg-gray-100 text-gray-800 border-gray-200'
    if (loading) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-green-100 text-green-800 border-green-200'
  }

  const getStatusText = () => {
    if (error) return 'Erro'
    if (status === 'disconnected') return 'Offline'
    if (loading) return 'Atualizando...'
    return 'Online'
  }

  const getStatusIcon = () => {
    if (error || status === 'disconnected') return WifiOff
    if (loading) return RefreshCw
    return Wifi
  }

  const StatusIcon = getStatusIcon()

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <StatusIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        <div className="text-right">
          <p className="text-sm text-gray-600">
            {lastUpdate ? 'Última atualização' : 'Status'}
          </p>
          <p className="text-sm font-medium text-gray-900">
            {lastUpdate ? formatLastUpdate(lastUpdate) : getStatusText()}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor()}`}>
          {getStatusText()}
        </span>
        
        {error && onRefresh && (
          <button 
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Tentar Novamente
          </button>
        )}
      </div>
      
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
    </div>
  )
}

export default ConnectionStatus
