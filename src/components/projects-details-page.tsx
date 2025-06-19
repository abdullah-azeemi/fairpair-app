"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Users,
  Clock,
  Eye,
  Star,
  MessageCircle,
  Share2,
  Github,
  Linkedin,
  Mail,
  Globe,
  Target,
  Zap,
  Award,
} from "lucide-react"
import Link from "next/link"

const projectData = {
  id: "1",
  title: "AI-Powered Resume Builder",
  description: `A comprehensive resume builder that uses artificial intelligence to help users create professional, ATS-friendly resumes. The platform analyzes job descriptions and suggests relevant skills, experiences, and keywords to include.

Key features include:
- AI-powered content suggestions
- Multiple professional templates
- ATS optimization
- Real-time preview
- Export to PDF/Word
- Integration with LinkedIn

We're looking for passionate developers who want to help job seekers land their dream jobs. This is a great opportunity to work with cutting-edge AI technology while making a real impact on people's careers.`,
  author: {
    name: "Abdullah Musharaf",
    username: "abdullah",
    avatar: "/placeholder.svg?height=60&width=60",
    bio: "Full-stack developer passionate about AI and helping people succeed in their careers.",
    skills: ["React", "Node.js", "AI/ML", "Python", "PostgreSQL"],
    joinedDate: "March 2024",
    projectsCount: 8,
    collaborationsCount: 15,
    links: {
      github: "https://github.com/abdullah",
      linkedin: "https://linkedin.com/in/abdullah",
      email: "abdullah@example.com",
      portfolio: "https://abdullah.dev",
    },
  },
  category: "AI/ML",
  skillsNeeded: ["React", "Node.js", "Python", "AI/ML", "PostgreSQL", "Tailwind CSS"],
  timeline: "3-6 months",
  teamSize: "4-5 people",
  projectType: "Open Source",
  experienceLevel: "Intermediate",
  lookingForCollaborators: true,
  createdAt: "3 days ago",
  updatedAt: "1 day ago",
  views: 234,
  interested: 18,
  status: "Active",
  progress: 25,
  currentTeam: [
    {
      name: "Abdullah Musharaf",
      username: "abdullah",
      role: "Project Lead",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "Sarah Chen",
      username: "sarahc",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "Mike Rodriguez",
      username: "mikero",
      role: "AI Engineer",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  milestones: [
    { title: "Project Setup & Planning", completed: true, date: "Week 1" },
    { title: "AI Model Integration", completed: true, date: "Week 2-3" },
    { title: "Frontend Development", completed: false, date: "Week 4-6", current: true },
    { title: "Backend API Development", completed: false, date: "Week 7-9" },
    { title: "Testing & Deployment", completed: false, date: "Week 10-12" },
  ],
  techStack: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "OpenAI API", "Tailwind CSS", "Vercel"],
}

interface ProjectDetailsPageProps {
  params: {
    id: string
  }
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const [isInterested, setIsInterested] = useState(false)

  const handleInterest = () => {
    setIsInterested(!isInterested)
    // Handle interest toggle
  }

  const handleMessage = () => {
    // Navigate to messages or open chat
  }

  const handleJoinRequest = () => {
    // Handle join request
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/projects" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Back to Projects
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
              <Button
                variant={isInterested ? "default" : "outline"}
                size="sm"
                onClick={handleInterest}
                className={isInterested ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
              >
                <Star size={16} className="mr-2" />
                {isInterested ? "Interested" : "Add to Favorites"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h1 className="text-3xl font-bold text-gray-900">{projectData.title}</h1>
                      {projectData.lookingForCollaborators && (
                        <Badge className="bg-green-100 text-green-700">
                          <Users size={12} className="mr-1" />
                          Open for Collaboration
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {projectData.createdAt}
                      </span>
                      <span className="flex items-center">
                        <Eye size={14} className="mr-1" />
                        {projectData.views} views
                      </span>
                      <span className="flex items-center">
                        <Star size={14} className="mr-1" />
                        {projectData.interested} interested
                      </span>
                      <Badge variant="outline">{projectData.category}</Badge>
                    </div>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Target size={20} className="mx-auto text-blue-600 mb-1" />
                    <p className="text-sm font-medium text-blue-900">{projectData.timeline}</p>
                    <p className="text-xs text-blue-700">Timeline</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Users size={20} className="mx-auto text-purple-600 mb-1" />
                    <p className="text-sm font-medium text-purple-900">{projectData.teamSize}</p>
                    <p className="text-xs text-purple-700">Team Size</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Zap size={20} className="mx-auto text-green-600 mb-1" />
                    <p className="text-sm font-medium text-green-900">{projectData.experienceLevel}</p>
                    <p className="text-xs text-green-700">Experience</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Award size={20} className="mx-auto text-orange-600 mb-1" />
                    <p className="text-sm font-medium text-orange-900">{projectData.projectType}</p>
                    <p className="text-xs text-orange-700">Type</p>
                  </div>
                </div>

                {/* Skills Needed */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Skills Needed</h3>
                  <div className="flex flex-wrap gap-2">
                    {projectData.skillsNeeded.map((skill) => (
                      <Badge key={skill} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleJoinRequest}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Users size={16} className="mr-2" />
                    Request to Join
                  </Button>
                  <Button onClick={handleMessage} variant="outline" className="flex-1">
                    <MessageCircle size={16} className="mr-2" />
                    Message Owner
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Project Details Tabs */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <Tabs defaultValue="description" className="w-full">
                <CardHeader className="pb-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                    <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent>
                  <TabsContent value="description" className="space-y-4">
                    <div className="prose prose-sm max-w-none">
                      {projectData.description.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="team" className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Current Team ({projectData.currentTeam.length})
                    </h3>
                    <div className="space-y-3">
                      {projectData.currentTeam.map((member, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-600">
                              @{member.username} • {member.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="progress" className="space-y-4">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Overall Progress</h3>
                        <span className="text-sm text-blue-600 font-medium">{projectData.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${projectData.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {projectData.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              milestone.completed
                                ? "bg-green-500 border-green-500"
                                : milestone.current
                                  ? "bg-blue-500 border-blue-500"
                                  : "border-gray-300"
                            }`}
                          ></div>
                          <div className="flex-1">
                            <h4
                              className={`font-medium ${milestone.completed ? "text-green-700" : milestone.current ? "text-blue-700" : "text-gray-700"}`}
                            >
                              {milestone.title}
                            </h4>
                            <p className="text-sm text-gray-500">{milestone.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="tech" className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Technology Stack</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {projectData.techStack.map((tech) => (
                        <div key={tech} className="p-3 bg-gray-50 rounded-lg text-center">
                          <p className="font-medium text-gray-900">{tech}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Owner */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Project Owner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={projectData.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {projectData.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{projectData.author.name}</h3>
                    <p className="text-sm text-gray-600">@{projectData.author.username}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{projectData.author.bio}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Projects</span>
                    <span className="font-medium">{projectData.author.projectsCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Collaborations</span>
                    <span className="font-medium">{projectData.author.collaborationsCount}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {projectData.author.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between">
                  <a href={projectData.author.links.github} className="text-gray-600 hover:text-gray-900">
                    <Github size={18} />
                  </a>
                  <a href={projectData.author.links.linkedin} className="text-gray-600 hover:text-gray-900">
                    <Linkedin size={18} />
                  </a>
                  <a href={`mailto:${projectData.author.links.email}`} className="text-gray-600 hover:text-gray-900">
                    <Mail size={18} />
                  </a>
                  <a href={projectData.author.links.portfolio} className="text-gray-600 hover:text-gray-900">
                    <Globe size={18} />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Project Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Project Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge className="bg-green-100 text-green-700">{projectData.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Created</span>
                  <span className="text-sm font-medium">{projectData.createdAt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm font-medium">{projectData.updatedAt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Team Members</span>
                  <span className="text-sm font-medium">{projectData.currentTeam.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
