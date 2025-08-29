import React from 'react'
import { BarChart3 } from 'lucide-react'

const ProductChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>Nenhum dado disponível</p>
        </div>
      </div>
    )
  }

  const maxValue = Math.max(...data.map(item => item.value))

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="w-20 text-sm text-gray-600 text-right">
            {item.name}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-16 text-right">
                {item.value.toLocaleString()} t
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductChart
