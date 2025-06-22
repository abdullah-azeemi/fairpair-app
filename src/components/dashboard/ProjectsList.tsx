"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Eye,
  Users,
  MoreHorizontal,
  Clock,
} from "lucide-react"
import Link from "next/link"
import useSWR from "swr"
import ProjectListSkeleton from "./ProjectListSkeleton"

export default function ProjectList(){

  const fetcher = (url:string) => fetch(url).then(res => res.json());
  const {data, error, isLoading} = useSWR('/api/projects/user', fetcher);

  if (isLoading) return <ProjectListSkeleton />
  if (error) return <div className="text-red-500">Failed to Load Projects</div>
  if(!data) return null;

  return <div>
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Users size={20} className="mr-2 text-blue-600" />
                    My Projects ({data.length})
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
                {data.map((project: any) => (
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
                          {project.skills && project.skills.map((skill: string) => (
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

  </div>
}