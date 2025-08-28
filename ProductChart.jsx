import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'

const ProductChart = ({ products, title = "Produtos Mais Movimentados" }) => {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-slate-900 dark:text-white font-medium">
                {product.product}
              </span>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${product.percentage}%`,
                      backgroundColor: product.color
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white min-w-[3rem]">
                  {product.percentage}%
                </span>
                {product.tonnage && (
                  <span className="text-xs text-slate-600 dark:text-slate-400 min-w-[3rem]">
                    {product.tonnage}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductChart

