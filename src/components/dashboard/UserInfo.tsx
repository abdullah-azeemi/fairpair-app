"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Edit,
  Eye,
  Star,
  Github,
  Linkedin,
  Mail,
  Globe,
  Zap,
} from "lucide-react"
import useSWR from 'swr';
import UserInfoSkeleton from './UserInfoSkeleton';

export type UserData = {
  name: string
  username: string
  avatar?: string
  bio: string
  skills: string[]
  interests: string[]
  links: {
    github: string
    linkedin: string
    email: string
    portfolio: string
  }
  joinedDate: string
  profileStrength: number
}

export default function UserInfo() {
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR('/api/user', fetcher);

  if (isLoading || error || data?.error) return <UserInfoSkeleton />;
  if (!data) return null;

  const userData = {
    name: data.name,
    username: data.username,
    avatar: '', 
    bio: data.bio || '',
    skills: data.skills || [],
    interests: data.interests || [],
    links: {
      github: data.github || '#',
      linkedin: data.linkedin || '#',
      email: data.email || '',
      portfolio: '#', 
    },
    
    profileStrength: 85, 
  };

  return <div>
    <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Profile Picture & Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-shrink-0">
            <Avatar className="w-20 h-20 ring-4 ring-blue-100">
              {/* <AvatarImage src={userData.avatar || "/placeholder.svg"} />*/}
              <AvatarFallback className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                {userData.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
              <p className="text-gray-600">@{userData.username}</p>
              <p className="text-sm text-gray-500 mt-1">Joined {/*userData.joinedDate*/}</p>
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
              {userData.skills.map((skill: string) => (
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
              {userData.interests.map((interest: string) => (
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
  </div>
}