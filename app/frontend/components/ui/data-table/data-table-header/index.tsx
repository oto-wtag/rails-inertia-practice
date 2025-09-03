import { flexRender } from "@tanstack/react-table"

import type { Table } from "@tanstack/react-table"

import { TableHeader, TableHead, TableRow } from "@/components/ui/table"

interface DataTableHeaderProps<TData> {
  table: Table<TData>
  className?: string
}

const DataTableHeader = <TData,>({
  table,
  className,
}: DataTableHeaderProps<TData>) => {
  return (
    <TableHeader className={className}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}

export default DataTableHeader
