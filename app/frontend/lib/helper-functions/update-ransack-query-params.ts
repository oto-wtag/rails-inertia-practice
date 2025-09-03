import { router } from "@inertiajs/react"

export function updateRansackQueryParams({
  sortColumn,
  sortDirection,
  searchFilters,
  page,
  extraParams,
}: {
  sortColumn?: string | null
  sortDirection?: "asc" | "desc" | null
  searchFilters?: Record<string, string | number | null | undefined>
  page?: number
  extraParams?: Record<string, string | number | null | undefined>
}) {
  const currentUrl = new URL(window.location.href)
  const searchParams = currentUrl.searchParams

  // Sorting
  if (sortColumn && sortDirection) {
    searchParams.set("q[s]", `${sortColumn} ${sortDirection}`)
  } else {
    searchParams.delete("q[s]")
  }

  // Filters
  if (searchFilters) {
    Object.entries(searchFilters).forEach(([key, value]) => {
      if (!value || value.toString().trim() === "")
        searchParams.delete(`q[${key}]`)
      else searchParams.set(`q[${key}]`, value.toString())
    })
  }

  // Page
  if (page) searchParams.set("page", page.toString())

  // Extra params
  if (extraParams) {
    Object.entries(extraParams).forEach(([key, value]) => {
      if (!value) searchParams.delete(key)
      else searchParams.set(key, value.toString())
    })
  }

  const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`

  // Use router.visit to update the URL + backend
  router.visit(newUrl, {
    preserveScroll: true,
    preserveState: true,
    replace: true,
  })
}
