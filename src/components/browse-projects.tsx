"use client"

import { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import ProjectsGrid from './ProjectsGrid';
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useDebounce } from '@/lib/hooks';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  skillsNeeded: string[];
  createdAt: string;
  status: string;
  author_id: string;
}

export default function BrowseProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300); 
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data: allProjects, error, isLoading } = useSWR('/api/projects', fetcher);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        if (data && data.id) setCurrentUserId(data.id);
      });
  }, []);

  const filteredProjects = useMemo(() => {
    if (!allProjects || !debouncedSearchTerm.trim()) {
      return allProjects;
    }

    const searchLower = debouncedSearchTerm.toLowerCase();
    return allProjects.filter((project: Project) => {
      const title = project.title?.toLowerCase() || '';
      const description = project.description?.toLowerCase() || '';
      const skills = project.skillsNeeded?.join(' ').toLowerCase() || '';
      const category = project.category?.toLowerCase() || '';
      
      return title.includes(searchLower) || 
             description.includes(searchLower) || 
             skills.includes(searchLower) ||
             category.includes(searchLower);
    });
  }, [allProjects, debouncedSearchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Browse Projects
              </h1>
              <p className="text-gray-600 mt-1">Discover amazing projects and find your next collaboration</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                  <Button variant="outline" className="w-full sm:w-auto flex items-center">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Dashboard
                  </Button>
              </Link>
              <Link href="/projects/new">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full sm:w-auto">
                  Post Project
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Quick Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects by title, description, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Results Info */}
        {!isLoading && !error && (
          <div className="mb-6">
            <p className="text-gray-600">
              {searchTerm 
                ? `Found ${filteredProjects?.length || 0} project${filteredProjects?.length !== 1 ? 's' : ''} matching "${searchTerm}"`
                : `Showing ${filteredProjects?.length || 0} project${filteredProjects?.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>
        )}
        
        {isLoading && <div>Loading projects...</div>}
        {error && <div className="text-red-500">Failed to load projects</div>}
        {filteredProjects && filteredProjects.length > 0 && currentUserId && <ProjectsGrid projects={filteredProjects} currentUserId={currentUserId} />}
        {filteredProjects && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No projects found matching your search' : 'No projects found'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Try adjusting your search criteria or filters'}
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
