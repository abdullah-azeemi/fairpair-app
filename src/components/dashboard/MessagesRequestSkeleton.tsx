"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function MessagesRequestSkeleton() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-pulse">
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="h-5 w-40 bg-gray-200 rounded mr-2" />
          <div className="h-5 w-24 bg-gray-100 rounded" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-3 border border-gray-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-4 w-10 bg-gray-100 rounded" />
                </div>
                <div className="h-3 w-24 bg-gray-100 rounded mb-1" />
                <div className="h-3 w-40 bg-gray-100 rounded mb-1" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        ))}
        <div className="h-8 w-full bg-gray-100 rounded mt-2" />
      </CardContent>
    </Card>
  )
}
