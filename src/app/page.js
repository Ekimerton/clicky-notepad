"use client";

import React, { useState, useEffect, useCallback } from "react";
import ClickyTextarea from "@/components/ClickyTextarea";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useMute } from "@/contexts/MuteProvider";
import { useNotes } from "@/contexts/NotesContext";
import { Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { MuteToggle } from "@/components/MuteToggle";

export default function Home() {
  const { selectedNote, updateNote } = useNotes();
  const [mounted, setMounted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const intervalId = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [mounted]);

  const handleTitleChange = (event) => {
    if (selectedNote) {
      const newTitle = event.target.value;
      updateNote(selectedNote.id, { title: newTitle });
    }
  };

  const handleContentChange = (event) => {
    if (selectedNote) {
      updateNote(selectedNote.id, { content: event.target.value });
    }
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  if (!mounted) {
    return <div className="h-full w-full"></div>;
  }

  return (
    <div
      className={`relative flex flex-col border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-md h-full overflow-hidden ml-2`}
    >
      <div className="flex-1 flex flex-col h-full">
        <div className="p-2 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="dark:hover:bg-neutral-700"
            asChild
          >
            <SidebarTrigger>
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
          </Button>
          <div className="flex items-center space-x-2">
            <MuteToggle />
            <DarkModeToggle />
          </div>
        </div>
        <div className="p-2 pt-0 -mt-1">
          {selectedNote ? (
            <input
              type="text"
              value={selectedNote.title}
              onChange={handleTitleChange}
              placeholder="Untitled Note"
              className="text-3xl p-0 px-2 font-semibold dark:text-white border-none dark:bg-neutral-800 bg-transparent shadow-none outline-none w-full h-auto text-center"
            />
          ) : (
            <h1 className="text-lg font-semibold dark:text-white text-neutral-400">
              Select or create a note
            </h1>
          )}
        </div>
        <div className="flex-grow relative pt-2 flex justify-center">
          {selectedNote ? (
            <ClickyTextarea
              value={selectedNote.content}
              onChange={handleContentChange}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-500 dark:text-neutral-400">
              Select a note from the sidebar or create a new one.
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-2 right-3 text-xs text-neutral-500 dark:text-neutral-400">
        {formatTime(elapsedTime)} • {selectedNote?.content?.length || 0} chars
      </div>
    </div>
  );
}
