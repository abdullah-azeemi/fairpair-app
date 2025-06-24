import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProjectsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-pulse">
          <CardHeader className="pb-4">
            <div className="h-6 w-40 bg-gray-200 rounded mb-2" />
            <div className="flex items-center gap-2 mt-2">
              <div className="h-4 w-20 bg-gray-100 rounded" />
              <div className="h-4 w-16 bg-gray-100 rounded" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-4 w-full bg-gray-200 rounded mb-4" />
            <div className="mb-4">
              <div className="h-3 w-24 bg-gray-100 rounded mb-2" />
              <div className="flex flex-wrap gap-1">
                <div className="h-6 w-16 bg-gray-100 rounded" />
                <div className="h-6 w-12 bg-gray-100 rounded" />
                <div className="h-6 w-14 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="h-9 w-full bg-gray-100 rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 