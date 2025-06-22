"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function RecentActivitySkeleton() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-pulse">
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="h-5 w-32 bg-gray-200 rounded mr-2" />
          <div className="h-5 w-24 bg-gray-100 rounded" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <div className="h-4 w-48 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-100 rounded ml-auto" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
