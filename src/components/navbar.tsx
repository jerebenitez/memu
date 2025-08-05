import { Activity, Check, Eye } from "lucide-react";
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
import { Dispatch, SetStateAction } from "react";
import { Node } from "@xyflow/react";
import { useTheme } from "next-themes";
import AboutDialog from "./about";
import { CPUIcon, newCPU } from "./nodes/cpu";
import { CacheIcon, newCache } from "./nodes/cache";
import { CBDIcon, newCBD } from "./nodes/cbd";

export function NavBar({
  setNodes,
}: {
  setNodes: Dispatch<SetStateAction<Node[]>>;
}) {
  const { setTheme, theme } = useTheme();

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
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Templates</MenubarSubTrigger>
              <MenubarSubContent></MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
                Reset
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Insert</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => setNodes(nds => [...nds, newCPU()])}>
              <CPUIcon />
              CPU Core
            </MenubarItem>
            <MenubarItem onClick={() => setNodes(nds => [...nds, newCache()])}>
              <CacheIcon />
              Cache Layer
            </MenubarItem>
            <MenubarItem onClick={() => setNodes(nds => [...nds, newCBD()])}>
              <CBDIcon />
              CBD
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Graphical</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  <Eye />
                  Memory Viewer
                </MenubarItem>
                <MenubarItem>
                  <Activity />
                  Access Trace Viewer
                </MenubarItem>
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
            <MenubarItem>
              Reset <MenubarShortcut>F7</MenubarShortcut>
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
          <AboutDialog>
            <MenubarTrigger>About</MenubarTrigger>
          </AboutDialog>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
