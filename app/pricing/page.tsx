"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { GradientBackground } from "@/components/gradient-background"
import { Switch } from "@/components/ui/switch"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 relative">
        <GradientBackground />

        <div className="container py-12 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-violet-700 via-indigo-700 to-violet-900">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Choose the plan that's right for you and start creating high-converting lead magnets today.
            </p>

            <div className="flex items-center justify-center mt-8">
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm font-medium ${billingCycle === "monthly" ? "text-violet-700" : "text-slate-500"}`}
                >
                  Monthly
                </span>
                <Switch
                  checked={billingCycle === "yearly"}
                  onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
                />
                <span
                  className={`text-sm font-medium ${billingCycle === "yearly" ? "text-violet-700" : "text-slate-500"}`}
                >
                  Yearly
                  <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    Save 20%
                  </span>
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white/80 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-6 flex flex-col h-full">
                <div>
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-sm text-muted-foreground mt-1">Perfect for individuals and small businesses</p>
                </div>

                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">{billingCycle === "monthly" ? "$19" : "$15"}</span>
                  <span className="text-sm text-muted-foreground ml-1">/month</span>
                </div>

                {billingCycle === "yearly" && (
                  <p className="text-sm text-green-600 mt-1">$180 billed yearly (save $48)</p>
                )}

                <Link href="/signup" className="mt-6">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </Link>

                <div className="mt-6 space-y-4 flex-1">
                  <h4 className="text-sm font-medium">What's included:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>5 lead magnets</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>1,000 leads per month</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Basic analytics</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Email delivery</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Standard templates</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white/80 backdrop-blur-sm overflow-hidden relative"
            >
              <div className="absolute top-0 right-0">
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              </div>

              <div className="p-6 flex flex-col h-full">
                <div>
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="text-sm text-muted-foreground mt-1">For growing businesses and marketing teams</p>
                </div>

                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">{billingCycle === "monthly" ? "$49" : "$39"}</span>
                  <span className="text-sm text-muted-foreground ml-1">/month</span>
                </div>

                {billingCycle === "yearly" && (
                  <p className="text-sm text-green-600 mt-1">$468 billed yearly (save $120)</p>
                )}

                <Link href="/signup" className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white">
                    Get Started
                  </Button>
                </Link>

                <div className="mt-6 space-y-4 flex-1">
                  <h4 className="text-sm font-medium">Everything in Starter, plus:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Unlimited lead magnets</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>10,000 leads per month</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>A/B testing</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Email automation</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Premium templates</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white/80 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-6 flex flex-col h-full">
                <div>
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-sm text-muted-foreground mt-1">For large organizations with advanced needs</p>
                </div>

                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">{billingCycle === "monthly" ? "$99" : "$79"}</span>
                  <span className="text-sm text-muted-foreground ml-1">/month</span>
                </div>

                {billingCycle === "yearly" && (
                  <p className="text-sm text-green-600 mt-1">$948 billed yearly (save $240)</p>
                )}

                <Link href="/contact" className="mt-6">
                  <Button className="w-full" variant="outline">
                    Contact Sales
                  </Button>
                </Link>

                <div className="mt-6 space-y-4 flex-1">
                  <h4 className="text-sm font-medium">Everything in Pro, plus:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Unlimited leads</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Custom branding</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Advanced segmentation</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>24/7 phone & email support</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span>SSO & advanced security</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:gap-8">
              {[
                {
                  question: "Can I change my plan later?",
                  answer:
                    "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
                },
                {
                  question: "What happens if I exceed my lead limit?",
                  answer:
                    "If you exceed your monthly lead limit, you'll be notified and given the option to upgrade to a higher plan. We won't cut off your service without warning.",
                },
                {
                  question: "Is there a free trial?",
                  answer:
                    "Yes, we offer a 14-day free trial on all plans. No credit card required to start your trial.",
                },
                {
                  question: "Can I cancel my subscription?",
                  answer:
                    "You can cancel your subscription at any time. If you cancel, you'll have access to your plan until the end of your current billing period.",
                },
                {
                  question: "Do you offer refunds?",
                  answer:
                    "We offer a 30-day money-back guarantee. If you're not satisfied with our service within the first 30 days, we'll provide a full refund.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white/80 backdrop-blur-sm p-6 text-left"
                >
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold">Still have questions?</h2>
            <p className="mt-2 text-muted-foreground">
              Contact our team for more information about our plans and pricing.
            </p>
            <div className="mt-6">
              <Link href="/contact">
                <Button variant="outline" className="mx-auto">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
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
