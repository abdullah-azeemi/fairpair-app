import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, HelpCircle, Users, Search, Upload, MessageCircle, Shield, Globe, Zap, FileText } from "lucide-react"
import Link from "next/link"

export default function FAQ() {
  const faqs = [
    {
      category: "Getting Started",
      icon: <Users size={20} className="text-blue-600" />,
      questions: [
        {
          question: "How do I create my first project?",
          answer: "Click the 'Create Project' button on your dashboard, fill in the project details including title, description, skills needed, and timeline. You can also specify team size and experience level requirements."
        },
        {
          question: "How do I find team members for my project?",
          answer: "Once you create a project, other users can discover it through our browse feature. You can also actively search for developers with specific skills using our search functionality."
        },
        {
          question: "Is Fair Pair free to use?",
          answer: "Yes! Fair Pair is completely free to use. We believe in making collaboration accessible to everyone in the developer community."
        }
      ]
    },
    {
      category: "Project Management",
      icon: <Upload size={20} className="text-purple-600" />,
      questions: [
        {
          question: "How do I manage my project team?",
          answer: "As a project owner, you can add or remove team members, assign roles, and manage project settings. Use the team management section in your project dashboard."
        },
        {
          question: "Can I update my project after posting it?",
          answer: "Yes! You can edit your project details, update requirements, and modify team information at any time through the project settings."
        },
        {
          question: "How do I track project progress?",
          answer: "Use our built-in progress tracking features to set milestones, update completion status, and keep your team informed about project developments."
        }
      ]
    },
    {
      category: "Communication",
      icon: <MessageCircle size={20} className="text-green-600" />,
      questions: [
        {
          question: "How do I communicate with my team?",
          answer: "Use our built-in messaging system to chat with team members, share updates, and coordinate on project tasks. You can also schedule meetings and share files."
        },
        {
          question: "Can I message users before adding them to my team?",
          answer: "Yes! You can send messages to any user on the platform to discuss potential collaboration before officially adding them to your project."
        },
        {
          question: "Are my messages private?",
          answer: "Yes, all messages are private between the participants. We prioritize your privacy and data security."
        }
      ]
    },
    {
      category: "Privacy & Security",
      icon: <Shield size={20} className="text-red-600" />,
      questions: [
        {
          question: "How is my data protected?",
          answer: "We use industry-standard encryption and security measures to protect your personal information and project data. Read our Privacy Policy for detailed information."
        },
        {
          question: "Can I control who sees my profile?",
          answer: "Yes, you can adjust your privacy settings to control what information is visible to other users and manage your profile visibility."
        },
        {
          question: "What happens to my data if I delete my account?",
          answer: "When you delete your account, we remove your personal data in accordance with our data retention policies. Project data may be retained if other team members are involved."
        }
      ]
    },
    {
      category: "Platform Features",
      icon: <Zap size={20} className="text-yellow-600" />,
      questions: [
        {
          question: "How does the matching algorithm work?",
          answer: "Our algorithm considers skills, experience level, project requirements, and user preferences to suggest the best matches for your project or team."
        },
        {
          question: "Can I search for specific skills or technologies?",
          answer: "Yes! Use our advanced search filters to find users with specific skills, technologies, or experience levels that match your project needs."
        },
        {
          question: "Are there any project categories or tags?",
          answer: "Yes, projects are categorized by type (Web Development, Mobile, AI/ML, etc.) and you can add custom tags to make your project more discoverable."
        }
      ]
    },
    {
      category: "Community & Support",
      icon: <Globe size={20} className="text-indigo-600" />,
      questions: [
        {
          question: "How do I report inappropriate behavior?",
          answer: "Use our reporting system to flag inappropriate content or behavior. We take all reports seriously and will investigate promptly."
        },
        {
          question: "Is there a community forum or discussion board?",
          answer: "We&apos;re working on community features! For now, you can connect with other developers through project collaborations and direct messaging."
        },
        {
          question: "How can I get help if I have issues?",
          answer: "Contact our support team at support@fairpair.com or use the help section in your account settings. We typically respond within 24 hours."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <HelpCircle size={20} className="text-blue-600" />
              <span className="font-semibold text-gray-900">FAQ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <HelpCircle size={16} className="mr-2" />
            Frequently Asked Questions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              How Can We Help?
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about using Fair Pair. Can&apos;t find what you&apos;re looking for? 
            Contact our support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                  {category.icon}
                  <span className="ml-3">{category.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                      <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Quick Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/privacy">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Shield size={24} className="text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Privacy Policy</h4>
                  <p className="text-sm text-gray-600">Learn how we protect your data</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/terms">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <FileText size={24} className="text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Terms of Service</h4>
                  <p className="text-sm text-gray-600">Read our terms and conditions</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/projects">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Search size={24} className="text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Browse Projects</h4>
                  <p className="text-sm text-gray-600">Discover amazing projects</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 