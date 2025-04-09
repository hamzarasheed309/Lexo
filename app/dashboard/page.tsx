"use client"

import { useState } from "react"
import { ArrowUpRight, BarChart3, FileText, Plus, Users } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { LeadMagnetList } from "@/components/lead-magnet-list"
import { RecentLeads } from "@/components/recent-leads"
import { ConversionChart } from "@/components/conversion-chart"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

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
              Dashboard
            </h1>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Lead Magnet
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-violet-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,345</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-violet-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">+0.5% from last month</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Lead Magnets</CardTitle>
                <FileText className="h-4 w-4 text-violet-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Time to Convert</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-violet-500"
                >
                  <path d="M12 2v10l4.24 4.24" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4 days</div>
                <p className="text-xs text-muted-foreground">-0.3 days from last month</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="bg-muted/60">
                <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>
                  Overview
                </TabsTrigger>
                <TabsTrigger value="analytics" onClick={() => setActiveTab("analytics")}>
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="reports" onClick={() => setActiveTab("reports")}>
                  Reports
                </TabsTrigger>
                <TabsTrigger value="notifications" onClick={() => setActiveTab("notifications")}>
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4 overflow-hidden transition-all hover:shadow-md">
                    <CardHeader>
                      <CardTitle>Conversion Analytics</CardTitle>
                      <CardDescription>View your lead magnet performance over time.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <ConversionChart />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3 overflow-hidden transition-all hover:shadow-md">
                    <CardHeader>
                      <CardTitle>Recent Leads</CardTitle>
                      <CardDescription>You acquired 128 leads this week.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentLeads />
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full group">
                        View All
                        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-[-2px]" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle>Your Lead Magnets</CardTitle>
                    <CardDescription>Manage and track your lead magnets.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LeadMagnetList />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full group">
                      View All Lead Magnets
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-[-2px]" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="analytics">
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Detailed analytics for your lead magnets.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-md">
                      <p className="text-muted-foreground">Analytics content will appear here.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
