"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, SortAsc, SortDesc, ArrowUpRight, Edit, MoreHorizontal, Trash, Download } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { DashboardNav } from "@/components/dashboard-nav"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LeadMagnetsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterType, setFilterType] = useState<string>("all")

  // Filter and sort lead magnets
  const filteredLeadMagnets = leadMagnets
    .filter((leadMagnet) => {
      if (filterType !== "all" && leadMagnet.type.toLowerCase() !== filterType) {
        return false
      }

      if (searchQuery) {
        return leadMagnet.name.toLowerCase().includes(searchQuery.toLowerCase())
      }

      return true
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 lg:block">
          <DashboardNav />
        </aside>
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between mb-6"
          >
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-indigo-700">
              Lead Magnets
            </h1>
            <Link href="/lead-magnets/create">
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create Lead Magnet
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="search"
                  placeholder="Search lead magnets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                <Button type="submit" size="icon" variant="ghost">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="ebook">eBook</SelectItem>
                    <SelectItem value="checklist">Checklist</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                    <SelectItem value="tool">Tool</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  <span className="sr-only">Sort Order</span>
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Lead Magnets</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {filteredLeadMagnets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <FileIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No lead magnets found</h3>
                    <p className="text-muted-foreground mt-1 mb-4">
                      {searchQuery || filterType !== "all"
                        ? "Try adjusting your search or filters"
                        : "Create your first lead magnet to get started"}
                    </p>
                    {!searchQuery && filterType === "all" && (
                      <Link href="/lead-magnets/create">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Lead Magnet
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium">
                      <div>Name</div>
                      <div>Type</div>
                      <div>Conversion Rate</div>
                      <div>Leads</div>
                      <div className="text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {filteredLeadMagnets.map((leadMagnet) => (
                        <div key={leadMagnet.id} className="grid grid-cols-5 gap-4 p-4 text-sm">
                          <div className="font-medium">{leadMagnet.name}</div>
                          <div>{leadMagnet.type}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Progress value={leadMagnet.conversionRate * 100} className="h-2" />
                              <span>{(leadMagnet.conversionRate * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                          <div>{leadMagnet.leads}</div>
                          <div className="flex justify-end gap-2">
                            <Link href={`/lead-magnets/${leadMagnet.id}`}>
                              <Button variant="ghost" size="icon">
                                <ArrowUpRight className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </Link>
                            <Link href={`/lead-magnets/${leadMagnet.id}/edit`}>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </Link>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  <span>Download</span>
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
                                <DropdownMenuItem className="text-destructive">
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="active" className="mt-6">
                {/* Similar content as "all" tab but filtered for active lead magnets */}
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium">
                    <div>Name</div>
                    <div>Type</div>
                    <div>Conversion Rate</div>
                    <div>Leads</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredLeadMagnets
                      .filter((lm) => lm.status === "active")
                      .map((leadMagnet) => (
                        <div key={leadMagnet.id} className="grid grid-cols-5 gap-4 p-4 text-sm">
                          <div className="font-medium">{leadMagnet.name}</div>
                          <div>{leadMagnet.type}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Progress value={leadMagnet.conversionRate * 100} className="h-2" />
                              <span>{(leadMagnet.conversionRate * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                          <div>{leadMagnet.leads}</div>
                          <div className="flex justify-end gap-2">
                            <Link href={`/lead-magnets/${leadMagnet.id}`}>
                              <Button variant="ghost" size="icon">
                                <ArrowUpRight className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </Link>
                            <Link href={`/lead-magnets/${leadMagnet.id}/edit`}>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </Link>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  <span>Download</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="draft" className="mt-6">
                {/* Content for draft lead magnets */}
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <FileIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No draft lead magnets</h3>
                  <p className="text-muted-foreground mt-1 mb-4">You don't have any lead magnets saved as drafts</p>
                  <Link href="/lead-magnets/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Lead Magnet
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="archived" className="mt-6">
                {/* Content for archived lead magnets */}
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <ArchiveIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No archived lead magnets</h3>
                  <p className="text-muted-foreground mt-1 mb-4">You don't have any archived lead magnets</p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

// Icons
function FileIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function ArchiveIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  )
}

// Sample data
const leadMagnets = [
  {
    id: "1",
    name: "Ultimate Guide to SEO",
    type: "eBook",
    conversionRate: 0.045,
    leads: 1245,
    status: "active",
  },
  {
    id: "2",
    name: "Marketing ROI Calculator",
    type: "Tool",
    conversionRate: 0.062,
    leads: 876,
    status: "active",
  },
  {
    id: "3",
    name: "Social Media Strategy Template",
    type: "Template",
    conversionRate: 0.038,
    leads: 654,
    status: "active",
  },
  {
    id: "4",
    name: "Email Marketing Masterclass",
    type: "Webinar",
    conversionRate: 0.051,
    leads: 432,
    status: "active",
  },
  {
    id: "5",
    name: "Content Creation Toolkit",
    type: "Checklist",
    conversionRate: 0.056,
    leads: 321,
    status: "active",
  },
]
