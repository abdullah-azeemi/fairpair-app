export interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  skillsNeeded?: string[];
  skills_needed?: string[];
  lookingForCollaborators?: boolean;
  timeline?: string;
  teamSize?: string;
  teamsize?: string;
  projectType?: string;
  project_type?: string;
  experience?: string;
  createdAt?: string;
  created_at?: string;
  status?: string;
  author_id?: string;
  views?: number;
  collaborators?: number;
  interested?: number;
  [key: string]: unknown;
} 