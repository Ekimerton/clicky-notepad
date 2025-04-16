"use client"

import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Settings, Trophy, Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useNotes } from "@/contexts/NotesContext"

export function AppSidebar() {
  const { notes, selectedNoteId, addNote, selectNote, deleteNote } = useNotes()

  return (
    <Sidebar className="border-none w-64 fixed top-0 left-0 h-screen z-10 mr-2 mt-2">
      <SidebarContent className="flex gap-0 flex-col bg-neutral-100 dark:bg-neutral-900 h-full">
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
              <p>Settings configuration will be added later.</p>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={addNote}
          >
            <Plus className="h-5 w-5" />
            New Note
          </Button>
        </div>
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
              <p>Achievement details will be added later.</p>
            </DialogContent>
          </Dialog>
        </div>
        <Separator className="my-1 ml-2" />
        <div className="flex-grow p-2 pr-0 overflow-y-auto">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="flex items-center group mb-1">
                <Button
                  variant={selectedNoteId === note.id ? "secondary" : "ghost"}
                  className="w-full justify-start hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-left truncate pr-8 relative shadow-none"
                  onClick={() => selectNote(note.id)}
                  title={note.title}
                >
                  {note.title || "Untitled"}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 h-7 w-7 text-neutral-500 opacity-0 group-hover:opacity-100 hover:text-red-500 dark:hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (window.confirm(`Are you sure you want to delete "${note.title || 'Untitled'}"?`)) {
                      deleteNote(note.id)
                    }
                  }}
                  aria-label="Delete note"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-neutral-500 dark:text-neutral-400 text-sm p-2">No notes yet.</p>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
