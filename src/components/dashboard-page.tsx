"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Edit,
  Plus,
  Eye,
  MessageCircle,
  Users,
  Star,
  Github,
  Linkedin,
  Mail,
  Globe,
  MoreHorizontal,
  Clock,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react"
import Link from "next/link"

// Mock user data
const userData = {
  name: "Abdullah Musharaf",
  username: "abdullah",
  avatar: "/placeholder.svg?height=80&width=80",
  bio: "Full-stack developer passionate about AI and building products that make a difference. Love working on innovative projects with amazing teams.",
  skills: ["React", "Next.js", "Python", "AI/ML", "Node.js", "TypeScript"],
  interests: ["AI", "Education", "Self-driving cars", "Web3", "Robotics"],
  links: {
    github: "https://github.com/abdullah",
    linkedin: "https://linkedin.com/in/abdullah",
    email: "abdullah@example.com",
    portfolio: "https://abdullah.dev",
  },
  joinedDate: "March 2024",
  profileStrength: 85,
}

// Mock projects data
const userProjects = [
  {
    id: "1",
    title: "AI Resume Builder",
    description: "Smart resume generator using GPT-4",
    skills: ["React", "GPT-4", "Node.js"],
    createdAt: "2 days ago",
    views: 124,
    collaborators: 3,
    status: "active",
  },
  {
    id: "2",
    title: "Smart Home Dashboard",
    description: "IoT control panel with real-time monitoring",
    skills: ["React", "IoT", "Firebase"],
    createdAt: "1 week ago",
    views: 89,
    collaborators: 2,
    status: "completed",
  },
  {
    id: "3",
    title: "Learning Management System",
    description: "Educational platform for online courses",
    skills: ["Next.js", "PostgreSQL", "Stripe"],
    createdAt: "2 weeks ago",
    views: 156,
    collaborators: 5,
    status: "active",
  },
]

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
  const [activeTab, setActiveTab] = useState("overview")

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
        {/* User Info Summary */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Profile Picture & Basic Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-shrink-0">
                <Avatar className="w-20 h-20 ring-4 ring-blue-100">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                  <p className="text-gray-600">@{userData.username}</p>
                  <p className="text-sm text-gray-500 mt-1">Joined {userData.joinedDate}</p>
                </div>
              </div>

              {/* Bio & Actions */}
              <div className="flex-1 space-y-4">
                <p className="text-gray-700 leading-relaxed">{userData.bio}</p>

                {/* Profile Strength */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Profile Strength</span>
                    <span className="text-sm text-blue-600 font-medium">{userData.profileStrength}%</span>
                  </div>
                  <Progress value={userData.profileStrength} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Edit size={14} className="mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye size={14} className="mr-2" />
                    View Public Profile
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Skills & Interests */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Zap size={16} className="mr-2 text-blue-600" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill) => (
                    <Badge key={skill} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Star size={16} className="mr-2 text-purple-600" />
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userData.interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Links</h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href={userData.links.github}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github size={16} className="mr-2" />
                  GitHub
                </a>
                <a
                  href={userData.links.linkedin}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Linkedin size={16} className="mr-2" />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${userData.links.email}`}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Mail size={16} className="mr-2" />
                  Email
                </a>
                <a
                  href={userData.links.portfolio}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Globe size={16} className="mr-2" />
                  Portfolio
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Projects & Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* User's Projects */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Users size={20} className="mr-2 text-blue-600" />
                    My Projects ({userProjects.length})
                  </CardTitle>
                  <Link href="/projects/new">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <Plus size={14} className="mr-2" />
                      New Project
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {userProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                            {project.title}
                          </h4>
                          <Badge
                            className={
                              project.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            {project.createdAt}
                          </span>
                          <span className="flex items-center">
                            <Eye size={12} className="mr-1" />
                            {project.views} views
                          </span>
                          <span className="flex items-center">
                            <Users size={12} className="mr-1" />
                            {project.collaborators} collaborators
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Activity Timeline */}
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

          {/* Right Column - Messages & Recommendations */}
          <div className="space-y-8">
            {/* Incoming Messages/Requests */}
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
                {incomingRequests.map((request) => (
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
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-gray-900">{request.from}</span>
                          <Badge variant="outline" className="text-xs">
                            {request.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{request.project}</p>
                        <p className="text-xs text-gray-500 line-clamp-2">{request.message}</p>
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

            {/* Collaboration Badges */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award size={20} className="mr-2 text-yellow-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Users size={24} className="mx-auto text-blue-600 mb-1" />
                    <p className="text-xs font-medium text-blue-900">Team Player</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Zap size={24} className="mx-auto text-purple-600 mb-1" />
                    <p className="text-xs font-medium text-purple-900">Quick Starter</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Star size={24} className="mx-auto text-green-600 mb-1" />
                    <p className="text-xs font-medium text-green-900">Top Contributor</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Award size={24} className="mx-auto text-orange-600 mb-1" />
                    <p className="text-xs font-medium text-orange-900">Mentor</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Projects */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star size={20} className="mr-2 text-purple-600" />
                  Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{project.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">by {project.author}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{project.matchingSkills} skills match</span>
                      <span>{project.timeAgo}</span>
                    </div>
                  </div>
                ))}
                <Link href="/projects">
                  <Button variant="outline" className="w-full" size="sm">
                    Browse All Projects
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
