"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TagInput } from "@/components/ui/tag-input"
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
  Target,
  Zap,
  Award,
  Edit,
  Plus,
  X,
  Search,
  Check,
  Trash2,
  UserPlus,
  Settings,
  Code,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"


interface ProjectMember {
  id: string
  name: string
  username: string
  role: string
  joinedAt: string
  bio: string
  skills: string[]
}

interface Milestone {
  id: string
  title: string
  completed: boolean
  date: string
  current?: boolean
}

interface ProjectAuthor {
  id: string
  name: string
  username: string
  bio: string
  skills: string[]
  joinedDate: string
  links: {
    github?: string
    linkedin?: string
    email?: string
  }
}

interface ProjectData {
  id: string
  title: string
  description: string
  author: ProjectAuthor
  category: string
  skillsNeeded: string[]
  timeline: string
  teamsize: string
  project_type: string
  experience: string
  lookingForCollaborators: boolean
  createdAt: string
  updatedAt: string
  views: number
  interested: number
  status: string
  progress: number
  currentTeam: ProjectMember[]
  milestones: Milestone[]
  techStack: string[]
}

interface ProjectDetailsPageProps {
  params: {
    id: string
  }
}

interface User { id: string; username: string; name?: string; email?: string; }

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<Partial<ProjectData>>({});
  const [showAddMember, setShowAddMember] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newMemberRole, setNewMemberRole] = useState("");
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressData, setProgressData] = useState({ progress: 0, milestones: [] as Milestone[] });
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInterested, setIsInterested] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const TIMELINE_OPTIONS = [
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3-6 months",
    "6+ months",
    "Ongoing"
  ];
  const TEAM_SIZE_OPTIONS = [
    "Just me",
    "2-3 people",
    "4-5 people",
    "6-10 people",
    "10+ people"
  ];

  const isValidId = !!params?.id;

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await fetch('/api/user');
      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      router.push("/login");
    }
  }, [router]);
  
  const fetchProjectData = useCallback(async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProjectData(data);
        setIsOwner(currentUser?.id === data.author.id);
        setEditData(data);
        setProgressData({
          progress: data.progress || 0,
          milestones: data.milestones || []
        });
      } else {
        console.error("Failed to fetch project:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setIsLoading(false);
    }
  }, [params.id, currentUser]);

  useEffect(() => {
    if (params.id) {
      fetchCurrentUser();
    }
  }, [params.id, fetchCurrentUser]);

  
  
  useEffect(() => {
    if (params.id && currentUser) {
      fetchProjectData();
      fetch(`/api/projects/${params.id}/view`, { method: 'POST' }).catch(console.error);
    }
  }, [params.id, currentUser, fetchProjectData]);

  if (!isValidId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Invalid project URL</h2>
          <p className="text-gray-600 mb-4">No project ID provided. Please check the link or go back to the project list.</p>
        </div>
      </div>
    );
  }

  

  const handleInterest = async () => {
    if (!currentUser?.id) {
      router.push("/login")
      return
    }

    try {
      const method = isInterested ? "DELETE" : "POST"
      const response = await fetch(`/api/projects/${params.id}/interest`, { method })
      if (response.ok) {
        setIsInterested(!isInterested)
        if (projectData) {
          setProjectData({
            ...projectData,
            interested: isInterested ? projectData.interested - 1 : projectData.interested + 1
          })
        }
      }
    } catch (error) {
      console.error("Error updating interest:", error)
    }
  }

  const handleMessage = () => {
    if (!currentUser?.id) {
      router.push("/login")
      return
    }
    router.push(`/messages?recipient=${projectData?.author.id}`)
  }

  const handleJoinRequest = () => {
    if (!currentUser?.id) {
      router.push("/login")
      return
    }
    router.push(`/messages?recipient=${projectData?.author.id}&project=${params.id}`)
  }

  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    try {
      const response = await fetch(`/api/users/search?q=${query}&projectId=${params.id}&excludeTeam=true`)
      if (response.ok) {
        const users = await response.json()
        setSearchResults(users)
      }
    } catch (error) {
      console.error("Error searching users:", error)
    }
  }

  const addTeamMember = async () => {
    if (!selectedUser || !newMemberRole) return

    try {
      const response = await fetch(`/api/projects/${params.id}/team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: selectedUser.id,
          role: newMemberRole
        })
      })

      if (response.ok) {
        setShowAddMember(false)
        setSelectedUser(null)
        setNewMemberRole("")
        setSearchQuery("")
        setSearchResults([])
        fetchProjectData() // Refresh project data
      }
    } catch (error) {
      console.error("Error adding team member:", error)
    }
  }

  const removeTeamMember = async (memberId: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) return

    try {
      const response = await fetch(`/api/projects/${params.id}/team?memberId=${memberId}`, {
        method: "DELETE"
      })

      if (response.ok) {
        fetchProjectData() // Refresh project data
      }
    } catch (error) {
      console.error("Error removing team member:", error)
    }
  }

  const toSnakeCase = (obj: Record<string, unknown>): Record<string, unknown> => {
    const snakeCaseObj: Record<string, unknown> = {}
    Object.keys(obj).forEach(key => {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
      snakeCaseObj[snakeKey] = obj[key]
    })
    return snakeCaseObj
  }

  const updateProject = async () => {
    try {

      const snakeCaseData = toSnakeCase(editData)
      
      const response = await fetch(`/api/projects/${params.id}/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(snakeCaseData)
      })

      if (response.ok) {
        setEditMode(false)
        fetchProjectData()
      } else {
        console.error("Failed to update project:", response.status, response.statusText)
      }
    } catch (error) {
      console.error("Error updating project:", error)
    }
  }

  const updateProgress = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          progress: progressData.progress,
          milestones: progressData.milestones
        })
      })

      if (response.ok) {
        setShowProgressModal(false)
        fetchProjectData() // Refresh project data
      }
    } catch (error) {
      console.error("Error updating progress:", error)
    }
  }

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      title: "",
      completed: false,
      date: ""
    }
    setProgressData({
      ...progressData,
      milestones: [...progressData.milestones, newMilestone]
    })
  }

  const updateMilestone = (index: number, field: keyof Milestone, value: unknown) => {
    const updatedMilestones = [...progressData.milestones]
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value }
    setProgressData({ ...progressData, milestones: updatedMilestones })
  }

  const removeMilestone = (index: number) => {
    const updatedMilestones = progressData.milestones.filter((_, i) => i !== index)
    setProgressData({ ...progressData, milestones: updatedMilestones })
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      alert("Failed to copy link");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <Link href="/projects" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-2 sm:mb-0">
              <ArrowLeft size={20} className="mr-2" />
              Back to Projects
            </Link>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 justify-start sm:justify-end">
              {isOwner && (
                <Dialog open={editMode} onOpenChange={setEditMode}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit size={16} className="mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto px-6 sm:px-12">
                    <DialogHeader>
                      <DialogTitle>Edit Project</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={editData.title || ""}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={editData.description || ""}
                          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="timeline">Timeline</Label>
                          <Select value={editData.timeline} onValueChange={(value) => setEditData({ ...editData, timeline: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              {TIMELINE_OPTIONS.map((option: string) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="teamSize">Team Size</Label>
                          <Select value={editData.teamsize} onValueChange={(value) => setEditData({ ...editData, teamsize: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select team size" />
                            </SelectTrigger>
                            <SelectContent>
                              {TEAM_SIZE_OPTIONS.map((option: string) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="skillsNeeded">Skills Needed</Label>
                        <TagInput
                          value={editData.skillsNeeded || []}
                          onChange={(tags) => setEditData({ ...editData, skillsNeeded: tags })}
                          placeholder="Type a skill and press Enter..."
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="techStack">Tech Stack</Label>
                        <TagInput
                          value={editData.techStack || []}
                          onChange={(tags) => setEditData({ ...editData, techStack: tags })}
                          placeholder="Type a technology and press Enter..."
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setEditMode(false)}>
                          Cancel
                        </Button>
                        <Button onClick={updateProject}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 size={16} className="mr-2" />
                {shareCopied ? "Copied!" : "Share"}
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
                <div className="flex flex-col gap-2 mb-3">
                  <h1 className="text-3xl font-bold text-gray-900">{projectData.title}</h1>
                  {projectData.lookingForCollaborators && (
                    <Badge className="bg-green-100 text-green-700 w-fit">
                      <Users size={12} className="mr-1" />
                      Open for Collaboration
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 md:flex md:items-center gap-2 text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {formatDistanceToNow(new Date(projectData.createdAt), { addSuffix: true })}
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
                
                <div className="mb-2"></div>

                {/* Project Stats */}
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Target size={20} className="mx-auto text-blue-600 mb-1" />
                    <p className="text-sm font-medium text-blue-900">{projectData.timeline}</p>
                    <p className="text-xs text-blue-700">Timeline</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Users size={20} className="mx-auto text-purple-600 mb-1" />
                    <p className="text-sm font-medium text-purple-900">{projectData.teamsize}</p>
                    <p className="text-xs text-purple-700">Team Size</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Zap size={20} className="mx-auto text-green-600 mb-1" />
                    <p className="text-sm font-medium text-green-900">{projectData.experience}</p>
                    <p className="text-xs text-green-700">Experience</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Award size={20} className="mx-auto text-orange-600 mb-1" />
                    <p className="text-sm font-medium text-orange-900">{projectData.project_type}</p>
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
                  {!isOwner && (
                    <Button
                      onClick={handleJoinRequest}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full sm:w-auto"
                    >
                      <Users size={16} className="mr-2" />
                      Request to Join
                    </Button>
                  )}
                  {!isOwner && (
                    <Button onClick={handleMessage} variant="outline" className="flex-1 w-full sm:w-auto">
                      <MessageCircle size={16} className="mr-2" />
                      Message Owner
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Project Details Tabs */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mt-6">
              <Tabs defaultValue="description" className="w-full">
                <CardHeader className="pb-2">
                  <TabsList className="w-full flex flex-row gap-1 overflow-x-auto rounded-lg border bg-gray-50 p-1 no-scrollbar">
                    <TabsTrigger value="description" className="flex-1 min-w-[80px] whitespace-nowrap">Description</TabsTrigger>
                    <TabsTrigger value="team" className="flex-1 min-w-[80px] whitespace-nowrap">Team</TabsTrigger>
                    <TabsTrigger value="progress" className="flex-1 min-w-[80px] whitespace-nowrap">Progress</TabsTrigger>
                    <TabsTrigger value="tech" className="flex-1 min-w-[80px] whitespace-nowrap">Tech Stack</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="pt-2 pb-4 px-4 sm:px-8 w-full">
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
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">
                        Current Team ({projectData.currentTeam.length})
                      </h3>
                      {isOwner && (
                        <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <UserPlus size={16} className="mr-2" />
                              Add Member
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Add Team Member</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="search">Search Users</Label>
                                <div className="relative">
                                  <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                                  <Input
                                    id="search"
                                    placeholder="Search by name or username..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                      setSearchQuery(e.target.value)
                                      searchUsers(e.target.value)
                                    }}
                                    className="pl-10"
                                  />
                                </div>
                              </div>
                              {searchResults.length > 0 && (
                                <div className="max-h-40 overflow-y-auto space-y-2">
                                  {searchResults.map((user) => (
                                    <div
                                      key={user.id}
                                      className={`p-2 rounded border cursor-pointer ${
                                        selectedUser?.id === user.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                                      }`}
                                      onClick={() => setSelectedUser(user)}
                                    >
                                      <div className="font-medium">{user.name}</div>
                                      <div className="text-sm text-gray-600">@{user.username}</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {selectedUser && (
                                <div>
                                  <Label htmlFor="role">Role</Label>
                                  <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                                      <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                                      <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                                      <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                                      <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                                      <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                                      <SelectItem value="Project Manager">Project Manager</SelectItem>
                                      <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setShowAddMember(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={addTeamMember} disabled={!selectedUser || !newMemberRole}>
                                  Add Member
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                    <div className="space-y-3">
                      {projectData.currentTeam.map((member, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Avatar className="w-10 h-10">
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
                          {isOwner && member.id !== currentUser?.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTeamMember(member.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                      {projectData.currentTeam.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Users size={48} className="mx-auto mb-4 text-gray-300" />
                          <p>No team members yet</p>
                          {isOwner && (
                            <p className="text-sm">Click &quot;Add Member&quot; to start building your team</p>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="progress" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Project Progress</h3>
                      {isOwner && (
                        <Dialog open={showProgressModal} onOpenChange={setShowProgressModal}>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Settings size={16} className="mr-2" />
                              Update Progress
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Update Project Progress</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex flex-col gap-4">
                                <Label htmlFor="progress">Overall Progress (%)</Label>
                                <Input
                                  id="progress"
                                  type="text"
                                  value={progressData.progress === 0 ? "" : progressData.progress.toString()}
                                  onChange={(e) => {
                                    const value = e.target.value
                                    const numValue = value === "" ? 0 : parseInt(value) || 0
                                    setProgressData({ ...progressData, progress: numValue })
                                  }}
                                  placeholder="Enter progress percentage"
                                />
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <Label>Milestones</Label>
                                  <Button size="sm" onClick={addMilestone}>
                                    <Plus size={16} className="mr-2" />
                                    Add Milestone
                                  </Button>
                                </div>
                                <div className="space-y-2">
                                  {progressData.milestones.map((milestone, index) => (
                                    <div key={milestone.id} className="flex items-center space-x-2 p-2 border rounded">
                                      <Input
                                        placeholder="Milestone title"
                                        value={milestone.title}
                                        onChange={(e) => updateMilestone(index, "title", e.target.value)}
                                        className="flex-1"
                                      />
                                      <Input
                                        placeholder="Date"
                                        value={milestone.date}
                                        onChange={(e) => updateMilestone(index, "date", e.target.value)}
                                        className="w-32"
                                      />
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => updateMilestone(index, "completed", !milestone.completed)}
                                        className={milestone.completed ? "text-green-600" : "text-gray-400"}
                                      >
                                        <Check size={16} />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeMilestone(index)}
                                        className="text-red-600"
                                      >
                                        <X size={16} />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setShowProgressModal(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={updateProgress}>
                                  Save Progress
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
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
                      { projectData.milestones && projectData.milestones.map((milestone, index) => (
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
                      {projectData.milestones && projectData.milestones.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                          <p>No milestones defined yet</p>
                          {isOwner && (
                            <p className="text-sm">Click &quot;Update Progress&quot; to add milestones</p>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="tech" className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Technology Stack</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {projectData.techStack && projectData.techStack.map((tech) => (
                        <div key={tech} className="p-3 bg-gray-50 rounded-lg text-center">
                          <p className="font-medium text-gray-900">{tech}</p>
                        </div>
                      ))}
                      {projectData.techStack && projectData.techStack.length === 0 && (
                        <div className="text-center py-8 text-gray-500 col-span-full">
                          <Code size={48} className="mx-auto mb-4 text-gray-300" />
                          <p>No tech stack defined yet</p>
                          {isOwner && (
                            <p className="text-sm">Click &quot;Edit&quot; to add your tech stack</p>
                          )}
                        </div>
                      )}
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
                    <span className="text-gray-600">Joined</span>
                    <span className="font-medium">{projectData.author.joinedDate}</span>
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
                  {projectData.author.links.github && (
                    <a href={projectData.author.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                      <Github size={18} />
                    </a>
                  )}
                  {projectData.author.links.linkedin && (
                    <a href={projectData.author.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                      <Linkedin size={18} />
                    </a>
                  )}
                  {projectData.author.links.email && (
                    <a href={`mailto:${projectData.author.links.email}`} className="text-gray-600 hover:text-gray-900">
                      <Mail size={18} />
                    </a>
                  )}
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
                  <span className="text-sm font-medium">{formatDistanceToNow(new Date(projectData.createdAt), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm font-medium">{formatDistanceToNow(new Date(projectData.updatedAt), { addSuffix: true })}</span>
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
  );
}
