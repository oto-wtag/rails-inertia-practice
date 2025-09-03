import { router } from "@inertiajs/react"

export function useUpdateQueryParams() {
  return (
    updates: Record<string, string | number | null | undefined>,
    options?: {
      replace?: boolean
      preserveScroll?: boolean
      preserveState?: boolean
    },
  ) => {
    const currentUrl = new URL(window.location.href)
    const searchParams = currentUrl.searchParams

    // apply updates
    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        value.toString().trim() === ""
      ) {
        searchParams.delete(key)
      } else {
        searchParams.set(key, value.toString())
      }
    })

    const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`

    router.get(
      newUrl,
      {},
      {
        replace: options?.replace ?? true,
        preserveScroll: options?.preserveScroll ?? true,
        preserveState: options?.preserveState ?? true,
      },
    )
  }
}
