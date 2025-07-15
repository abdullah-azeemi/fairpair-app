import { Project } from "./project";

export interface RecommendedProject extends Project {
  matchingSkills?: number;
  author?: string;
} 