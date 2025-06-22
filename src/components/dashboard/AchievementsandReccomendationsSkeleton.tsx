"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function AchievementsandRequestsSkeleton() {
  return (
    <div>
      {/* Achievements Skeleton */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-pulse mb-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="h-5 w-32 bg-gray-200 rounded mr-2" />
            <div className="h-5 w-24 bg-gray-100 rounded" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center p-3 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 mx-auto bg-gray-200 rounded-full mb-1" />
                <div className="h-3 w-20 bg-gray-200 rounded mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Recommended Projects Skeleton */}
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
              <div className="h-4 w-32 bg-gray-200 rounded mb-1" />
              <div className="h-3 w-24 bg-gray-100 rounded mb-1" />
              <div className="flex gap-2 mb-2">
                <div className="h-4 w-12 bg-gray-100 rounded" />
                <div className="h-4 w-10 bg-gray-100 rounded" />
                <div className="h-4 w-14 bg-gray-100 rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-3 w-20 bg-gray-100 rounded" />
                <div className="h-3 w-12 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
          <div className="h-8 w-full bg-gray-100 rounded mt-2" />
        </CardContent>
      </Card>
    </div>
  )
}
