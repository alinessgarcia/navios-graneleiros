import React from 'react'
import { Wifi, WifiOff, RefreshCw, Clock } from 'lucide-react'

const ConnectionStatus = ({ 
  isConnected, 
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
    if (error) return 'destructive'
    if (!isConnected) return 'secondary'
    if (loading) return 'outline'
    return 'default'
  }

  const getStatusText = () => {
    if (error) return 'Erro'
    if (!isConnected) return 'Offline'
    if (loading) return 'Atualizando...'
    return 'Online'
  }

  const getStatusIcon = () => {
    if (error || !isConnected) return WifiOff
    if (loading) return RefreshCw
    return Wifi
  }

  const StatusIcon = getStatusIcon()

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <StatusIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        <div className="text-right">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {lastUpdate ? 'Última atualização' : 'Status'}
          </p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {lastUpdate ? formatLastUpdate(lastUpdate) : getStatusText()}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 text-xs rounded ${
          error ? 'bg-red-100 text-red-800' :
          !isConnected ? 'bg-gray-100 text-gray-800' :
          loading ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {getStatusText()}
        </span>
        
        {error && (
          <button 
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 inline ${loading ? 'animate-spin' : ''}`} />
            Tentar Novamente
          </button>
        )}
      </div>
      
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
    </div>
  )
}

export default ConnectionStatus

