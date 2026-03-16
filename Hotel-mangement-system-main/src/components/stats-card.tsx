import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: React.ReactNode
}

export function StatsCard({ title, value, subtitle, icon }: StatsCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50">
      <CardContent className="flex items-center justify-between p-6 relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
        <div className="space-y-2 relative z-10">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">{value}</h2>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <div className="text-purple-400 opacity-80 relative z-10">{icon}</div>
      </CardContent>
    </Card>
  )
}

