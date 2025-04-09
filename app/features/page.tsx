"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { GradientBackground } from "@/components/gradient-background"

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
          <GradientBackground />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-sm text-violet-700">Features</div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-violet-700 via-indigo-700 to-violet-900">
                  Powerful Tools for Lead Generation
                </h1>
                <p className="max-w-[900px] text-slate-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover all the features that make Lexo the ultimate platform for creating high-converting lead
                  magnets.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-violet-50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-indigo-200 rounded-xl blur-xl opacity-70 transform rotate-2"></div>
                  <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-violet-100">
                    <Image
                      src="/analytics-feature.jpg"
                      alt="Advanced Analytics"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Advanced Analytics</h2>
                <p className="text-slate-700">
                  Get deep insights into your lead generation performance with our advanced analytics tools. Track
                  conversions, understand user behavior, and optimize your lead magnets for maximum results.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 mt-0.5" />
                    <span>Conversion path analysis to understand user journeys</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 mt-0.5" />
                    <span>A/B testing to optimize your lead magnets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 mt-0.5" />
                    <span>Smart Traffic management for better targeting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 mt-0.5" />
                    <span>Real-time conversion tips and recommendations</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/analytics">
                    <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white">
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col justify-center space-y-4 lg:order-last">
                <h2 className="text-3xl font-bold tracking-tighter">Audience Targeting</h2>
                <p className="text-slate-700">
                  Deliver the right content to the right audience with our powerful targeting tools. Segment your
                  audience, personalize content, and increase your conversion rates.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 mt-0.5" />
                    <span>Audience segmentation based on behavior and demographics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 mt-0.5" />
                    <span>Personalized content delivery for higher engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 mt-0.5" />
                    <span>Problem-solution matching for better conversions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 mt-0.5" />
                    <span>Lead scoring to prioritize high-value prospects</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/audience-targeting">
                    <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white">
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center lg:order-first">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-violet-200 rounded-xl blur-xl opacity-70 transform -rotate-2"></div>
                  <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-violet-100">
                    <Image
                      src="/audience-targeting.jpg"
                      alt="Audience Targeting"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-indigo-200 rounded-xl blur-xl opacity-70 transform rotate-2"></div>
                  <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-violet-100">
                    <Image
                      src="/lead-magnet-creation.jpg"
                      alt="Lead Magnet Creation"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Lead Magnet Creation</h2>
                <p className="text-slate-700">
                  Create beautiful, high-converting lead magnets in minutes with our easy-to-use tools. Choose from a
                  variety of templates, customize with AI-powered content, and optimize for maximum conversions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 mt-0.5" />
                    <span>Professional templates for various lead magnet types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 mt-0.5" />
                    <span>AI-powered content generation for faster creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 mt-0.5" />
                    <span>Design optimization for better user experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 mt-0.5" />
                    <span>Quality scoring to ensure high-converting content</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/lead-magnet-creation">
                    <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white">
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-600 opacity-90"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Ready to Get Started?</h2>
                <p className="max-w-[900px] text-violet-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of businesses that are already using Lexo to grow their audience and increase
                  conversions.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-50 group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-violet-100 py-6 bg-white">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
              Lexo
            </span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm hover:text-violet-600">
              Terms
            </Link>
            <Link href="#" className="text-sm hover:text-violet-600">
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:text-violet-600">
              Cookies
            </Link>
          </nav>
          <div className="md:ml-auto flex gap-4">
            <Link href="#" className="text-sm hover:text-violet-600">
              © 2023 Lexo Inc. All rights reserved.
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
