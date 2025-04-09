"use client"

import type React from "react"

import { Switch } from "@/components/ui/switch"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { LeadMagnetUploadCard } from "@/components/lead-magnet-upload-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreateLeadMagnetPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const steps = [
    { id: 1, name: "Upload" },
    { id: 2, name: "Design" },
    { id: 3, name: "Delivery" },
    { id: 4, name: "Publish" },
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 lg:block">
          <DashboardNav />
        </aside>
        <main className="flex-1 p-6">
          <div className="mb-6">
            <Link
              href="/lead-magnets"
              className="flex items-center gap-2 text-violet-600 hover:text-violet-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Lead Magnets</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-indigo-700">
              Create Lead Magnet
            </h1>
            <p className="text-muted-foreground mt-1">Follow the steps below to create and publish your lead magnet</p>
          </motion.div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      step.id === currentStep
                        ? "border-violet-600 bg-violet-600 text-white"
                        : step.id < currentStep
                          ? "border-violet-600 bg-violet-600 text-white"
                          : "border-gray-300 bg-white text-gray-500"
                    }`}
                  >
                    {step.id < currentStep ? <Check className="h-5 w-5" /> : <span>{step.id}</span>}
                  </div>
                  <div
                    className={`hidden text-sm font-medium md:ml-2 md:block ${
                      step.id === currentStep ? "text-violet-600" : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`hidden h-0.5 w-20 md:block ${
                        step.id < currentStep ? "bg-violet-600" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            {currentStep === 1 && (
              <div className="py-4">
                <LeadMagnetUploadCard />
              </div>
            )}

            {currentStep === 2 && (
              <div className="py-4">
                <Tabs defaultValue="template" className="w-full max-w-3xl mx-auto">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="template">Template</TabsTrigger>
                    <TabsTrigger value="customize">Customize</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="template" className="p-4 border rounded-md mt-4">
                    <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
                    <p className="text-muted-foreground mb-6">
                      Select a template for your lead magnet to get started quickly.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Template placeholders */}
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="border rounded-md p-2 cursor-pointer hover:border-violet-400 transition-colors"
                        >
                          <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center">
                            Template {i + 1}
                          </div>
                          <p className="text-sm font-medium mt-2 text-center">Template Style {i + 1}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="customize" className="p-4 border rounded-md mt-4">
                    <h2 className="text-xl font-semibold mb-4">Customize Design</h2>
                    <p className="text-muted-foreground">
                      Customize the design of your lead magnet to match your brand.
                    </p>
                    {/* Placeholder for customization options */}
                    <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-md mt-6">
                      <p className="text-muted-foreground">Design customization options will appear here.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="preview" className="p-4 border rounded-md mt-4">
                    <h2 className="text-xl font-semibold mb-4">Preview</h2>
                    <p className="text-muted-foreground">Preview how your lead magnet will look to your audience.</p>
                    {/* Placeholder for preview */}
                    <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-md mt-6">
                      <p className="text-muted-foreground">Preview will appear here.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {currentStep === 3 && (
              <div className="py-4 w-full max-w-3xl mx-auto">
                <div className="border rounded-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Delivery Settings</h2>
                  <p className="text-muted-foreground mb-6">
                    Configure how your lead magnet will be delivered to your audience.
                  </p>

                  {/* Placeholder for delivery settings */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Delivery Method</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose how you want to deliver your lead magnet to your audience.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="border rounded-md p-4 cursor-pointer hover:border-violet-400 transition-colors">
                          <h4 className="font-medium">Email Delivery</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Send the lead magnet directly to the user's email.
                          </p>
                        </div>
                        <div className="border rounded-md p-4 cursor-pointer hover:border-violet-400 transition-colors">
                          <h4 className="font-medium">Download Page</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Redirect users to a download page after form submission.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Form Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure the form that users will fill out to receive your lead magnet.
                      </p>
                      <div className="border rounded-md p-4 mt-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Name Field</h4>
                              <p className="text-sm text-muted-foreground">Collect the user's name</p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm mr-2">Required</span>
                              <Switch defaultChecked />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Email Field</h4>
                              <p className="text-sm text-muted-foreground">Collect the user's email</p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm mr-2">Required</span>
                              <Switch defaultChecked />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Phone Field</h4>
                              <p className="text-sm text-muted-foreground">Collect the user's phone number</p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm mr-2">Required</span>
                              <Switch />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Company Field</h4>
                              <p className="text-sm text-muted-foreground">Collect the user's company name</p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm mr-2">Required</span>
                              <Switch />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Thank You Page</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure the page that users will see after submitting the form.
                      </p>
                      <div className="border rounded-md p-4 mt-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="thank-you-message">Thank You Message</Label>
                            <Textarea
                              id="thank-you-message"
                              placeholder="Enter a thank you message to display after form submission"
                              className="min-h-20"
                              defaultValue="Thank you for downloading our lead magnet! Check your email for your download link."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="redirect-url">Redirect URL (Optional)</Label>
                            <Input id="redirect-url" placeholder="https://example.com/thank-you" />
                            <p className="text-xs text-muted-foreground">
                              If provided, users will be redirected to this URL after form submission.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="py-4 w-full max-w-3xl mx-auto">
                <div className="border rounded-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Publish Lead Magnet</h2>
                  <p className="text-muted-foreground mb-6">
                    Review your lead magnet and publish it to make it available to your audience.
                  </p>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Lead Magnet Summary</h3>
                      <div className="border rounded-md p-4 mt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Name</p>
                            <p className="text-sm text-muted-foreground">Ultimate Guide to Digital Marketing</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Type</p>
                            <p className="text-sm text-muted-foreground">PDF Document</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Files</p>
                            <p className="text-sm text-muted-foreground">1 PDF (2.4 MB)</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Delivery Method</p>
                            <p className="text-sm text-muted-foreground">Email Delivery</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Publishing Options</h3>
                      <div className="border rounded-md p-4 mt-2">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Publish Now</h4>
                              <p className="text-sm text-muted-foreground">
                                Make your lead magnet available immediately
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Schedule Publication</h4>
                              <p className="text-sm text-muted-foreground">Set a future date for publication</p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Save as Draft</h4>
                              <p className="text-sm text-muted-foreground">Save your lead magnet as a draft</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Promotion</h3>
                      <div className="border rounded-md p-4 mt-2">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Feature on Homepage</h4>
                              <p className="text-sm text-muted-foreground">
                                Showcase this lead magnet on your homepage
                              </p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Send Email Announcement</h4>
                              <p className="text-sm text-muted-foreground">
                                Notify your subscribers about this lead magnet
                              </p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white gap-2">
                Publish
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function Label({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}
