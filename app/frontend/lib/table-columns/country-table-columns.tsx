import { Eye } from "lucide-react"

import type { ColumnDef } from "@tanstack/react-table"

import TableColumnSortingDropdown from "@/components/shared/table-column-sorting-dropdown"
import { buttonVariants } from "@/components/ui/button"
import { updateRansackQueryParams } from "@/lib/helper-functions/update-ransack-query-params"
import { cn } from "@/lib/utils"
import { Link } from "@inertiajs/react"
import DeleteCountry from "@/components/admin/countries/delete-country"

export default function useCountryListColumns(): ColumnDef<any>[] {
  return [
    {
      accessorKey: "code",
      header: () => {
        return (
          <TableColumnSortingDropdown
            label="Country Code"
            onAsc={() =>
              updateRansackQueryParams({
                sortColumn: "code",
                sortDirection: "asc",
                page: 1,
              })
            }
            onDesc={() =>
              updateRansackQueryParams({
                sortColumn: "code",
                sortDirection: "desc",
                page: 1,
              })
            }
          />
        )
      },
      cell: ({ row }) => <div className="px-3">{row.getValue("code")}</div>,
      size: 265,
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: () => {
        return (
          <TableColumnSortingDropdown
            label="Country"
            onAsc={() =>
              updateRansackQueryParams({
                sortColumn: "name",
                sortDirection: "asc",
                page: 1,
              })
            }
            onDesc={() =>
              updateRansackQueryParams({
                sortColumn: "name",
                sortDirection: "desc",
                page: 1,
              })
            }
          />
        )
      },
      cell: ({ row }) => <div className="px-3">{row.getValue("name")}</div>,
      size: 265,
      enableSorting: true,
    },
    {
      accessorKey: "institutes_count",
      header: () => {
        return (
          <TableColumnSortingDropdown
            label="Institutes"
            onAsc={() =>
              updateRansackQueryParams({
                sortColumn: "institutes_count",
                sortDirection: "asc",
                page: 1,
              })
            }
            onDesc={() =>
              updateRansackQueryParams({
                sortColumn: "institutes_count",
                sortDirection: "desc",
                page: 1,
              })
            }
          />
        )
      },
      cell: ({ row }) => (
        <div className="px-3">{row.getValue("institutes_count")}</div>
      ),
      size: 265,
      enableSorting: true,
    },
    {
      accessorKey: "action",
      header: () => {
        return (
          <div className="flex items-center justify-end">
            <span className="text-muted-foreground hover:text-muted-foreground">
              Action
            </span>
          </div>
        )
      },
      enableHiding: false,
      cell: ({ row }) => {
        const employeeId = row.original.id

        return (
          <div className="flex items-center justify-end gap-2">
            <Link
              href={`/employees/${employeeId}/profile`}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              <Eye size={16} />
            </Link>
            <DeleteCountry country={row.original} />
          </div>
        )
      },
      size: 120,
    },
  ]
}
