"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Plus, X, Github, Linkedin, Mail, User, Code, Heart, CheckCircle } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

type FormData = {
  name: string;
  username: string;
  bio: string;
  skills: string[];
  interests: string[];
  github: string;
  linkedin: string;
  email: string;
};

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    bio: "",
    skills: [],
    interests: [],
    github: "",
    linkedin: "",
    email: "",
  })

  const [skillInput, setSkillInput] = useState("")
  const [interestInput, setInterestInput] = useState("")

  const router = useRouter()

  const handleNext = () => {
    if (currentStep === 1 && formData.name && formData.username) {
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    }
  }

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const addInterest = () => {
    if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, interestInput.trim()],
      }))
      setInterestInput("")
    }
  }

  const removeInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/signup', formData)
      setIsLoading(false)
      console.log(response)
      router.push('/dashboard')
    } catch (error) {
      setIsLoading(false)
    }
  }

  const suggestedSkills = ["React", "Python", "JavaScript", "AI/ML", "Node.js", "TypeScript", "Flutter", "Swift"]
  const suggestedInterests = [
    "Web Development",
    "Mobile Apps",
    "AI/ML",
    "Robotics",
    "Game Development",
    "F1 Projects",
    "IoT",
    "Blockchain",
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Back Button */}
      <Link
        href="/login"
        className="absolute top-6 left-6 z-20 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span className="hidden sm:inline">Back to Login</span>
      </Link>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Progress Indicator */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {currentStep > 1 ? <CheckCircle size={20} /> : <User size={20} />}
            </div>
            <div
              className={`w-16 h-1 rounded-full transition-all duration-300 ${
                currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              <Heart size={20} />
            </div>
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Code size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold">
              {currentStep === 1 ? "Let's get started!" : "Tell us about yourself"}
            </h1>
            <p className="text-gray-600 text-sm">
              {currentStep === 1
                ? "Create your Fair Pair profile to find amazing teammates"
                : "Help others discover what makes you a great collaborator"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right-5 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="h-11 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">@</span>
                    <Input
                      id="username"
                      placeholder="your-username"
                      value={formData.username}
                      onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                      className="h-11 pl-8 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!formData.name || !formData.username}
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            )}

            {/* Step 2: Detailed Info */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    className="min-h-[80px] resize-none transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill (e.g., React, Python)"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      className="flex-1 h-9"
                    />
                    <Button type="button" onClick={addSkill} size="sm" className="h-9 px-3">
                      <Plus size={16} />
                    </Button>
                  </div>

                  {/* Suggested Skills */}
                  <div className="flex flex-wrap gap-2">
                    {suggestedSkills
                      .filter((skill) => !formData.skills.includes(skill))
                      .map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                          onClick={() => setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }))}
                        >
                          + {skill}
                        </Badge>
                      ))}
                  </div>

                  {/* Selected Skills */}
                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <Badge key={skill} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          {skill}
                          <X size={14} className="ml-1 cursor-pointer" onClick={() => removeSkill(skill)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Interests */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Interests</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add an interest (e.g., Web Development)"
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                      className="flex-1 h-9"
                    />
                    <Button type="button" onClick={addInterest} size="sm" className="h-9 px-3">
                      <Plus size={16} />
                    </Button>
                  </div>

                  {/* Suggested Interests */}
                  <div className="flex flex-wrap gap-2">
                    {suggestedInterests
                      .filter((interest) => !formData.interests.includes(interest))
                      .map((interest) => (
                        <Badge
                          key={interest}
                          variant="outline"
                          className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors"
                          onClick={() => setFormData((prev) => ({ ...prev, interests: [...prev.interests, interest] }))}
                        >
                          + {interest}
                        </Badge>
                      ))}
                  </div>

                  {/* Selected Interests */}
                  {formData.interests.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.map((interest) => (
                        <Badge key={interest} className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                          {interest}
                          <X size={14} className="ml-1 cursor-pointer" onClick={() => removeInterest(interest)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Links */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Links (Optional)</Label>

                  <div className="space-y-3">
                    <div className="relative">
                      <Github size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="GitHub username or URL"
                        value={formData.github}
                        onChange={(e) => setFormData((prev) => ({ ...prev, github: e.target.value }))}
                        className="pl-10 h-10"
                      />
                    </div>

                    <div className="relative">
                      <Linkedin
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <Input
                        placeholder="LinkedIn profile URL"
                        value={formData.linkedin}
                        onChange={(e) => setFormData((prev) => ({ ...prev, linkedin: e.target.value }))}
                        className="pl-10 h-10"
                      />
                    </div>

                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="Contact email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="pl-10 h-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleBack} variant="outline" className="flex-1 h-11">
                    <ArrowLeft size={18} className="mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.bio}
                    className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating...
                      </div>
                    ) : (
                      "Create Profile"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  )
}
