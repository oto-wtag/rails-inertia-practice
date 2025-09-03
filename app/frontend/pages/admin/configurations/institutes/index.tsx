import HeadingSmall from "@/components/heading-small"
import AppLayout from "@/layouts/app-layout"
import { adminConfigurationsInstitutesPath } from "@/routes"
import { BreadcrumbItem } from "@/types"
import { Head } from "@inertiajs/react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Institutions",
    href: adminConfigurationsInstitutesPath(),
  },
]

const Institutes = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Institutes List | Admin" />
      <div className="space-y-8 p-4">
        <HeadingSmall
          title="Institutes list"
          description="Manage the institutes you work with"
        />

        {/* <DataTable
          onSearch={searchCountries}
          columns={countryListColumns}
          data={countryList.countries}
          actionButtons={<NewCountryDialog />}
          pagination={pagination}
        /> */}
      </div>
    </AppLayout>
  )
}

export default Institutes
