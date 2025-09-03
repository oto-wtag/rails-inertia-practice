import { Moon, Sun } from "lucide-react"
import { useAppearance } from "@/hooks/use-appearance"
import { cn } from "@/lib/utils"

interface ModeToggleProps {
  className?: string
}

export default function ModeToggleSwitch({ className }: ModeToggleProps) {
  const { appearance, updateAppearance } = useAppearance()

  const toggleAppearance = () => {
    updateAppearance(appearance === "dark" ? "light" : "dark")
  }

  const isDark =
    appearance === "dark" ||
    (appearance === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <button
      className={cn(
        "flex h-7 w-14 cursor-pointer rounded-full p-[3px] transition-all duration-300",
        isDark
          ? "border border-zinc-800 bg-zinc-950"
          : "border border-zinc-200 bg-white",
        className,
      )}
      onClick={toggleAppearance}
      type="button"
      tabIndex={0}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="flex w-full items-center justify-between">
        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full transition-transform duration-300",
            isDark ? "translate-x-0 bg-zinc-800" : "translate-x-7 bg-gray-200",
          )}
        >
          {isDark ? (
            <Moon className="h-[14px] w-[14px] text-white" strokeWidth={1.5} />
          ) : (
            <Sun
              className="h-[14px] w-[14px] text-gray-700"
              strokeWidth={1.5}
            />
          )}
        </div>
        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full transition-transform duration-300",
            isDark ? "bg-transparent" : "-translate-x-7",
          )}
        >
          {isDark ? (
            <Sun
              className="h-[14px] w-[14px] text-gray-500"
              strokeWidth={1.5}
            />
          ) : (
            <Moon className="h-[14px] w-[14px] text-black" strokeWidth={1.5} />
          )}
        </div>
      </div>
    </button>
  )
}
