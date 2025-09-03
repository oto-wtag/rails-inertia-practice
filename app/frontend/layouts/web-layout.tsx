import WebTopNavbar from "@/components/navigation/web-top-navbar"
import { type ReactNode } from "react"

interface WebLayoutProps {
  children: ReactNode
}

const WebLayout = ({ children }: WebLayoutProps) => {
  return (
    <div>
      <WebTopNavbar />
      <main>{children}</main>
    </div>
  )
}

export default WebLayout
