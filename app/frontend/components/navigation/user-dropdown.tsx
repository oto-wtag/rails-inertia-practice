import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { sessionPath, settingsProfilePath } from "@/routes"
import type { Auth } from "@/types"
import { Link, router } from "@inertiajs/react"
import { LogOut, Settings } from "lucide-react"
import { useMobileNavigation } from "@/hooks/use-mobile-navigation"
import { UserInfo } from "@/components/navigation/user-info"

const UserDropdown = ({ auth }: { auth: Auth }) => {
  const cleanup = useMobileNavigation()
  const handleLogout = () => {
    cleanup()
    router.flushAll()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={cn("cursor-pointer")}>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="end"
        side="bottom"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserInfo user={auth.user} showEmail={true} />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              className="block w-full"
              href={settingsProfilePath()}
              as="button"
              prefetch
              onClick={cleanup}
            >
              <Settings className="mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            className="block w-full"
            method="delete"
            href={sessionPath({ id: auth.session.id })}
            as="button"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
