import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@inertiajs/react"

export const NavConfigurations = ({
  configurations,
}: {
  configurations: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) => {
  return (
    <SidebarGroup /*className="group-data-[collapsible=icon]:hidden" */>
      <SidebarGroupLabel>Configurations</SidebarGroupLabel>
      <SidebarMenu>
        {configurations.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name}>
              <Link prefetch href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
