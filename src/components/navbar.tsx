import { Check, Cpu, HardDrive, Play, Sheet } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Node } from "@xyflow/react";
import { useTheme } from "next-themes";

export function NavBar({
  setNodes,
}: {
  setNodes: Dispatch<SetStateAction<Node[]>>;
}) {
  const { setTheme, theme } = useTheme();

  const addCPUNode = () => {
    const newNode: Node = {
      id: `cpu-${Date.now()}`,
      type: "cpu",
      data: {
        label: "New CPU",
      },
      position: { x: Math.random() * 400 + 200, y: Math.random() * 200 + 150 },
    };

    setNodes((nds) => [...nds, newNode]);
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

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="border-b p-4 flex items-center gap-4">
      <h1 className="text-2xl font-bold">Cache Simulator</h1>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Save <MenubarShortcut>ctrl + s</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Open <MenubarShortcut>ctrl + o</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Insert</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={addCPUNode}>
              <Cpu />
              CPU Core
            </MenubarItem>
            <MenubarItem onClick={addCacheNode}>
              <HardDrive />
              Cache Layer
            </MenubarItem>
            <MenubarItem>
              <Sheet />
              Memory Viewer
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Templates</MenubarSubTrigger>
              <MenubarSubContent>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Simulation</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Run simulation <MenubarShortcut>F5</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Step <MenubarShortcut>F6</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Configure</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Theme</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem
                  onClick={() => setTheme("light")}
                  className="flex justify-between"
                >
                  Light
                  {theme === "light" && <Check className="w-3 h-3" />}
                </MenubarItem>
                <MenubarItem
                  onClick={() => setTheme("dark")}
                  className="flex justify-between"
                >
                  Dark
                  {theme === "dark" && <Check className="w-3 h-3" />}
                </MenubarItem>
                <MenubarItem
                  onClick={() => setTheme("system")}
                  className="flex justify-between"
                >
                  System
                  {theme === "system" && <Check className="w-3 h-3" />}
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
        <MenubarTrigger>About</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
