"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Star,
  Award,
  Zap,
} from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

export type RecommendedProject = {
  id: string
  title: string
  author: string
  skills: string[]
  matchingSkills: number
  timeAgo: string
}

const ACHIEVEMENT_BADGES = [
  { type: 'first_project', label: 'Quick Starter', icon: <Zap size={24} className="mx-auto text-purple-600 mb-1" /> },
  { type: 'colab_pro', label: 'Colab Pro', icon: <Users size={24} className="mx-auto text-blue-600 mb-1" /> },
  { type: 'top_contributor', label: 'Top Contributor', icon: <Star size={24} className="mx-auto text-green-600 mb-1" /> },
  { type: 'mentor', label: 'Mentor', icon: <Award size={24} className="mx-auto text-orange-600 mb-1" /> },
];

export default function AchievementsandRequest({ recommendedProjects }: { recommendedProjects: RecommendedProject[] }) {
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data: achievements, error, isLoading } = useSWR('/api/achievements', fetcher);

  // Map earned achievements for quick lookup
  const earned = new Set((achievements || []).map((a: any) => a.type));

  return (
    <div className="space-y-8">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award size={20} className="mr-2 text-yellow-600" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {ACHIEVEMENT_BADGES.map((badge) => (
              <div
                key={badge.type}
                className={`text-center p-3 rounded-lg border transition-all duration-200 ${earned.has(badge.type) ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200 opacity-60'}`}
              >
                {badge.icon}
                <p className={`text-xs font-medium ${earned.has(badge.type) ? 'text-green-900' : 'text-gray-900'}`}>{badge.label}</p>
                {earned.has(badge.type) && <span className="block text-green-600 text-xs mt-1">Unlocked!</span>}
              </div>
            ))}
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
          {recommendedProjects.map((project: RecommendedProject) => (
            <div
              key={project.id}
              className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <h4 className="font-medium text-sm text-gray-900 mb-1">{project.title}</h4>
              <p className="text-xs text-gray-600 mb-2">by {project.author}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {project.skills.slice(0, 3).map((skill: string) => (
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
  )
}