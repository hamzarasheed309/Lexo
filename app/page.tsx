"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GradientBackground } from "@/components/gradient-background"
import { FloatingElements } from "@/components/floating-elements"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  const [email, setEmail] = useState("")
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden" ref={heroRef}>
          <GradientBackground />
          <FloatingElements parentRef={heroRef} />

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <motion.div
                    className="inline-flex items-center rounded-full border border-violet-200 bg-white/50 backdrop-blur-sm px-3 py-1 text-sm font-medium text-violet-700 shadow-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    <span>Introducing Lexo</span>
                  </motion.div>
                  <motion.h1
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-violet-700 via-indigo-700 to-violet-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    Create, Optimize, and Convert with Lexo
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-slate-700 md:text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    The all-in-one platform for creating high-converting lead magnets with advanced analytics, audience
                    targeting, and automation tools.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex-1 max-w-md">
                    <div className="flex">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="rounded-r-none border-r-0 focus-visible:ring-violet-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Button className="rounded-l-none bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white group">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                  <Link href="/demo">
                    <Button
                      variant="outline"
                      className="border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-800"
                    >
                      Request Demo
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="relative w-full max-w-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-indigo-100 rounded-xl blur-xl opacity-70 transform -rotate-3"></div>
                  <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-violet-100">
                    <Image
                      src="/dashboard-preview.jpg"
                      alt="Lexo Dashboard Preview"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg p-3 shadow-lg text-white">
                    <div className="text-xs font-medium">Conversion Rate</div>
                    <div className="text-xl font-bold">+42%</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t border-violet-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-[800px]">
                <div className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-sm text-violet-700">
                  Trusted by Industry Leaders
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join thousands of companies using Lexo
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 py-12 md:grid-cols-5">
              <div className="flex items-center justify-center p-4 grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100">
                <Image src="/logo-amazon.svg" alt="Amazon" width={120} height={40} />
              </div>
              <div className="flex items-center justify-center p-4 grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100">
                <Image src="/logo-shopify.svg" alt="Shopify" width={120} height={40} />
              </div>
              <div className="flex items-center justify-center p-4 grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100">
                <Image src="/logo-slack.svg" alt="Slack" width={120} height={40} />
              </div>
              <div className="flex items-center justify-center p-4 grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100">
                <Image src="/logo-google.svg" alt="Google" width={120} height={40} />
              </div>
              <div className="flex items-center justify-center p-4 grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100">
                <Image src="/logo-airbnb.svg" alt="Airbnb" width={120} height={40} />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-violet-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-sm text-violet-700">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
                <p className="max-w-[900px] text-slate-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools you need to create, optimize, and convert with your lead magnets.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-indigo-200 rounded-xl blur-xl opacity-70 transform rotate-2"></div>
                  <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-violet-100">
                    <Image
                      src="/analytics-preview.jpg"
                      alt="Analytics Preview"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-violet-100 p-1">
                          <div className="rounded-full bg-violet-600 p-1 text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M12 2v20" />
                              <path d="m17 5-5-3-5 3" />
                              <path d="m17 19-5 3-5-3" />
                              <path d="M2 12h20" />
                              <path d="m5 7-3 5 3 5" />
                              <path d="m19 7 3 5-3 5" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold">Advanced Analytics</h3>
                      </div>
                      <p className="text-slate-700">
                        Conversion path analysis, A/B testing, Smart Traffic management, and real-time conversion tips.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-violet-100 p-1">
                          <div className="rounded-full bg-violet-600 p-1 text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold">Audience Targeting</h3>
                      </div>
                      <p className="text-slate-700">
                        Segmentation, personalization, problem-solution matching, and lead scoring.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-violet-100 p-1">
                          <div className="rounded-full bg-violet-600 p-1 text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold">Lead Magnet Creation</h3>
                      </div>
                      <p className="text-slate-700">
                        Templates, AI-powered content generation, design optimization, and quality scoring.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/features">
                    <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white">
                      Explore All Features
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <motion.div
                className="flex flex-col justify-center space-y-4 lg:order-last"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-violet-100 p-1">
                          <div className="rounded-full bg-violet-600 p-1 text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                              <path d="m2 12 5.45 5.45" />
                              <path d="M2 12h10" />
                              <path d="m12 2v10l6.4 6.4" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold">Automation Tools</h3>
                      </div>
                      <p className="text-slate-700">
                        Lead magnet delivery, automated follow-up sequences, CRM integration, and multi-channel
                        distribution.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-violet-100 p-1">
                          <div className="rounded-full bg-violet-600 p-1 text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                              <path d="M12 8v4l3 3" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold">Trust Building</h3>
                      </div>
                      <p className="text-slate-700">
                        Social proof integration, testimonial display, preview functionalities, and compliance tools.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-violet-100 p-1">
                          <div className="rounded-full bg-violet-600 p-1 text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="m7 11 2-2-2-2" />
                              <path d="M11 13h4" />
                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold">Interactive Content</h3>
                      </div>
                      <p className="text-slate-700">
                        Quizzes, videos, and gamification elements to increase user engagement.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/automation">
                    <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white">
                      Explore Automation
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center lg:order-first"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-violet-200 rounded-xl blur-xl opacity-70 transform -rotate-2"></div>
                  <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-violet-100">
                    <Image
                      src="/automation-preview.jpg"
                      alt="Automation Preview"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-violet-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-sm text-violet-700">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-slate-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what our customers have to say about Lexo.
                </p>
              </div>
            </div>
            <div className="grid gap-6 pt-12 lg:grid-cols-3 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src="/testimonial-1.jpg"
                        alt="Sarah Johnson"
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-bold">Sarah Johnson</h3>
                        <p className="text-sm text-slate-600">Marketing Director, TechCorp</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w
                          xmlns="
                          http:width="24" //www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-yellow-500"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-700">
                      "Lexo has transformed our lead generation process. The analytics and audience targeting features
                      have helped us increase our conversion rates by 45% in just three months."
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src="/testimonial-2.jpg"
                        alt="Michael Chen"
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-bold">Michael Chen</h3>
                        <p className="text-sm text-slate-600">CEO, GrowthStartup</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-yellow-500"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-700">
                      "The AI-powered content generation tools have saved us countless hours. We're now able to create
                      high-quality lead magnets in minutes instead of days."
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src="/testimonial-3.jpg"
                        alt="Emily Rodriguez"
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-bold">Emily Rodriguez</h3>
                        <p className="text-sm text-slate-600">CMO, Enterprise Solutions</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-yellow-500"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-700">
                      "The automation tools and CRM integration have streamlined our entire lead nurturing process.
                      We've seen a 60% increase in qualified leads since implementing Lexo."
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
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
