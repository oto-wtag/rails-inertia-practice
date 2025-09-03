import AppLayout from "@/layouts/app-layout"
import { adminUsersPath } from "@/routes"
import { BreadcrumbItem, User } from "@/types"
import { Head } from "@inertiajs/react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Users",
    href: adminUsersPath(),
  },
]

const Users = ({ users }: { users: User[] }) => {
  console.log(users)
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User List | Admin" />
      <div className="p-4">Users</div>
    </AppLayout>
  )
}

export default Users
