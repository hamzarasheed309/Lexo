import { Check, ExternalLink, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function IntegrationsList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {integrations.map((integration) => (
        <Card key={integration.id} className={integration.connected ? "border-primary" : ""}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{integration.name}</CardTitle>
              {integration.connected && <Check className="h-5 w-5 text-primary" />}
            </div>
            <CardDescription>{integration.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {integration.connected ? (
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full" />
                  Connected
                </div>
              ) : (
                "Not connected"
              )}
            </div>
          </CardContent>
          <CardFooter>
            {integration.connected ? (
              <Button variant="outline" className="w-full gap-2">
                <ExternalLink className="h-4 w-4" />
                Manage
              </Button>
            ) : (
              <Button className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Connect
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

const integrations = [
  {
    id: "1",
    name: "Mailchimp",
    description: "Email marketing platform",
    connected: true,
  },
  {
    id: "2",
    name: "Salesforce",
    description: "CRM platform",
    connected: true,
  },
  {
    id: "3",
    name: "HubSpot",
    description: "Marketing, sales, and service platform",
    connected: false,
  },
  {
    id: "4",
    name: "Zapier",
    description: "Workflow automation tool",
    connected: true,
  },
  {
    id: "5",
    name: "Google Analytics",
    description: "Web analytics service",
    connected: false,
  },
  {
    id: "6",
    name: "Slack",
    description: "Business communication platform",
    connected: false,
  },
]
