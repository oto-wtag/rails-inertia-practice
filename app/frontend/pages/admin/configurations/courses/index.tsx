import HeadingSmall from "@/components/heading-small"
import AppLayout from "@/layouts/app-layout"
import { adminConfigurationsCoursesPath } from "@/routes"
import { BreadcrumbItem } from "@/types"
import { Head } from "@inertiajs/react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Courses",
    href: adminConfigurationsCoursesPath(),
  },
]

const Courses = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Courses List | Admin" />
      <div className="space-y-8 p-4">
        <HeadingSmall
          title="Courses list"
          description="Manage the courses you work with"
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

export default Courses
