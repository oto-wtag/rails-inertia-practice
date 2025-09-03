import type { ReactNode } from "react"

import type { BreadcrumbItem } from "@/types"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"

import { AppContent } from "@/components/app-content"
import { AppSidebar } from "@/components/navigation/app-sidebar"
import { AppSidebarHeader } from "@/components/navigation/app-sidebar/app-sidebar-header"

interface AppLayoutProps {
  children: ReactNode
  breadcrumbs?: BreadcrumbItem[]
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
  const [isOpen, setIsOpen] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("sidebar") !== "false"
      : true,
  )

  const handleSidebarChange = (open: boolean) => {
    setIsOpen(open)

    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar", String(open))
    }
  }

  return (
    <SidebarProvider
      defaultOpen={isOpen}
      open={isOpen}
      onOpenChange={handleSidebarChange}
    >
      <AppSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden">
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
      </AppContent>
    </SidebarProvider>
  )
}
