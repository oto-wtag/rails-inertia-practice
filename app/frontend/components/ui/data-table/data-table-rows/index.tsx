import { flexRender } from "@tanstack/react-table"

import type { Table } from "@tanstack/react-table"

import { TableRow, TableCell } from "@/components/ui/table"

interface DataTableRowsProps<TData> {
  table: Table<TData>
}

const DataTableRows = <TData,>({ table }: DataTableRowsProps<TData>) => {
  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() ? "selected" : undefined}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} width={cell.column.columnDef.size}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export default DataTableRows
