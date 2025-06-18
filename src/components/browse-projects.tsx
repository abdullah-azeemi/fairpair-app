"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Clock, Users, Eye, MessageCircle, Star } from "lucide-react"
import Link from "next/link"

// Mock data for projects
const mockProjects = [
  {
    id: "1",
    title: "Open Source Resume Builder",
    description:
      "A tool to auto-generate resumes using AI and customizable templates. Looking for frontend developers to help with the UI/UX and backend developers for API integration.",
    author: {
      name: "Abdullah Khan",
      username: "abdullah",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["React", "Node.js", "AI/ML"],
    },
    skillsNeeded: ["React", "Tailwind", "GPT-4", "Node.js"],
    timeAdded: "3 hours ago",
    lookingForCollaborators: true,
    category: "Web Development",
  },
  {
    id: "2",
    title: "F1 Race Analytics Dashboard",
    description:
      "Real-time F1 race data visualization with telemetry analysis. Building interactive charts and predictive models for race outcomes.",
    author: {
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Python", "Data Science", "React"],
    },
    skillsNeeded: ["Python", "React", "D3.js", "Machine Learning"],
    timeAdded: "1 day ago",
    lookingForCollaborators: true,
    category: "Data Science",
  },
  {
    id: "3",
    title: "Smart Home IoT Controller",
    description:
      "Arduino-based home automation system with mobile app control. Integrating sensors, actuators, and cloud connectivity.",
    author: {
      name: "Mike Rodriguez",
      username: "mikero",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Arduino", "Flutter", "IoT"],
    },
    skillsNeeded: ["Arduino", "Flutter", "Firebase", "C++"],
    timeAdded: "2 days ago",
    lookingForCollaborators: false,
    category: "IoT",
  },
  {
    id: "4",
    title: "AI-Powered Code Review Tool",
    description:
      "Automated code review system using machine learning to detect bugs, suggest improvements, and enforce coding standards.",
    author: {
      name: "Alex Thompson",
      username: "alexthom",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Python", "AI/ML", "DevOps"],
    },
    skillsNeeded: ["Python", "TensorFlow", "Docker", "React"],
    timeAdded: "5 hours ago",
    lookingForCollaborators: true,
    category: "AI/ML",
  },
  {
    id: "5",
    title: "Blockchain Voting System",
    description:
      "Secure, transparent voting platform using blockchain technology. Ensuring vote integrity and anonymity.",
    author: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Solidity", "React", "Blockchain"],
    },
    skillsNeeded: ["Solidity", "Web3", "React", "Node.js"],
    timeAdded: "1 week ago",
    lookingForCollaborators: true,
    category: "Blockchain",
  },
  {
    id: "6",
    title: "Mobile Fitness Tracker",
    description:
      "Cross-platform fitness app with workout tracking, nutrition logging, and social features for motivation.",
    author: {
      name: "David Park",
      username: "davidp",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Flutter", "Firebase", "UI/UX"],
    },
    skillsNeeded: ["Flutter", "Firebase", "Dart", "UI/UX"],
    timeAdded: "3 days ago",
    lookingForCollaborators: true,
    category: "Mobile Development",
  },
]

// Mock user skills for highlighting common skills
const userSkills = ["React", "Python", "Node.js", "AI/ML"]

export default function BrowseProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Get all unique skills for filter dropdown
  const allSkills = useMemo(() => {
    const skills = new Set<string>()
    mockProjects.forEach((project) => {
      project.skillsNeeded.forEach((skill) => skills.add(skill))
    })
    return Array.from(skills).sort()
  }, [])

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    const filtered = mockProjects.filter((project) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.author.name.toLowerCase().includes(searchQuery.toLowerCase())

      // Skill filter
      const matchesSkill = selectedSkill === "all" || project.skillsNeeded.includes(selectedSkill)

      // Time filter
      const matchesTime =
        timeFilter === "all" ||
        (timeFilter === "today" && project.timeAdded.includes("hours")) ||
        (timeFilter === "week" && (project.timeAdded.includes("day") || project.timeAdded.includes("hours")))

      return matchesSearch && matchesSkill && matchesTime
    })

    // Sort projects
    if (sortBy === "recent") {
      // Sort by most recent (simplified)
      filtered.sort((a, b) => {
        if (a.timeAdded.includes("hours") && !b.timeAdded.includes("hours")) return -1
        if (!a.timeAdded.includes("hours") && b.timeAdded.includes("hours")) return 1
        return 0
      })
    }

    return filtered
  }, [searchQuery, selectedSkill, timeFilter, sortBy])

  const getCommonSkills = (projectSkills: string[]) => {
    return projectSkills.filter((skill) => userSkills.includes(skill))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Browse Projects
              </h1>
              <p className="text-gray-600 mt-1">Discover amazing projects and find your next collaboration</p>
            </div>
            <Link href="/projects/new">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Post Project
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search projects, skills, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="w-40 h-11 bg-white/80 backdrop-blur-sm">
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="All Skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {allSkills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-32 h-11 bg-white/80 backdrop-blur-sm">
                  <Clock size={16} className="mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 h-11 bg-white/80 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const commonSkills = getCommonSkills(project.skillsNeeded)

            return (
              <Card
                key={project.id}
                className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:-translate-y-1"
              >
                <CardHeader className="pb-4">
                  {/* Project Title */}
                  <div className="flex items-start justify-between mb-3">
                    <Link href={`/projects/${project.id}`}>
                      <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                        {project.title}
                      </h3>
                    </Link>
                    {project.lookingForCollaborators && (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        <Users size={12} className="mr-1" />
                        Open
                      </Badge>
                    )}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={project.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {project.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">@{project.author.username}</span>
                        <div className="flex space-x-1">
                          {project.author.skills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs px-1 py-0">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Clock size={12} className="mr-1" />
                    {project.timeAdded}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

                  {/* Skills Needed */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Skills Needed:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.skillsNeeded.map((skill) => {
                        const isCommon = commonSkills.includes(skill)
                        return (
                          <Badge
                            key={skill}
                            className={`text-xs ${
                              isCommon ? "bg-blue-100 text-blue-700 border-blue-300" : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {skill}
                            {isCommon && <Star size={10} className="ml-1 fill-current" />}
                          </Badge>
                        )
                      })}
                    </div>
                    {commonSkills.length > 0 && (
                      <p className="text-xs text-blue-600 mt-1">
                        <Star size={10} className="inline mr-1" />
                        {commonSkills.length} skill{commonSkills.length !== 1 ? "s" : ""} in common
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link href={`/projects/${project.id}`} className="flex-1">
                      <Button className="w-full h-9 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm">
                        <Eye size={14} className="mr-2" />
                        View Project
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="h-9 px-3">
                      <MessageCircle size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedSkill("all")
                setTimeFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
