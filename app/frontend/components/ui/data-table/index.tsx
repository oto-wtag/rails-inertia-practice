import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { type JSX, useState } from "react"

import type { ColumnDef, VisibilityState } from "@tanstack/react-table"

import DataTableError from "@/components/ui/data-table/data-table-error"
import DataTableHeader from "@/components/ui/data-table/data-table-header"
import DataTableNoDataFound from "@/components/ui/data-table/data-table-no-data-found"
import DataTablePagination from "@/components/ui/data-table/data-table-pagination"
import DataTableRows from "@/components/ui/data-table/data-table-rows"
import DataTableSearch from "@/components/ui/data-table/data-table-search"
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton"
import { Table, TableBody } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface PaginationConfig {
  page: number
  pages: number
  count: number
  onPageChange: (page: number) => void
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  isError?: boolean
  onSearch?: (searchText: string) => void
  sortButtons?: React.ReactNode
  actionButtons?: React.ReactNode | JSX.Element
  pagination?: PaginationConfig
  columnVisibility?: VisibilityState
  setColumnVisibility?: React.Dispatch<React.SetStateAction<VisibilityState>>
  rowSelection?: Record<string, boolean>
  setRowSelection?: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
  className?: string
  headerClassName?: string
  showSearch?: boolean
  getRowId?: (row: TData, index: number) => string
  searchValue?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  isError = false,
  onSearch,
  sortButtons,
  actionButtons,
  pagination,
  columnVisibility,
  setColumnVisibility,
  rowSelection,
  setRowSelection,
  className,
  headerClassName,
  showSearch = true,
  getRowId,
  searchValue,
}: DataTableProps<TData, TValue>) {
  const [internalColumnVisibility, setInternalColumnVisibility] =
    useState<VisibilityState>({})
  const [internalRowSelection, setInternalRowSelection] = useState<
    Record<string, boolean>
  >({})

  const table = useReactTable({
    data,
    columns,
    onColumnVisibilityChange:
      setColumnVisibility ?? setInternalColumnVisibility,
    getRowId: getRowId ?? ((_, index) => String(index)),
    onRowSelectionChange: setRowSelection ?? setInternalRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility: columnVisibility ?? internalColumnVisibility,
      rowSelection: rowSelection ?? internalRowSelection,
    },
  })

  return (
    <div className="space-y-5">
      {(showSearch || sortButtons || actionButtons) && (
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-2">
            {onSearch && (
              <DataTableSearch onSearch={onSearch} value={searchValue} />
            )}
            {sortButtons}
          </div>
          {actionButtons}
        </div>
      )}

      {isError ? (
        <DataTableError />
      ) : !table.getRowModel().rows?.length && !isLoading ? (
        <DataTableNoDataFound />
      ) : (
        <div
          className={cn(
            "bg-background max-w-full rounded-md border",
            className,
          )}
        >
          <Table>
            <DataTableHeader className={headerClassName} table={table} />
            <TableBody>
              {isLoading || !data ? (
                <DataTableSkeleton table={table} />
              ) : (
                <DataTableRows table={table} />
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {pagination && <DataTablePagination pagination={pagination} />}
    </div>
  )
}
