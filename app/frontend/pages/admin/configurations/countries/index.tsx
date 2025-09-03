import NewCountryDialog from "@/components/admin/countries/new-country-dialog"
import { DataTable } from "@/components/ui/data-table"
import AppLayout from "@/layouts/app-layout"
import { adminConfigurationsCountriesPath } from "@/routes"
import { BreadcrumbItem } from "@/types"
import { Head } from "@inertiajs/react"
import useCountryListColumns from "@/lib/table-columns.tsx/country-table-columns"
import { updateRansackQueryParams } from "@/lib/helper-functions/update-ransack-query-params"
import type { CountryList } from "@/types/country-types"
import HeadingSmall from "@/components/heading-small"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Countries",
    href: adminConfigurationsCountriesPath(),
  },
]

const Countries = ({ countryList }: { countryList: CountryList }) => {
  const countryListColumns = useCountryListColumns()

  const searchCountries = (searchText: string) => {
    updateRansackQueryParams({
      searchFilters: {
        name_or_code_cont: searchText || null,
      },
      page: 1,
    })
  }

  const pagination = {
    page: countryList.pagination.page,
    pages: countryList.pagination.pages,
    count: countryList.pagination.count,
    onPageChange: (newPage: number) => {
      updateRansackQueryParams({ page: newPage })
    },
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Countries List | Admin" />
      <div className="space-y-8 p-4">
        <HeadingSmall
          title="Country list"
          description="Manage the countries you work with"
        />

        <DataTable
          onSearch={searchCountries}
          columns={countryListColumns}
          data={countryList.countries}
          actionButtons={<NewCountryDialog />}
          pagination={pagination}
        />
      </div>
    </AppLayout>
  )
}

export default Countries
