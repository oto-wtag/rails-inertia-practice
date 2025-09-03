import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const DataTableNoDataFound = () => {
  return (
    <Card
      className={cn(
        "bg-surface flex h-full w-full flex-col items-center justify-center space-y-4 rounded-md p-14",
      )}
    >
      <h1>No Data Found Logo</h1>
      <div className="text-center">
        <h4 className="text-base font-semibold">No data found</h4>
        <p className="text-muted-foreground text-base font-normal">
          No data is found here
        </p>
      </div>
    </Card>
  )
}

export default DataTableNoDataFound
