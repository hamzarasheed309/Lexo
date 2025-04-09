"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

import { Card } from "@/components/ui/card"

export function ConversionChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="p-2 border shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Visitors</span>
                      <span className="font-bold text-sm">{payload[0].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Conversions</span>
                      <span className="font-bold text-sm">{payload[1].value}</span>
                    </div>
                  </div>
                </Card>
              )
            }
            return null
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="visitors" stroke="#8884d8" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="conversions" stroke="#82ca9d" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

const data = [
  {
    name: "Jan",
    visitors: 4000,
    conversions: 240,
  },
  {
    name: "Feb",
    visitors: 3000,
    conversions: 198,
  },
  {
    name: "Mar",
    visitors: 2000,
    conversions: 120,
  },
  {
    name: "Apr",
    visitors: 2780,
    conversions: 167,
  },
  {
    name: "May",
    visitors: 1890,
    conversions: 113,
  },
  {
    name: "Jun",
    visitors: 2390,
    conversions: 143,
  },
  {
    name: "Jul",
    visitors: 3490,
    conversions: 209,
  },
]
