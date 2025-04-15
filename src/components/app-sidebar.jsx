import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Settings, Trophy } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarContent className="flex gap-0 flex-col bg-neutral-100 dark:bg-neutral-900">
        <div className="flex items-center justify-between p-2 pr-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              {/* Settings content goes here */}
              <p>Settings configuration will be added later.</p>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            New Note
          </Button>
        </div>
        {/* Achievements Button */}
        <div className="p-2 pt-0 pr-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full bg-yellow-100 hover:bg-yellow-200 border-yellow-200 hover:border-yellow-300 dark:bg-yellow-900 dark:hover:bg-yellow-800 dark:border-yellow-800 dark:hover:border-yellow-700 text-center justify-center gap-2">
                <Trophy className="h-5 w-5" />
                0/21 achievements
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Achievements</DialogTitle>
              </DialogHeader>
              {/* Achievements content goes here */}
              <p>Achievement details will be added later.</p>
            </DialogContent>
          </Dialog>
        </div>
        {/* Divider */}
        <Separator className="my-1 ml-2" />
        {/* Notes List Area */}
        <div className="flex-grow p-2 pr-0">
          <Button variant="ghost" className="w-full justify-start hover:bg-neutral-200 dark:hover:bg-neutral-800">
            Demo Title
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
