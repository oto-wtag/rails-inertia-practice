import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings2,
  LayoutGrid,
  Layers2,
  Users,
  Globe2,
  School,
  BookCopy,
} from "lucide-react"

import { NavMain } from "@/components/navigation/app-sidebar/nav-main"
import { NavConfigurations } from "@/components/navigation/app-sidebar/nav-configurations"
import { NavHeader } from "@/components/navigation/app-sidebar/nav-header"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  dashboardPath,
  adminUsersPath,
  adminConfigurationsCountriesPath,
  adminConfigurationsInstitutesPath,
  adminConfigurationsCoursesPath,
} from "@/routes"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: dashboardPath(),
      icon: LayoutGrid,
    },
    {
      title: "All Users",
      url: adminUsersPath(),
      icon: Users,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  configurations: [
    {
      name: "Countries",
      url: adminConfigurationsCountriesPath(),
      icon: Globe2,
    },
    {
      name: "Institutions",
      url: adminConfigurationsInstitutesPath(),
      icon: School,
    },
    {
      name: "Courses",
      url: adminConfigurationsCoursesPath(),
      icon: BookCopy,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader /*teams={data.teams}*/ />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavConfigurations configurations={data.configurations} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
