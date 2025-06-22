"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
} from "lucide-react"

export default function RecentActivity(){
  return <div>
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp size={20} className="mr-2 text-green-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">Posted "AI Resume Builder" project</span>
                    <span className="text-xs text-gray-400 ml-auto">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">Completed "Smart Home Dashboard"</span>
                    <span className="text-xs text-gray-400 ml-auto">1 week ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">Joined Fair Pair community</span>
                    <span className="text-xs text-gray-400 ml-auto">1 month ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
}