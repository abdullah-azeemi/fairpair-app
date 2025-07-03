"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"

export type Project = {
  id: string,
  title: string,
  description: string,
  skillsNeeded: string[],
  createdAt: string,
  status: string,
};

export default function ProjectsGrid({projects}: {projects: Project[]}){
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map((project) => {
    return (
      <Card
        key={project.id}
        className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:-translate-y-1"
      >
        <CardHeader className="pb-4">
          <Link href={`/projects/${project.id}`}>
            <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
              {project.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-500">{new Date(project.createdAt).toLocaleDateString()}</span>
            <Badge className={project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
              {project.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-700 mb-2">Skills Needed:</p>
            <div className="flex flex-wrap gap-1">
              {project.skillsNeeded && project.skillsNeeded.map((skill) => (
                <Badge key={skill} className="text-xs bg-gray-100 text-gray-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <Link href={`/projects/${project.id}`} className="flex-1">
            <Button className="w-full h-9 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm">
              View Project
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  })}
</div>

}