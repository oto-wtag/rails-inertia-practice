import { Link, usePage } from "@inertiajs/react"
import type { SharedData } from "@/types"
import { aboutPath, dashboardPath, signInPath } from "@/routes"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import ModeToggleSwitch from "@/components/mode-toggle/mode-toggle-switch"
import UserDropdown from "@/components/navigation/user-dropdown"

const WebTopNavbar = () => {
  const page = usePage<SharedData>()
  const { auth } = page.props

  return (
    <header className="bg-background sticky top-0 z-50 h-14 w-full shadow dark:border-b dark:shadow-none">
      <nav className="container mx-auto flex h-full w-full items-center justify-between px-3">
        <Link href="/">AppName</Link>

        <div className="flex items-center gap-5">
          <Link
            href={aboutPath()}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            About
          </Link>
          <ModeToggleSwitch />
          {auth.user ? (
            auth.user.role === "admin" ? (
              <Link href={dashboardPath()} className={cn(buttonVariants())}>
                Dashboard
              </Link>
            ) : (
              <UserDropdown auth={auth} />
            )
          ) : (
            <Link href={signInPath()} className={cn(buttonVariants())}>
              Log in
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default WebTopNavbar
