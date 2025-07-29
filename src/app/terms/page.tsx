import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Shield, Users, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function TermsOfService() {
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
              <FileText size={20} className="text-blue-600" />
              <span className="font-semibold text-gray-900">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <FileText size={16} className="mr-2" />
            Legal & Terms
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using Fair Pair. By using our platform, you agree to these terms.
          </p>
          <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
            <span>Last updated: July 2025</span>
          </div>
        </div>

        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <CheckCircle size={20} className="mr-3 text-green-600" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                By accessing and using Fair Pair, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Important:</strong> These terms constitute a legally binding agreement between you and Fair Pair.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <Users size={20} className="mr-3 text-blue-600" />
                Service Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 mb-4">
                Fair Pair is a platform that connects developers and creators to collaborate on projects. Our services include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Core Features</h4>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Project creation and management</li>
                    <li>• Team member matching</li>
                    <li>• Communication tools</li>
                    <li>• Progress tracking</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Additional Services</h4>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Skill-based recommendations</li>
                    <li>• Project discovery</li>
                    <li>• Community features</li>
                    <li>• Analytics and insights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <Shield size={20} className="mr-3 text-purple-600" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <CheckCircle size={16} className="mr-2 text-green-600" />
                    What You Must Do
                  </h4>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Provide accurate information</li>
                    <li>• Respect other users&apos; privacy</li>
                    <li>• Follow community guidelines</li>
                    <li>• Report inappropriate content</li>
                    <li>• Maintain account security</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <XCircle size={16} className="mr-2 text-red-600" />
                    What You Must Not Do
                  </h4>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Share false information</li>
                    <li>• Harass or bully others</li>
                    <li>• Violate intellectual property</li>
                    <li>• Attempt to hack the platform</li>
                    <li>• Spam or abuse the service</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <FileText size={20} className="mr-3 text-orange-600" />
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Your Content</h4>
                  <p className="text-gray-600 text-sm">
                    You retain ownership of content you create and share on Fair Pair. You grant us a license to use, 
                    display, and distribute your content as necessary to provide our services.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Platform Content</h4>
                  <p className="text-gray-600 text-sm">
                    Fair Pair&apos;s platform, including its design, code, and features, is protected by intellectual property laws. 
                    You may not copy, modify, or distribute our platform without permission.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Third-Party Content</h4>
                  <p className="text-gray-600 text-sm">
                    Respect the intellectual property rights of others. Do not share content that infringes on others&apos; rights.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Data */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <Shield size={20} className="mr-3 text-green-600" />
                Privacy & Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Your privacy is important to us. Our collection and use of your personal information is governed by our 
                Privacy Policy, which is incorporated into these Terms of Service.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Learn More:</strong> Read our complete 
                  <Link href="/privacy" className="text-green-700 underline ml-1">Privacy Policy</Link> 
                  for detailed information about how we handle your data.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <AlertTriangle size={20} className="mr-3 text-yellow-600" />
                Disclaimers & Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Service Availability</h4>
                  <p className="text-gray-600 text-sm">
                    We strive to provide reliable service but cannot guarantee uninterrupted access. We may modify, 
                    suspend, or discontinue services at any time.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">User Interactions</h4>
                  <p className="text-gray-600 text-sm">
                    We are not responsible for the actions, content, or information of other users. 
                    You interact with other users at your own risk.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h4>
                  <p className="text-gray-600 text-sm">
                    To the maximum extent permitted by law, Fair Pair shall not be liable for any indirect, 
                    incidental, special, or consequential damages.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Account Termination</h4>
                  <p className="text-gray-600 text-sm">
                    You may terminate your account at any time. We may terminate or suspend your account 
                    if you violate these terms or for other reasons at our discretion.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Effect of Termination</h4>
                  <p className="text-gray-600 text-sm">
                    Upon termination, your right to use the service will cease immediately. 
                    We may delete your account and data in accordance with our data retention policies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We may update these terms from time to time. We will notify you of any material changes by:
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Posting the new terms on our platform</li>
                <li>• Sending you an email notification</li>
                <li>• Displaying a notice when you log in</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Continued Use:</strong> Your continued use of the service after changes become effective 
                  constitutes acceptance of the new terms.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          {/* Contact Information 
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Email: legal@fairpair.com</p>
                <p>• Support: support@fairpair.com</p>
                <p>• Address: [Your Company Address]</p>
              </div>
            </CardContent>
          </Card>*/}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            These terms of service are effective as of July 2025 and will remain in effect except with respect to any changes in its provisions.
          </p>
        </div>
      </div>
    </div>
  )
} 