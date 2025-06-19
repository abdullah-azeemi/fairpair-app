import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowRight,
  Users,
  Upload,
  Search,
  Star,
  Code,
  Rocket,
  Heart,
  Zap,
  Globe,
  TrendingUp,
  Award,
  MessageCircle,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

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


        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Find Your Perfect Project Partner
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Fair Pair
              </span>
              <br />
              <span className="text-gray-900">Connect. Create. Collaborate.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover talented teammates for your next big project. Upload your ideas, find skilled collaborators, and
              build something amazing together.
            </p>

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

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Get Started
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 rounded-full border-2 hover:bg-gray-50 transition-all duration-300"
                >
                  Browse Projects
                </Button>
              </Link>
            </div>

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

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fair Pair
              </span>{" "}
              Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started is simple. Follow these three steps to find your perfect project partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Upload size={32} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Share Your Project</h3>
              <p className="text-gray-600">
                Upload your project idea with details about what youre building and the skills you need.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Search size={32} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Find Collaborators</h3>
              <p className="text-gray-600">
                Browse projects or let skilled developers discover your project and reach out to collaborate.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Rocket size={32} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Build Together</h3>
              <p className="text-gray-600">
                Start collaborating, share ideas, and build amazing projects with your new team members.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Fair Pair?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've built the perfect platform for developers to connect, collaborate, and create amazing projects
              together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Matching</h3>
                <p className="text-gray-600">
                  Our AI-powered algorithm matches you with developers who have complementary skills and similar
                  interests.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Built-in Communication</h3>
                <p className="text-gray-600">
                  Seamless messaging system to discuss ideas, share progress, and coordinate with your team members.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Code size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Management</h3>
                <p className="text-gray-600">
                  Track progress, set milestones, and manage your collaborative projects all in one place.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe size={24} className="text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Community</h3>
                <p className="text-gray-600">
                  Connect with developers from around the world and build diverse, international teams.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Passion-Driven</h3>
                <p className="text-gray-600">
                  Find people who share your passion for technology and are excited to build meaningful projects.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap size={24} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast & Easy</h3>
                <p className="text-gray-600">
                  Get started in minutes. Our intuitive interface makes finding collaborators quick and effortless.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how Fair Pair has helped developers build amazing projects and form lasting partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Fair Pair helped me find the perfect co-founder for my AI startup. We've raised $500K and are growing
                  fast!"
                </p>
                <div className="flex items-center">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Chen</p>
                    <p className="text-sm text-gray-600">AI Startup Founder</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "I found an amazing team for my open-source project. We now have 10K+ GitHub stars and growing!"
                </p>
                <div className="flex items-center">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">Mike Rodriguez</p>
                    <p className="text-sm text-gray-600">Open Source Maintainer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The collaboration tools are fantastic. We built and launched our app in just 3 months!"
                </p>
                <div className="flex items-center">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">Emma Wilson</p>
                    <p className="text-sm text-gray-600">Full-Stack Developer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trending Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the most popular projects on Fair Pair and find your next collaboration opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-green-100 text-green-700">
                    <TrendingUp size={12} className="mr-1" />
                    Trending
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users size={14} className="mr-1" />5 members
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">AI Code Assistant</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Building an intelligent code completion tool using machine learning and natural language processing.
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  <Badge variant="outline" className="text-xs">
                    Python
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    AI/ML
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    React
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback className="text-xs">AT</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">Alex Thompson</span>
                  </div>
                  <Button size="sm" variant="outline">
                    View Project
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-blue-100 text-blue-700">
                    <Award size={12} className="mr-1" />
                    Featured
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users size={14} className="mr-1" />3 members
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Blockchain Voting</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Secure and transparent voting system built on blockchain technology for democratic processes.
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  <Badge variant="outline" className="text-xs">
                    Solidity
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Web3
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    React
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback className="text-xs">EW</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">Emma Wilson</span>
                  </div>
                  <Button size="sm" variant="outline">
                    View Project
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-purple-100 text-purple-700">
                    <Rocket size={12} className="mr-1" />
                    New
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users size={14} className="mr-1" />
                    Looking for team
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Climate Data Viz</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Interactive dashboard for visualizing climate change data and environmental impact metrics.
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  <Badge variant="outline" className="text-xs">
                    D3.js
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Python
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Data Science
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback className="text-xs">DP</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">David Park</span>
                  </div>
                  <Button size="sm" variant="outline">
                    View Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full">
                Explore All Projects
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of developers who are already collaborating and creating incredible projects together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
              >
                Start Collaborating Today
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Fair Pair
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">
                The ultimate platform for developers to find project partners, collaborate on ideas, and build amazing
                things together.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/projects" className="hover:text-white transition-colors">
                    Browse Projects
                  </a>
                </li>
                <li>
                  <a href="/signup" className="hover:text-white transition-colors">
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href="/login" className="hover:text-white transition-colors">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Fair Pair. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
