"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function UserInfoSkeleton() {
  return (
    <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-pulse">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Avatar Skeleton */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gray-200" />
            <div className="text-center sm:text-left">
              <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-20 bg-gray-200 rounded mb-1" />
              <div className="h-3 w-24 bg-gray-100 rounded" />
            </div>
          </div>
          {/* Bio & Actions Skeleton */}
          <div className="flex-1 space-y-4">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-100 rounded" />
            <div className="h-2 w-full bg-gray-100 rounded" />
            <div className="flex gap-2 mt-2">
              <div className="h-8 w-24 bg-gray-200 rounded" />
              <div className="h-8 w-32 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
        <div className="my-6 h-4 w-full bg-gray-100 rounded" />
        {/* Skills & Interests Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-16 bg-gray-100 rounded" />
              <div className="h-6 w-12 bg-gray-100 rounded" />
              <div className="h-6 w-14 bg-gray-100 rounded" />
            </div>
          </div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-16 bg-gray-100 rounded" />
              <div className="h-6 w-12 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
        <div className="my-6 h-4 w-full bg-gray-100 rounded" />
        {/* Links Skeleton */}
        <div>
          <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
          <div className="flex flex-wrap gap-4">
            <div className="h-6 w-20 bg-gray-100 rounded" />
            <div className="h-6 w-20 bg-gray-100 rounded" />
            <div className="h-6 w-20 bg-gray-100 rounded" />
            <div className="h-6 w-20 bg-gray-100 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}