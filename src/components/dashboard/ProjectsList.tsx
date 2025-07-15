"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Eye,
  Users,
  Clock,
  Trash2,
  Archive,
} from "lucide-react"
import Link from "next/link"
import useSWR , {mutate} from "swr"
import ProjectListSkeleton from "./ProjectListSkeleton"
import { formatDistanceToNow } from "date-fns"

export default function ProjectList(){

  const fetcher = (url:string) => fetch(url).then(res => res.json());
  const {data, error, isLoading} = useSWR('/api/projects/user', fetcher);

  if (isLoading || error || !data || !Array.isArray(data)) return <ProjectListSkeleton />;

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
    mutate('/api/projects/user');
  };

  const handleArchive = async (projectId: string) => {
    await fetch(`/api/projects/${projectId}/archive`, { method: "PATCH" });
    mutate('/api/projects/user');
  };

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
                            {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
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
                      <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                        <Button
                          variant="destructive"
                          size="icon"
                          aria-label="Delete"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          aria-label="Archive"
                          onClick={() => handleArchive(project.id)}
                        >
                          <Archive size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

  </div>
}