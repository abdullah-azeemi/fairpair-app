"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle } from "lucide-react"

export type Request = {
  id: string
  type: string
  from: string
  avatar?: string
  project: string
  message: string
  time: string
}

export default function MessagesRequest({ incomingRequests }: { incomingRequests: Request[] }) {
  return (
    <div>
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle size={20} className="mr-2 text-orange-600" />
            Messages & Requests
            {incomingRequests.length > 0 && (
              <Badge className="ml-2 bg-orange-100 text-orange-700">{incomingRequests.length}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {incomingRequests.map((request: Request) => (
            <div
              key={request.id}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={request.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{request.from[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-bold mb-1">{request.message}</p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-gray-900">{request.from}</span>
                    <Badge variant="outline" className="text-xs">
                      {request.type}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-400">{request.time}</span>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full" size="sm">
            View All Messages
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}