import {
  ChevronDown,
  ChevronUp,
  Cpu,
  HardDrive,
  MemoryStick,
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
import { Dispatch, SetStateAction, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Node } from "@xyflow/react";

export function NavBar({
  setNodes,
}: {
  setNodes: Dispatch<SetStateAction<Node[]>>;
}) {
  const [toolbarOpen, setToolbarOpen] = useState<boolean>(false);

  const addCPUNode = () => {
    const newNode: Node = {
      id: `cpu-${Date.now()}`,
      type: "cpu",
      data: {
        label: "New CPU",
      },
      position: { x: Math.random() * 400 + 200, y: Math.random() * 200 + 150 },
    };

    setNodes(nds => [...nds, newNode]);
  };

  const addCacheNode = () => {
    const newNode: Node = {
      id: `cache-${Date.now()}`,
      type: "cache",
      data: {
        label: "New Cache",
        config: {
          size: "1MB",
          accessTime: 10,
          blockSize: "64B",
          associativity: "8-way",
          evictionPolicy: "LRU",
          writePolicy: "write-back",
          writeAllocate: "write-allocate",
        },
      },
      position: { x: Math.random() * 400 + 200, y: Math.random() * 200 + 150 },
    };

    setNodes(nds => [...nds, newNode]);
  };

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
          <DropdownMenuItem onClick={addCPUNode}>
            <Cpu />
            CPU Core
          </DropdownMenuItem>
          <DropdownMenuItem onClick={addCacheNode}>
            <HardDrive />
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
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </div>
  );
}
