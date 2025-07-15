"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Plus,
} from "lucide-react"
import Link from "next/link"
import UserInfo from "./dashboard/UserInfo"
import ProjectList from "./dashboard/ProjectsList"
import RecentActivity from "./dashboard/RecentActivity"
import RecentActivitySkeleton from "./dashboard/RecentActivitySkeleton"
import MessagesRequest from "./dashboard/MessagesRequest"
import MessagesRequestSkeleton from "./dashboard/MessagesRequestSkeleton"
import AchievementsandReccomendations from "./dashboard/AchievementsandReccomendations"
import AchievementsandReccomendationsSkeleton from "./dashboard/AchievementsandReccomendationsSkeleton"
import type { Request } from "@/components/dashboard/MessagesRequest"
import { RecommendedProject } from "@/types/recommended-project";
import { signOut } from "next-auth/react"

type SupabaseMessage = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
};

type User = { id: string; username: string };

export default function DashboardPage() {
  const userLoading = false;
  const [incomingRequests, setIncomingRequests] = useState<Request[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedProject[]>([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(async (user: User) => {
        if (user && user.id) {
          const res = await fetch(`/api/messages?userId=${user.id}`);
          const messages: SupabaseMessage[] = await res.json();
          if (Array.isArray(messages)) {
            const latest = messages
              .filter(msg => msg.sender_id !== user.id)
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            const uniqueBySender: SupabaseMessage[] = [];
            const seenSenders = new Set<string>();
            for (const msg of latest) {
              if (!seenSenders.has(msg.sender_id)) {
                uniqueBySender.push(msg);
                seenSenders.add(msg.sender_id);
              }
              if (uniqueBySender.length === 3) break;
            }

            const usersRes = await fetch(`/api/conversations?userId=${user.id}`); 
            const users = await usersRes.json();
            const usernameMap: Record<string, string> = {};
            users.forEach((u: { id: string; username: string }) => {
              usernameMap[u.id] = u.username;
            });

            const missingSenderIds = uniqueBySender
              .map(msg => msg.sender_id)
              .filter(id => !usernameMap[id]);

            const missingUsers = await Promise.all(
              missingSenderIds.map(id =>
                fetch(`/api/user?userId=${id}`).then(res => res.json())
              )
            );

            missingUsers.forEach(user => {
              if (user && user.id && user.username) {
                usernameMap[user.id] = user.username;
              }
            });

            const requests: Request[] = uniqueBySender.map((msg) => ({
              id: msg.id,
              type: "message",
              from: usernameMap[msg.sender_id] || "Unknown User",
              avatar: "/placeholder.svg",
              project: "",
              message: msg.content,
              time: new Date(msg.created_at).toLocaleString(),
            }));
            setIncomingRequests(requests);
          } else {
            setIncomingRequests([]);
          }
        }
      });
  }, []);

  
  useEffect(() => {
    setRecommendationsLoading(true);
    (async () => {
     
      const recRes = await fetch("/api/recommendations");
      const data: RecommendedProject[] = await recRes.json();
      if (!Array.isArray(data) || data.length === 0) {
        setRecommendations([]);
        setRecommendationsLoading(false);
        return;
      }
      const userRes = await fetch("/api/user");
      const user = await userRes.json();
      const userSkills = Array.isArray(user.skills)
        ? user.skills
        : typeof user.skills === "string"
          ? user.skills.split(",").map((s: string) => s.trim())
          : [];
      
      const authorIds = Array.from(new Set(data.map(p => p.author_id)));
      let authorMap: Record<string, string> = {};
      for (const id of authorIds) {
        const res = await fetch(`/api/user?userId=${id}`);
        const author = await res.json();
        if (author && author.username) {
          authorMap[id] = author.username;
        }
      }
      
      const projectsWithAuthors = data.map((project: RecommendedProject) => ({
        ...project,
        author: authorMap[project.author_id] || "Unknown User",
        matchedSkills: Array.isArray(project.skills_needed)
          ? project.skills_needed.filter((skill: string) => userSkills.includes(skill)).slice(0, 3)
          : [],
      }));
      setRecommendations(projectsWithAuthors);
      setRecommendationsLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}  
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Fair Pair
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/projects">
                <Button variant="ghost">Browse Projects</Button>
              </Link>
              <Link href="/projects/new">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Plus size={16} className="mr-2" />
                  Post Project
                </Button>
              </Link>
              <Button variant="outline" className="gap-2" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
          <div>
            <UserInfo />
          </div>
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Projects & Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* User's Projects */}
              <div>
                <ProjectList />
              </div>
            {/* Activity Timeline */}
              <div>
                {userLoading? <RecentActivitySkeleton />: <RecentActivity />}
              </div>
          </div>
            
          {/* Right Column - Messages & Recommendations */}
          <div className="space-y-8">
            {/* Incoming Messages/Requests */}

              <div>
                {userLoading? <MessagesRequestSkeleton />: <MessagesRequest incomingRequests={incomingRequests} />}
              </div>
            
            {/* Collaboration Badges and Reccomendations */}
              <div>
                {recommendationsLoading ? (
                  <AchievementsandReccomendationsSkeleton />
                ) : (
                  <AchievementsandReccomendations recommendedProjects={recommendations} />
                )}
              </div>
          
          </div>
        </div>
      </div>
    </div>
  )
}
