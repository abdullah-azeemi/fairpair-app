"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function ProjectListSkeleton() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-pulse">
      <CardHeader>
        <CardTitle>
          <div className="h-6 w-40 bg-gray-200 rounded mb-2" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border border-gray-200 rounded-lg">
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-48 bg-gray-100 rounded mb-2" />
            <div className="flex gap-2 mb-2">
              <div className="h-4 w-12 bg-gray-100 rounded" />
              <div className="h-4 w-10 bg-gray-100 rounded" />
              <div className="h-4 w-14 bg-gray-100 rounded" />
            </div>
            <div className="flex gap-4">
              <div className="h-3 w-16 bg-gray-100 rounded" />
              <div className="h-3 w-16 bg-gray-100 rounded" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}