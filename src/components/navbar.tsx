"use client";

import {
  ChevronDown,
  ChevronUp,
  Cpu,
  MemoryStick,
  Microchip,
  Play,
  Sheet,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function NavBar() {
  const [toolbarOpen, setToolbarOpen] = useState<boolean>(false);

  return (
    <div className="border-b p-4 flex items-center gap-4">
      <h1 className="text-2xl font-bold">Cache Simulator</h1>
      <DropdownMenu onOpenChange={setToolbarOpen} open={toolbarOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex gap-4">
            Add
            {toolbarOpen ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Cpu />
            CPU Core
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Microchip />
            Cache Layer
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MemoryStick />
            Main Memory
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Sheet />
            Memory Viewer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button size="sm">
        <Play />
        Run Simulation
      </Button>
    </div>
  );
}
