import React from 'react'

const StatsCard = ({ icon: Icon, value, title, color = "blue" }) => {
  const getIconColor = (color) => {
    const colors = {
      blue: "text-blue-600",
      green: "text-green-600",
      orange: "text-orange-600",
      purple: "text-purple-600",
      red: "text-red-600",
      yellow: "text-yellow-600"
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="p-6 text-center">
        <Icon className={`h-8 w-8 ${getIconColor(color)} mx-auto mb-2`} />
        <p className="text-2xl font-bold text-gray-900">
          {value}
        </p>
        <p className="text-sm text-gray-600">
          {title}
        </p>
      </div>
    </div>
  )
}

export default StatsCard
