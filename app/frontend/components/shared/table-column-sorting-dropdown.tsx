import { ChevronsUpDown, ArrowUp, ArrowDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TableColumnSortingDropdownProps {
  label: string
  onAsc?: () => void
  onDesc?: () => void
  triggerIcon?: React.ReactNode
}

const TableColumnSortingDropdown: React.FC<TableColumnSortingDropdownProps> = ({
  label,
  onAsc,
  onDesc,
  triggerIcon,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-muted-foreground"
        >
          {label}
          {triggerIcon || <ChevronsUpDown className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[221px]" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onAsc}>
            <ArrowUp size={16} />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDesc}>
            <ArrowDown size={16} />
            Desc
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TableColumnSortingDropdown
