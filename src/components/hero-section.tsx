import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Upload, Search } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background UI Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-20 text-blue-200 animate-bounce">
          <Users size={24} />
        </div>
        <div className="absolute top-32 right-32 text-purple-200 animate-bounce" style={{ animationDelay: "1s" }}>
          <Upload size={20} />
        </div>
        <div className="absolute bottom-32 left-32 text-blue-200 animate-bounce" style={{ animationDelay: "2s" }}>
          <Search size={22} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Find Your Perfect Project Partner
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Fair Pair
            </span>
            <br />
            <span className="text-gray-900">Connect. Create. Collaborate.</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover talented teammates for your next big project. Upload your ideas, find skilled collaborators, and
            build something amazing together.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Search size={16} className="mr-2 text-blue-500" />
              Find Teammates
            </div>
            <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Upload size={16} className="mr-2 text-purple-500" />
              Upload Projects
            </div>
            <div className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Users size={16} className="mr-2 text-green-500" />
              Build Teams
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={"/login"}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Get Started
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            </Link>
             <Link href={"/projects"}>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 rounded-full border-2 hover:bg-gray-50 transition-all duration-300"
            >
              Browse Projects
            </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-8 text-sm text-gray-500">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">10K+</div>
              <div>Active Projects</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">25K+</div>
              <div>Developers</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">5K+</div>
              <div>Teams Formed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}
