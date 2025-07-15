"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import useSWR from "swr"
import { formatDistanceToNow } from "date-fns"
import { Activity } from "@/types/activity";

export default function RecentActivity() {
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR('/api/activity', fetcher);

  return (
    <div>
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp size={20} className="mr-2 text-green-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <div>Loading...</div>}
          {error && <div className="text-red-500">Failed to load activity.</div>}
          {!isLoading && !error && (!data || data.length === 0) && (
            <div className="text-gray-500">No recent activity found.</div>
          )}
          <div className="space-y-4">
            {data && data.map((activity: Activity) => (
              <div key={activity.id} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {activity.type === 'project_posted' && `Posted "${activity.details?.title}" project`}
                </span>
                <span className="text-xs text-gray-400 ml-auto">{formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}