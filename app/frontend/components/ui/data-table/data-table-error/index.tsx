import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const DataTableError = () => {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <Card
      className={cn(
        "bg-surface flex h-full w-full flex-col items-center justify-center gap-6 rounded-md p-14",
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <h1>Error Logo Will be here</h1>
        <div className="text-center">
          <h4 className="text-base font-semibold">Unknown error</h4>
          <p className="font-regular text-muted-foreground text-base">
            Unknown error occurred. <br />
            Please reload the tab.
          </p>
        </div>
      </div>
      <Button onClick={handleReload}>Reload</Button>
    </Card>
  )
}

export default DataTableError
