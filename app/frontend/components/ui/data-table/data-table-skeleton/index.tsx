import type { Table } from '@tanstack/react-table';

import { Skeleton } from '@/components/ui/skeleton';
import { TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTableSkeletonProps<TData> {
  table: Table<TData>;
}

const DataTableSkeleton = <TData,>({ table }: DataTableSkeletonProps<TData>) => {
  const numberOfSkeletonRows = 10;
  const skeletonRowsArray = [...Array(numberOfSkeletonRows)];

  const skeleton = <Skeleton className="bg-muted h-4 w-full animate-pulse rounded-full" />;

  return skeletonRowsArray.map((_, i) => (
    <TableRow key={`skeleton-${i}`} className={cn('h-[55px]')}>
      {table.getAllLeafColumns().map((column) => {
        if (column.id === 'select') {
          return <TableCell key={column.id} width={column.columnDef.size} />;
        }

        return (
          <TableCell key={column.id} width={column.columnDef.size}>
            {column.columnDef.enableSorting ? <div className="px-3">{skeleton}</div> : skeleton}
          </TableCell>
        );
      })}
    </TableRow>
  ));
};

export default DataTableSkeleton;
