import HeadingSmall from "@/components/heading-small"
import AppLayout from "@/layouts/app-layout"
import { adminConfigurationsInstitutesPath } from "@/routes"
import { BreadcrumbItem } from "@/types"
import { Head } from "@inertiajs/react"
import NewInstituteDialog from "@/components/admin/institutes/new-institute-dialog"
import { Country } from "@/types/country-types"
import { DataTable } from "@/components/ui/data-table"
import { updateRansackQueryParams } from "@/lib/helper-functions/update-ransack-query-params"
import useInstituteListColumns from "@/lib/table-columns/institute-table-columns"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Institutions",
    href: adminConfigurationsInstitutesPath(),
  },
]

interface InstituteProps {
  institutesList: any
  countries: Country[]
}

const Institutes = ({ institutesList, countries }: InstituteProps) => {
  const instituteListColumns = useInstituteListColumns()

  const searchInstitutes = (searchText: string) => {
    updateRansackQueryParams({
      searchFilters: {
        name_or_city_or_country_name_cont: searchText || null,
      },
      page: 1,
    })
  }

  const pagination = {
    page: institutesList.pagination.page,
    pages: institutesList.pagination.pages,
    count: institutesList.pagination.count,
    onPageChange: (newPage: number) => {
      updateRansackQueryParams({ page: newPage })
    },
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Institutes List | Admin" />
      <div className="space-y-8 p-4">
        <HeadingSmall
          title="Institutes list"
          description="Manage the institutes you work with"
        />

        <DataTable
          onSearch={searchInstitutes}
          columns={instituteListColumns}
          data={institutesList.institutes}
          actionButtons={<NewInstituteDialog countries={countries} />}
          pagination={pagination}
        />
      </div>
    </AppLayout>
  )
}

export default Institutes
