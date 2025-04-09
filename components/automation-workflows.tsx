import { Clock, Edit, MoreHorizontal, Play, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

export function AutomationWorkflows() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium">
          <div>Name</div>
          <div>Type</div>
          <div>Status</div>
          <div>Last Run</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="grid grid-cols-5 gap-4 p-4 text-sm">
              <div className="font-medium">{workflow.name}</div>
              <div>{workflow.type}</div>
              <div className="flex items-center gap-2">
                <Switch checked={workflow.status === "Active"} />
                <span>{workflow.status}</span>
              </div>
              <div>{workflow.lastRun}</div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon">
                  <Play className="h-4 w-4" />
                  <span className="sr-only">Run</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
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
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Schedule</span>
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
    </div>
  )
}

const workflows = [
  {
    id: "1",
    name: "Welcome Sequence",
    type: "Email",
    status: "Active",
    lastRun: "2 hours ago",
  },
  {
    id: "2",
    name: "Lead Scoring",
    type: "Automation",
    status: "Active",
    lastRun: "1 day ago",
  },
  {
    id: "3",
    name: "Re-engagement Campaign",
    type: "Email",
    status: "Inactive",
    lastRun: "1 week ago",
  },
  {
    id: "4",
    name: "CRM Sync",
    type: "Integration",
    status: "Active",
    lastRun: "3 hours ago",
  },
  {
    id: "5",
    name: "Lead Nurturing",
    type: "Email",
    status: "Active",
    lastRun: "12 hours ago",
  },
]
