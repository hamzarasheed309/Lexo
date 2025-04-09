"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LeadJourneyVisualization } from "@/components/lead-journey-visualization"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface AnalyticsDashboardProps {
  leadMagnetId?: string
}

export function AnalyticsDashboard({ leadMagnetId }: AnalyticsDashboardProps) {
  const [period, setPeriod] = useState("30days")
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalyticsData()
  }, [leadMagnetId, period])

  const fetchAnalyticsData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (leadMagnetId) {
        params.append("leadMagnetId", leadMagnetId)
      }
      params.append("period", period)

      const response = await fetch(`/api/analytics?${params.toString()}`)
      const data = await response.json()
      setAnalyticsData(data)
    } catch (error) {
      console.error("Error fetching analytics data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-muted-foreground">No analytics data available</p>
      </div>
    )
  }

  const { leadMagnets, timeSeriesData, summaryMetrics, journeyData } = analyticsData

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00c49f"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryMetrics.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {timeSeriesData.length > 1 &&
                `${timeSeriesData[timeSeriesData.length - 1].views > timeSeriesData[0].views ? "+" : "-"}${Math.abs(
                  timeSeriesData[timeSeriesData.length - 1].views - timeSeriesData[0].views,
                ).toLocaleString()} from previous period`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryMetrics.totalConversions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {timeSeriesData.length > 1 &&
                `${
                  timeSeriesData[timeSeriesData.length - 1].conversions > timeSeriesData[0].conversions ? "+" : "-"
                }${Math.abs(
                  timeSeriesData[timeSeriesData.length - 1].conversions - timeSeriesData[0].conversions,
                ).toLocaleString()} from previous period`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20" />
              <path d="m17 5-5-3-5 3" />
              <path d="m17 19-5 3-5-3" />
              <path d="M2 12h20" />
              <path d="m5 7-3 5 3 5" />
              <path d="m19 7 3 5-3 5" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryMetrics.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {timeSeriesData.length > 1 &&
                `${
                  timeSeriesData[timeSeriesData.length - 1].conversionRate > timeSeriesData[0].conversionRate
                    ? "+"
                    : "-"
                }${Math.abs(
                  timeSeriesData[timeSeriesData.length - 1].conversionRate - timeSeriesData[0].conversionRate,
                ).toFixed(1)}% from previous period`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Lead Magnets</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadMagnets.length}</div>
            <p className="text-xs text-muted-foreground">
              {leadMagnets.filter((lm) => lm.status === "published").length} published
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leadMagnets">Lead Magnets</TabsTrigger>
          <TabsTrigger value="journeys">Lead Journeys</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Analytics</CardTitle>
              <CardDescription>View your lead magnet performance over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeSeriesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="views"
                    name="Views"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="conversions" name="Conversions" stroke="#82ca9d" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="conversionRate"
                    name="Conversion Rate (%)"
                    stroke="#ffc658"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance by Type</CardTitle>
                <CardDescription>Conversion rates by lead magnet type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={summaryMetrics.typePerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="conversions"
                      nameKey="type"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {summaryMetrics.typePerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Lead Magnets</CardTitle>
                <CardDescription>Lead magnets with highest conversion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadMagnets
                    .filter((lm) => lm.analytics && lm.analytics.views > 0)
                    .sort((a, b) => b.analytics.conversionRate - a.analytics.conversionRate)
                    .slice(0, 5)
                    .map((leadMagnet, index) => (
                      <div key={leadMagnet.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium">{leadMagnet.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {leadMagnet.analytics.conversions} conversions from {leadMagnet.analytics.views} views
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{(leadMagnet.analytics.conversionRate * 100).toFixed(1)}%</div>
                          <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${leadMagnet.analytics.conversionRate * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leadMagnets" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Magnet Performance</CardTitle>
              <CardDescription>Detailed performance metrics for all lead magnets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 text-sm font-medium">
                  <div>Name</div>
                  <div>Type</div>
                  <div>Views</div>
                  <div>Conversions</div>
                  <div>Conversion Rate</div>
                  <div>Avg. Time to Convert</div>
                </div>
                <div className="divide-y">
                  {leadMagnets.map((leadMagnet) => (
                    <div key={leadMagnet.id} className="grid grid-cols-6 gap-4 p-4 text-sm">
                      <div className="font-medium">{leadMagnet.name}</div>
                      <div>{leadMagnet.fileType}</div>
                      <div>{leadMagnet.analytics?.views || 0}</div>
                      <div>{leadMagnet.analytics?.conversions || 0}</div>
                      <div>
                        {leadMagnet.analytics?.views > 0
                          ? `${(leadMagnet.analytics.conversionRate * 100).toFixed(1)}%`
                          : "0%"}
                      </div>
                      <div>
                        {leadMagnet.analytics?.avgTimeToConvert
                          ? `${leadMagnet.analytics.avgTimeToConvert.toFixed(1)} mins`
                          : "N/A"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journeys" className="mt-4">
          <LeadJourneyVisualization leadJourneys={journeyData.leads} conversionPaths={journeyData.conversionPaths} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
