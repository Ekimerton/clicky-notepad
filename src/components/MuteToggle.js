"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useMute } from "@/contexts/MuteProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MuteToggle() {
  const { mute, setMute } = useMute();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle Sound Profile"
          className="dark:hover:bg-neutral-700"
        >
          {mute ? (
            <VolumeX className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Volume2 className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle Sound Profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setMute(true)}>Mute</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMute(false)}>
          Cherry MX Brown
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
