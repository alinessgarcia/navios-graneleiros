import React from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'

const StatsCard = ({ icon: Icon, value, label, color = "blue" }) => {
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
    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 text-center">
        <Icon className={`h-8 w-8 ${getIconColor(color)} mx-auto mb-2`} />
        <p className="text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {label}
        </p>
      </CardContent>
    </Card>
  )
}

export default StatsCard

