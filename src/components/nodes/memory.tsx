import { Handle, NodeProps, type Node, Position } from "@xyflow/react";
import { HardDrive } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { NodeComponent } from "./node";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export type MemoryConfig = {
  label: string;
  size: string;
  accessTime: number; // in nS
}

export const MemoryIcon = HardDrive

export function MemoryNode(props: NodeProps<Node<MemoryConfig, "memory">>) {
    const [data, setData] = useState<MemoryConfig>(props.data)

  return (
    <NodeComponent<MemoryConfig, "memory">
      Icon={MemoryIcon}
      {...props}
      data={data}
      setData={setData}
      ConfigModal={MemoryNodeConfigModal}
    >
      <div className="text-xs text-muted-foreground mb-2">
        Size: {data.size}
      </div>
      <div className="text-xs text-muted-foreground">
        Access Time: {data.accessTime}
      </div>
      <Handle type="target" id="input" position={Position.Left} />
      <Handle type="source" id="viewer" position={Position.Bottom} />
    </NodeComponent>
  );
}

function MemoryNodeConfigModal({
  id,
  config,
  setConfig,
  open,
  onOpenChange,
}: {
  id: string;
  config: MemoryConfig;
  setConfig: Dispatch<SetStateAction<MemoryConfig>>;
  open: boolean;
  onOpenChange: (state: boolean) => void;
}) {
  const updateConfig = (
    key: keyof MemoryConfig,
    value: string | number | boolean,
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>{id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-3">
          <div>
            <Label className="text-xs">Label</Label>
            <Input
              value={config.label}
              onChange={(e) => {
                updateConfig("label", e.target.value);
              }}
            />
          </div>
          <div>
            <Label className="text-xs">Size</Label>
            <Input
              value={config.size}
              onChange={(e) => {
                updateConfig("size", e.target.value);
              }}
            />
          </div>
          <div>
            <Label className="text-xs">Access Time</Label>
            <Input
              value={config.accessTime}
              onChange={(e) => {
                updateConfig("accessTime", e.target.value);
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
