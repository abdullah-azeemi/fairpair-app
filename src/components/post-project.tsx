"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, ArrowRight, Plus, X, Lightbulb, Users, CheckCircle, Rocket } from "lucide-react"
import Link from "next/link"

interface ProjectData {
  title: string
  description: string
  category: string
  skillsNeeded: string[]
  lookingForCollaborators: boolean
  timeline: string
  teamSize: string
  projectType: string
  experience: string
}

export default function PostProjectPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [projectData, setProjectData] = useState<ProjectData>({
    title: "",
    description: "",
    category: "",
    skillsNeeded: [],
    lookingForCollaborators: true,
    timeline: "",
    teamSize: "",
    projectType: "",
    experience: "",
  })

  const [skillInput, setSkillInput] = useState("")

  const handleNext = () => {
    if (currentStep === 1 && projectData.title && projectData.description && projectData.category) {
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    }
  }

  const addSkill = () => {
    if (skillInput.trim() && !projectData.skillsNeeded.includes(skillInput.trim())) {
      setProjectData((prev) => ({
        ...prev,
        skillsNeeded: [...prev.skillsNeeded, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setProjectData((prev) => ({
      ...prev,
      skillsNeeded: prev.skillsNeeded.filter((s) => s !== skill),
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Handle success - redirect to project page or show success message
  }

  const categories = [
    "Web Development",
    "Mobile Development",
    "AI/ML",
    "Data Science",
    "Blockchain",
    "IoT",
    "Game Development",
    "DevOps",
    "UI/UX Design",
    "Other",
  ]

  const suggestedSkills = [
    "React",
    "Python",
    "JavaScript",
    "Node.js",
    "TypeScript",
    "Flutter",
    "Swift",
    "AI/ML",
    "Docker",
    "AWS",
    "Firebase",
    "MongoDB",
  ]

  const timelines = ["1-2 weeks", "1 month", "2-3 months", "3-6 months", "6+ months", "Ongoing"]

  const teamSizes = ["Just me", "2-3 people", "4-5 people", "6-10 people", "10+ people"]

  const projectTypes = ["Open Source", "Startup Idea", "Learning Project", "Freelance", "Competition", "Research"]

  const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Mixed"]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div
          className="absolute top-1/2 right-1/4 w-24 h-24 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Back Button */}
      <Link
        href="/projects"
        className="absolute top-6 left-6 z-20 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span className="hidden sm:inline">Back to Projects</span>
      </Link>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {currentStep > 1 ? <CheckCircle size={24} /> : <Lightbulb size={24} />}
            </div>
            <div
              className={`w-20 h-1 rounded-full transition-all duration-300 ${
                currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              <Rocket size={24} />
            </div>
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Users size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold">{currentStep === 1 ? "Share Your Project Idea" : "Project Details"}</h1>
            <p className="text-gray-600 text-sm">
              {currentStep === 1
                ? "Tell the community about your amazing project"
                : "Help others understand what you're looking for"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Basic Project Info */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Project Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., AI-Powered Resume Builder"
                    value={projectData.title}
                    onChange={(e) => setProjectData((prev) => ({ ...prev, title: e.target.value }))}
                    className="h-12 text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category *
                  </Label>
                  <Select
                    value={projectData.category}
                    onValueChange={(value) => setProjectData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select project category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Project Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project, its goals, and what makes it exciting. What problem does it solve?"
                    value={projectData.description}
                    onChange={(e) => setProjectData((prev) => ({ ...prev, description: e.target.value }))}
                    className="min-h-[120px] resize-none transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">{projectData.description.length}/500 characters</p>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!projectData.title || !projectData.description || !projectData.category}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Details
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </div>
            )}

            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                {/* Skills Needed */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Skills Needed *</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill (e.g., React, Python)"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      className="flex-1 h-10"
                    />
                    <Button type="button" onClick={addSkill} size="sm" className="h-10 px-4">
                      <Plus size={16} />
                    </Button>
                  </div>

                  {/* Suggested Skills */}
                  <div className="flex flex-wrap gap-2">
                    {suggestedSkills
                      .filter((skill) => !projectData.skillsNeeded.includes(skill))
                      .slice(0, 8)
                      .map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                          onClick={() =>
                            setProjectData((prev) => ({ ...prev, skillsNeeded: [...prev.skillsNeeded, skill] }))
                          }
                        >
                          + {skill}
                        </Badge>
                      ))}
                  </div>

                  {/* Selected Skills */}
                  {projectData.skillsNeeded.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {projectData.skillsNeeded.map((skill) => (
                        <Badge key={skill} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          {skill}
                          <X size={14} className="ml-1 cursor-pointer" onClick={() => removeSkill(skill)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Settings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Timeline</Label>
                    <Select
                      value={projectData.timeline}
                      onValueChange={(value) => setProjectData((prev) => ({ ...prev, timeline: value }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelines.map((timeline) => (
                          <SelectItem key={timeline} value={timeline}>
                            {timeline}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Team Size</Label>
                    <Select
                      value={projectData.teamSize}
                      onValueChange={(value) => setProjectData((prev) => ({ ...prev, teamSize: value }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Project Type</Label>
                    <Select
                      value={projectData.projectType}
                      onValueChange={(value) => setProjectData((prev) => ({ ...prev, projectType: value }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Experience Level</Label>
                    <Select
                      value={projectData.experience}
                      onValueChange={(value) => setProjectData((prev) => ({ ...prev, experience: value }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Looking for Collaborators Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Looking for Collaborators</Label>
                    <p className="text-xs text-gray-600">Allow others to join your project and collaborate with you</p>
                  </div>
                  <Switch
                    checked={projectData.lookingForCollaborators}
                    onCheckedChange={(checked) =>
                      setProjectData((prev) => ({ ...prev, lookingForCollaborators: checked }))
                    }
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleBack} variant="outline" className="flex-1 h-12">
                    <ArrowLeft size={18} className="mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || projectData.skillsNeeded.length === 0}
                    className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Publishing...
                      </div>
                    ) : (
                      <>
                        <Rocket size={18} className="mr-2" />
                        Publish Project
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Need help?{" "}
          <Link href="/help" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Check our project posting guide
          </Link>
        </div>
      </div>
    </div>
  )
}
