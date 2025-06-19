"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, ArrowLeft, MoreVertical, Phone, Video, Paperclip, Smile, Check, CheckCheck } from "lucide-react"
import Link from "next/link"

// Mock conversations data
const conversations = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahc",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "That sounds like a great approach! When can we start?",
    time: "2m ago",
    unread: 2,
    online: true,
    project: "F1 Analytics Dashboard",
  },
  {
    id: "2",
    name: "Mike Rodriguez",
    username: "mikero",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've pushed the latest changes to the repo",
    time: "1h ago",
    unread: 0,
    online: false,
    project: "Smart Home IoT",
  },
  {
    id: "3",
    name: "Emma Wilson",
    username: "emmaw",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the feedback on the blockchain implementation",
    time: "3h ago",
    unread: 1,
    online: true,
    project: "Voting System",
  },
  {
    id: "4",
    name: "Alex Thompson",
    username: "alexthom",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The AI model is performing better than expected!",
    time: "1d ago",
    unread: 0,
    online: false,
    project: "Code Review Tool",
  },
]

// Mock messages for active conversation
const messages = [
  {
    id: "1",
    sender: "Sarah Chen",
    content: "Hey! I saw your F1 analytics project. Really impressive work!",
    time: "10:30 AM",
    isOwn: false,
    status: "read",
  },
  {
    id: "2",
    sender: "You",
    content: "Thanks! I'd love to collaborate on the data visualization part.",
    time: "10:32 AM",
    isOwn: true,
    status: "read",
  },
  {
    id: "3",
    sender: "Sarah Chen",
    content: "Perfect! I have experience with D3.js and React charts. What's your current tech stack?",
    time: "10:35 AM",
    isOwn: false,
    status: "read",
  },
  {
    id: "4",
    sender: "You",
    content: "We're using React, Node.js, and PostgreSQL. For visualization, I was thinking D3.js or Chart.js.",
    time: "10:37 AM",
    isOwn: true,
    status: "read",
  },
  {
    id: "5",
    sender: "Sarah Chen",
    content: "That sounds like a great approach! When can we start?",
    time: "10:40 AM",
    isOwn: false,
    status: "delivered",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileView, setIsMobileView] = useState(false)

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.project.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <ArrowLeft size={20} />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Messages
              </h1>
            </div>
            <Link href="/dashboard">
              <Button variant="ghost" className="hidden lg:flex">
                <ArrowLeft size={16} className="mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className={`bg-white/80 backdrop-blur-sm border-0 shadow-xl ${isMobileView ? "hidden lg:block" : ""}`}>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Conversations</CardTitle>
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-320px)]">
                <div className="space-y-1 p-4 pt-0">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => {
                        setSelectedConversation(conversation)
                        setIsMobileView(true)
                      }}
                      className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedConversation.id === conversation.id ? "bg-blue-50 border border-blue-200" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {conversation.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm text-gray-900 truncate">{conversation.name}</h4>
                            <span className="text-xs text-gray-500">{conversation.time}</span>
                          </div>
                          <Badge variant="outline" className="text-xs mb-1">
                            {conversation.project}
                          </Badge>
                          <p className="text-xs text-gray-600 truncate">{conversation.lastMessage}</p>
                        </div>
                        {conversation.unread > 0 && (
                          <Badge className="bg-blue-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card
            className={`lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-xl flex flex-col ${!isMobileView ? "hidden lg:flex" : ""}`}
          >
            {/* Chat Header */}
            <CardHeader className="pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMobileView(false)}>
                    <ArrowLeft size={16} />
                  </Button>
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedConversation.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {selectedConversation.project}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {selectedConversation.online ? "Online" : "Last seen 2h ago"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[calc(100vh-400px)] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[70%] p-3 rounded-2xl ${
                          message.isOwn
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className={`flex items-center justify-end mt-1 space-x-1`}>
                          <span className={`text-xs ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                            {message.time}
                          </span>
                          {message.isOwn && (
                            <div className="text-blue-100">
                              {message.status === "read" ? <CheckCheck size={12} /> : <Check size={12} />}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip size={16} />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="pr-10"
                  />
                  <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    <Smile size={16} />
                  </Button>
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
