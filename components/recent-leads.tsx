import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentLeads() {
  return (
    <div className="space-y-8">
      {recentLeads.map((lead) => (
        <div key={lead.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={lead.avatar} alt={lead.name} />
            <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{lead.name}</p>
            <p className="text-sm text-muted-foreground">{lead.email}</p>
          </div>
          <div className="ml-auto font-medium">{lead.source}</div>
        </div>
      ))}
    </div>
  )
}

const recentLeads = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex@example.com",
    avatar: "/placeholder-user.jpg",
    source: "eBook",
  },
  {
    id: "2",
    name: "Sophia Chen",
    email: "sophia@example.com",
    avatar: "/placeholder-user.jpg",
    source: "Webinar",
  },
  {
    id: "3",
    name: "Marcus Johnson",
    email: "marcus@example.com",
    avatar: "/placeholder-user.jpg",
    source: "Template",
  },
  {
    id: "4",
    name: "Olivia Davis",
    email: "olivia@example.com",
    avatar: "/placeholder-user.jpg",
    source: "Tool",
  },
  {
    id: "5",
    name: "Ethan Wilson",
    email: "ethan@example.com",
    avatar: "/placeholder-user.jpg",
    source: "eBook",
  },
]
