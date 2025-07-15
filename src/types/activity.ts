export interface Activity {
  id: string;
  type: string;
  details?: Record<string, unknown>;
  created_at: string;
} 