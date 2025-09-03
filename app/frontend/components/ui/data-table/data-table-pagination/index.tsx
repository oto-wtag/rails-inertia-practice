import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

interface PaginationConfig {
  page: number
  pages: number
  count: number
  onPageChange: (page: number) => void
}

const DataTablePagination = ({
  pagination,
}: {
  pagination: PaginationConfig
}) => {
  const { page, pages, onPageChange } = pagination

  if (pages <= 1) return null

  const generatePaginationItems = (): React.ReactElement[] => {
    const items: React.ReactElement[] = []
    const delta = 1
    const rangeStart = Math.max(1, page - delta)
    const rangeEnd = Math.min(pages, page + delta)

    if (rangeStart > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={page === 1}
            onClick={(e) => {
              e.preventDefault()
              onPageChange(1)
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      )
      if (rangeStart > 2)
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        )
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === page}
            onClick={(e) => {
              e.preventDefault()
              onPageChange(i)
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    if (rangeEnd < pages) {
      if (rangeEnd < pages - 1)
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        )
      items.push(
        <PaginationItem key={pages}>
          <PaginationLink
            href="#"
            isActive={page === pages}
            onClick={(e) => {
              e.preventDefault()
              onPageChange(pages)
            }}
          >
            {pages}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return items
  }

  return (
    <div className="flex items-end justify-end">
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (page > 1) onPageChange(page - 1)
                }}
                className={cn({ "pointer-events-none opacity-50": page <= 1 })}
              />
            </PaginationItem>

            {generatePaginationItems()}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (page < pages) onPageChange(page + 1)
                }}
                className={cn({
                  "pointer-events-none opacity-50": page >= pages,
                })}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default DataTablePagination
