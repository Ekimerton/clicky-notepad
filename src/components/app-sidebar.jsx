import { Sidebar, SidebarContent } from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-neutral-100 dark:bg-neutral-800">
        <p className="dark:text-white">Hello</p>
      </SidebarContent>
    </Sidebar>
  )
}
