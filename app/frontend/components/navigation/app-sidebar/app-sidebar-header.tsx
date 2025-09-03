import { usePage } from "@inertiajs/react"
import type { SharedData } from "@/types"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import type { BreadcrumbItem as BreadcrumbItemType } from "@/types"
import UserDropdown from "@/components/navigation/user-dropdown"
import ModeToggleSwitch from "@/components/mode-toggle/mode-toggle-switch"

export function AppSidebarHeader({
  breadcrumbs = [],
}: {
  breadcrumbs?: BreadcrumbItemType[]
}) {
  const page = usePage<SharedData>()
  const { auth } = page.props
  return (
    <header className="border-sidebar-border/50 flex h-14 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <div className="flex items-center gap-5">
          <ModeToggleSwitch />
          <UserDropdown auth={auth} />
        </div>
      </div>
    </header>
  )
}
