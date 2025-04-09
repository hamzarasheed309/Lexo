"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Edit, Share2, BarChart3, Copy, Trash, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LeadMagnetPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  // In a real app, you would fetch the lead magnet data based on the ID
  const leadMagnet = {
    id: params.id,
    name: "Ultimate Guide to SEO",
    type: "eBook",
    description: "A comprehensive guide to search engine optimization strategies for 2023.",
    conversionRate: 0.045,
    leads: 1245,
    downloads: 1876,
    views: 4532,
    createdAt: "2023-06-15",
    updatedAt: "2023-09-22",
    coverImage: "/lead-magnet-creation.jpg",
    status: "active",
    category: "Marketing",
    tags: ["SEO", "Digital Marketing", "Content Strategy"],
    author: "John Doe",
    fileUrl: "#",
    landingPageUrl: "https://lexo.io/lead-magnets/ultimate-guide-to-seo",
    embedCode:
      '<iframe src="https://lexo.io/embed/ultimate-guide-to-seo" width="100%" height="400" frameborder="0"></iframe>',
  }

  const handleDelete = () => {
    // In a real app, you would call an API to delete the lead magnet
    console.log("Deleting lead magnet:", params.id)
    setIsDeleteDialogOpen(false)
    router.push("/lead-magnets")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(leadMagnet.landingPageUrl)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(leadMagnet.embedCode)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
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
            className="flex flex-wrap items-center justify-between gap-4 mb-6"
          >
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-indigo-700">
                {leadMagnet.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{leadMagnet.type}</Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Created on {new Date(leadMagnet.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/lead-magnets/${params.id}/edit`}>
                <Button variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </Link>

              <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Lead Magnet</DialogTitle>
                    <DialogDescription>
                      Share your lead magnet with others or embed it on your website.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Landing Page URL</h4>
                      <div className="flex items-center gap-2">
                        <Input value={leadMagnet.landingPageUrl} readOnly className="flex-1" />
                        <Button size="sm" onClick={handleCopyLink}>
                          {copySuccess ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Embed Code</h4>
                      <div className="flex items-center gap-2">
                        <Textarea value={leadMagnet.embedCode} readOnly className="flex-1 font-mono text-xs" />
                        <Button size="sm" onClick={handleCopyEmbed}>
                          {copySuccess ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button onClick={() => setIsShareDialogOpen(false)}>Done</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">More</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <span>View Landing Page</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                    <span>Duplicate</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(leadMagnet.conversionRate * 100).toFixed(1)}%</div>
                  <Progress value={leadMagnet.conversionRate * 100} className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{leadMagnet.leads.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-2">From {leadMagnet.views.toLocaleString()} views</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{leadMagnet.downloads.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {((leadMagnet.downloads / leadMagnet.leads) * 100).toFixed(1)}% of leads
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Lead Magnet Details</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                        <p className="mt-1">{leadMagnet.description}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                        <p className="mt-1">{leadMagnet.category}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Tags</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {leadMagnet.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Author</h4>
                        <p className="mt-1">{leadMagnet.author}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Last Updated</h4>
                        <p className="mt-1">{new Date(leadMagnet.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Preview</h3>
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border">
                      <Image
                        src={leadMagnet.coverImage || "/placeholder.svg"}
                        alt={leadMagnet.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex justify-center mt-4">
                      <Button className="gap-2">
                        <Download className="h-4 w-4" />
                        Download Preview
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Performance Summary</h3>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium">
                      <div>Period</div>
                      <div>Views</div>
                      <div>Conversions</div>
                      <div>Rate</div>
                    </div>
                    <div className="divide-y">
                      {[
                        { period: "Last 7 days", views: 342, conversions: 18, rate: 5.3 },
                        { period: "Last 30 days", views: 1245, conversions: 62, rate: 5.0 },
                        { period: "Last 90 days", views: 3421, conversions: 154, rate: 4.5 },
                        { period: "All time", views: 4532, conversions: 204, rate: 4.5 },
                      ].map((row, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 p-4 text-sm">
                          <div>{row.period}</div>
                          <div>{row.views}</div>
                          <div>{row.conversions}</div>
                          <div>{row.rate}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Link href={`/analytics?leadMagnet=${params.id}`}>
                      <Button variant="outline" className="gap-2">
                        <BarChart3 className="h-4 w-4" />
                        View Detailed Analytics
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <BarChart3 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">Detailed Analytics</h3>
                  <p className="text-muted-foreground mt-1 mb-4">View detailed analytics for this lead magnet</p>
                  <Link href={`/analytics?leadMagnet=${params.id}`}>
                    <Button className="gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Go to Analytics
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="leads" className="mt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">Lead Management</h3>
                  <p className="text-muted-foreground mt-1 mb-4">View and manage leads captured by this lead magnet</p>
                  <Link href={`/leads?leadMagnet=${params.id}`}>
                    <Button className="gap-2">
                      <Users className="h-4 w-4" />
                      View Leads
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Settings className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">Lead Magnet Settings</h3>
                  <p className="text-muted-foreground mt-1 mb-4">Configure settings for this lead magnet</p>
                  <Link href={`/lead-magnets/${params.id}/edit`}>
                    <Button className="gap-2">
                      <Settings className="h-4 w-4" />
                      Edit Settings
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lead Magnet</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this lead magnet? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function Settings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
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

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}
