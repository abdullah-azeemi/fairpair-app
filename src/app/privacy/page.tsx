import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Eye, Lock, Users, Globe, FileText } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicy() {
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
              <Shield size={20} className="text-blue-600" />
              <span className="font-semibold text-gray-900">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <Shield size={16} className="mr-2" />
            Privacy & Security
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
            <span>Last updated: July 2025</span>
          </div>
        </div>

        <div className="space-y-8">
          {/* Information We Collect */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <Eye size={20} className="mr-3 text-blue-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Personal Information</h4>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Name and username</li>
                    <li>• Email address</li>
                    <li>• Profile information (bio, skills)</li>
                    <li>• Profile pictures</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Project Information</h4>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Project descriptions and details</li>
                    <li>• Team member information</li>
                    <li>• Communication data</li>
                    <li>• Usage analytics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <Users size={20} className="mr-3 text-purple-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Service Provision</h4>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Match you with potential collaborators</li>
                    <li>• Enable project creation and management</li>
                    <li>• Facilitate team communication</li>
                    <li>• Provide personalized recommendations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Improvement & Analytics</h4>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Improve our matching algorithms</li>
                    <li>• Analyze platform usage patterns</li>
                    <li>• Develop new features</li>
                    <li>• Ensure platform security</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <Lock size={20} className="mr-3 text-green-600" />
                Data Protection & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Lock size={24} className="text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-2">Encryption</h4>
                  <p className="text-sm text-gray-600">All data is encrypted in transit and at rest</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Shield size={24} className="text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-2">Access Control</h4>
                  <p className="text-sm text-gray-600">Strict access controls and authentication</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Globe size={24} className="text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-2">Compliance</h4>
                  <p className="text-sm text-gray-600">GDPR and industry standard compliance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <Globe size={20} className="mr-3 text-orange-600" />
                Data Sharing & Third Parties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">We Do Not Sell Your Data</h4>
                  <p className="text-gray-600 text-sm">
                    We never sell, rent, or trade your personal information to third parties for marketing purposes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Limited Sharing</h4>
                  <p className="text-gray-600 text-sm">
                    We may share data only with service providers who help us operate the platform, and only to the extent necessary.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Legal Requirements</h4>
                  <p className="text-gray-600 text-sm">
                    We may disclose information if required by law or to protect our rights and safety.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <FileText size={20} className="mr-3 text-red-600" />
                Your Rights & Choices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Access & Control</h4>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Access your personal data</li>
                    <li>• Update your profile information</li>
                    <li>• Delete your account</li>
                    <li>• Export your data</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Communication Preferences</h4>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Control email notifications</li>
                    <li>• Manage privacy settings</li>
                    <li>• Opt-out of analytics</li>
                    <li>• Control visibility settings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Contact Us</CardTitle>
            </CardHeader>
          </Card> */}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            This privacy policy is effective as of July 2025 and will remain in effect except with respect to any changes in its provisions.
          </p>
        </div>
      </div>
    </div>
  )
} 