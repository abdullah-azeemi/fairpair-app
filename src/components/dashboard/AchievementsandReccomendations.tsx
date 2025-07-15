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
import { Achievement } from "@/types/achievement";

export type RecommendedProject = {
  id: string
  title: string
  author: string
  skills: string[]
  matchingSkills: number
  timeAgo: string
}

const ICONS = [
  <Zap key="zap" size={24} className="mx-auto text-purple-600 mb-1" />,
  <Users key="users" size={24} className="mx-auto text-blue-600 mb-1" />,
  <Star key="star" size={24} className="mx-auto text-green-600 mb-1" />,
  <Award key="award" size={24} className="mx-auto text-orange-600 mb-1" />,
];

export default function AchievementsandRequest({ recommendedProjects }: { recommendedProjects: RecommendedProject[] }) {
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data: achievements, error, isLoading } = useSWR('/api/achievements', fetcher);

  const earned = new Set((achievements || []).map((a: Achievement) => a.type));

  const displayAchievements = (achievements || []).slice(0, 4);

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
            {displayAchievements.map((achievement: Achievement, idx: number) => (
              <div
                key={achievement.id}
                className="p-3 border border-gray-200 rounded-lg bg-white transition-colors hover:bg-gray-50 flex flex-col items-center"
              >
                <div className="mb-2">{ICONS[idx]}</div>
                <p className="text-xs font-medium text-gray-900 text-center">
                  {achievement.name
                    ? achievement.name
                    : achievement.type.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                </p>
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
          {recommendedProjects.map((project: RecommendedProject & { matchedSkills?: string[] }) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="block"
            >
              <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white/90 mb-4">
                <h4 className="font-semibold text-mb text-gray-900 mb-1">{project.title}</h4>
                <p className="text-xs text-gray-500 mb-3">by {project.author}</p>
                <div className="flex flex-wrap gap-1 mb-1">
                  { project.skills && project.skills.slice(0, 3).map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                {project.matchedSkills && project.matchedSkills.length > 0 && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-green-700 flex items-center">
                      Matched skills:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {project.matchedSkills.map((skill: string) => (
                        <Badge key={skill} variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                  <span>{project.matchingSkills} skill{project.matchingSkills !== 1 && 's'} match</span>
                </div>
              </div>
            </Link>
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