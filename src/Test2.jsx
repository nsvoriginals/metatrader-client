// components/CryptoPriceCard.tsx
import { Card } from './components/ui/card'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'


const CryptoPriceCard = ({ 
  symbol = "BTCUSDT",
  price = 84952.356,
  percentChange = 5.6,
  data
}) => {
  // Generate sample data if not provided
  const chartData = data || Array.from({ length: 50 }, (_, i) => ({
    value: 40000 + Math.sin(i / 5) * 10000 + i * 900
  }))

  const isPositive = percentChange >= 0

  return (
    <Card className="bg-neutral-950 border-neutral-800 p-6 relative overflow-hidden h-full">
      {/* Header */}
      <div className="relative z-10 mb-2">
        <h3 className="text-neutral-400 text-sm font-medium tracking-wide">
          {symbol}
        </h3>
      </div>

      {/* Price */}
      <div className="relative z-10 mb-3">
        <div className="text-4xl font-bold text-white tracking-tight">
          ${price.toLocaleString('en-US', { 
            minimumFractionDigits: 3,
            maximumFractionDigits: 3 
          })}
        </div>
      </div>

      {/* Percentage Badge */}
      <div className="relative z-10 mb-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded border text-sm font-medium ${
          isPositive 
            ? 'bg-green-500/10 border-green-500/30 text-green-400' 
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {isPositive ? '+' : ''}{percentChange} %
        </span>
      </div>

      {/* Chart */}
      <div className="absolute inset-0 flex items-end">
        <ResponsiveContainer width="100%" height="70%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#ffffff" 
              strokeWidth={2}
              fill="url(#priceGradient)" 
              dot={false}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default CryptoPriceCard
