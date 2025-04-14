"use client";

import React, { useState, useEffect } from "react";
import ClickyTextarea from "@/components/ClickyTextarea";
import ClickyButton from "@/clicky-components/Button/Button";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useMute } from "@/contexts/MuteProvider";
import { useTheme } from "next-themes";
import { Sun, Moon, Volume2, VolumeX } from "lucide-react";

export default function Home() {
  const { mute, setMute } = useMute();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  const isDarkMode = theme === "dark";

  return (
    <div className="p-2 bg-neutral-100 dark:bg-neutral-900 h-full">
      <div
        className={`flex border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-md h-full`}
      >
        <div className="flex-1 flex flex-col">
          <div className="p-2 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold dark:text-white">Title</h1>
            </div>
            <div className="flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-900 pb-2 pl-2 rounded-bl-lg border-b border-l border-neutral-200 dark:border-neutral-600 -mt-[9px] -mr-[9px]">
              <ClickyButton
                size="md"
                aria-label="Toggle Sound"
                onClick={() => setMute(!mute)}
                baseColor="bg-neutral-100 dark:bg-neutral-300"
                isPressed={!mute}
                lightColor="bg-blue-500"
                ignoreMute
              >
                <p className="">Sound On</p>
              </ClickyButton>
              <ClickyButton
                size="icon"
                aria-label="Toggle Theme"
                onClick={toggleTheme}
                isPressed={isDarkMode}
                baseColor="bg-neutral-100 dark:bg-neutral-300"
              >
                <Moon className="h-4 w-4 fill-blue-500 opacity-40 dark:opacity-100 text-transparent" />
              </ClickyButton>
            </div>
          </div>
          <div className="flex-grow relative pb-2">
            <ClickyTextarea />
          </div>
        </div>
      </div>
    </div>
  );
}
