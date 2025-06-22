"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Plus,
} from "lucide-react"
import Link from "next/link"
import UserInfo from "./dashboard/UserInfo"
import ProjectList from "./dashboard/ProjectsList"
import RecentActivity from "./dashboard/RecentActivity"
import RecentActivitySkeleton from "./dashboard/RecentActivitySkeleton"
import MessagesRequest from "./dashboard/MessagesRequest"
import MessagesRequestSkeleton from "./dashboard/MessagesRequestSkeleton"
import AchievementsandReccomendations from "./dashboard/AchievementsandReccomendations"
import AchievementsandReccomendationsSkeleton from "./dashboard/AchievementsandReccomendationsSkeleton"

// Mock messages/requests
const incomingRequests = [
  {
    id: "1",
    type: "collaboration",
    from: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    project: "F1 Analytics Dashboard",
    message: "Would love to collaborate on data visualization!",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "message",
    from: "Mike Rodriguez",
    avatar: "/placeholder.svg?height=32&width=32",
    project: "IoT Controller",
    message: "Great work on the smart home project!",
    time: "1 day ago",
  },
]

// Mock recommended projects
const recommendedProjects = [
  {
    id: "1",
    title: "Voice Assistant AI",
    author: "Emma Wilson",
    skills: ["Python", "AI/ML", "React"],
    matchingSkills: 3,
    timeAgo: "5 hours ago",
  },
  {
    id: "2",
    title: "Blockchain Voting App",
    author: "David Park",
    skills: ["React", "Web3", "Node.js"],
    matchingSkills: 2,
    timeAgo: "1 day ago",
  },
  {
    id: "3",
    title: "Educational Game Platform",
    author: "Lisa Zhang",
    skills: ["React", "Node.js", "AI/ML"],
    matchingSkills: 3,
    timeAgo: "3 days ago",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const userLoading = false;
  const requests = incomingRequests;
  const Reccomendations = recommendedProjects;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}  
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Fair Pair
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/projects">
                <Button variant="ghost">Browse Projects</Button>
              </Link>
              <Link href="/projects/new">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Plus size={16} className="mr-2" />
                  Post Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
          <div>
            <UserInfo />
          </div>
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Projects & Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* User's Projects */}
              <div>
                <ProjectList />
              </div>
            {/* Activity Timeline */}
              <div>
                {userLoading? <RecentActivitySkeleton />: <RecentActivity />}
              </div>
          </div>
            
          {/* Right Column - Messages & Recommendations */}
          <div className="space-y-8">
            {/* Incoming Messages/Requests */}

              <div>
                {userLoading? <MessagesRequestSkeleton />: <MessagesRequest incomingRequests={incomingRequests} />}
              </div>
            
            {/* Collaboration Badges and Reccomendations */}
              <div>
                {userLoading? <AchievementsandReccomendationsSkeleton />: <AchievementsandReccomendations recommendedProjects={Reccomendations} />}
              </div>
          
          </div>
        </div>
      </div>
    </div>
  )
}
